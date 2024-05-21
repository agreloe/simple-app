import React from "react";
import { useSelector } from "react-redux";
import { UserBox } from "../components/styled/Box";

const UserDetails = () => {
  const { selectedFetchedUser } = useSelector((state) => state.users);

  const selectedUser = selectedFetchedUser;

  if (!selectedUser) {
    return <p>No user selected</p>;
  }

  return (
    <UserBox className="no-pointer">
      <img
        src={selectedUser.avatar}
        alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
      />
      <p>
        {selectedUser.first_name} {selectedUser.last_name}
      </p>
      <p>{selectedUser.email}</p>
      <div className="edit"></div>
    </UserBox>
  );
};

export default UserDetails;
