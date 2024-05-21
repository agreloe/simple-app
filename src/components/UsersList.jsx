import React, { Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setPage, fetchUserById } from "../features/users/usersSlice";
import { UserBox } from "./styled/Box";
import { UserList } from "./styled/List";
import { PrimaryButton } from "./styled/Buttons";

const UsersList = ({ onEditClick }) => {
  const { users, page } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleUserClick = (id) => {
    dispatch(fetchUserById(id));
  };
  return (
    <Fragment>
      <UserList>
        {users.map((user) => (
          <UserBox key={user.id} onClick={() => handleUserClick(user.id)}>
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
            />
            <div>
              <p>
                {user.first_name} {user.last_name}
              </p>
              <p>{user.email}</p>
            </div>
          </UserBox>
        ))}
      </UserList>
      <div className="spaced">
        <PrimaryButton onClick={() => handlePageChange(page - 1)}>
          &#10094;
        </PrimaryButton>

        <PrimaryButton onClick={() => handlePageChange(page + 1)}>
          &#10095;
        </PrimaryButton>
      </div>
    </Fragment>
  );
};

export default UsersList;
