import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      const data = response.data;

      const userResponse = await axios.get("https://reqres.in/api/users/4");
      const userData = userResponse.data.data;

      return { token: data.token, user: userData };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ profileObj, tokenId }, { rejectWithValue }) => {
    try {
      const userData = {
        name: profileObj.name,
        email: profileObj.email,
        picture: profileObj.picture,
      };
      return { token: tokenId, user: userData };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.token = null;
        state.user = null;
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.token = null;
        state.user = null;
        state.error = action.payload.error;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
