import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users`, {
        params: {
          page: page,
          per_page: 5,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ name, job }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://reqres.in/api/users", {
        name,
        job,
      });
      const data = response.data;

      const newUser = {
        id: data.id,
        name: data.name,
        job: data.job,
        createdAt: data.createdAt,
      };

      return newUser;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, name, job }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`https://reqres.in/api/users/${id}`, {
        name,
        job,
      });
      return { id, name, job };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    newUsers: [],
    selectedFetchedUser: null,
    selectedCreatedUser: null,
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedFetchedUser = null;
      state.selectedCreatedUser = null;
    },
    setSelectedFetchedUser: (state, action) => {
      state.selectedFetchedUser = action.payload;
    },
    setSelectedCreatedUser: (state, action) => {
      state.selectedCreatedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.totalPages = action.payload.total_pages;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedFetchedUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.newUsers = [action.payload, ...state.newUsers];
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.newUsers.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.newUsers[index] = {
            ...state.newUsers[index],
            ...action.payload,
          };
        }
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.newUsers = state.newUsers.filter(
          (user) => user.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  setPage,
  clearSelectedUser,
  setSelectedFetchedUser,
  setSelectedCreatedUser,
} = usersSlice.actions;

export default usersSlice.reducer;
