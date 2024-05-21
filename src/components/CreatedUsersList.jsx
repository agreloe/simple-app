import React, { useState, Fragment } from "react";
import { UserBox } from "./styled/Box";
import { UserList } from "./styled/List";
import { PrimaryButton, EditButton } from "./styled/Buttons";
import { useSelector } from "react-redux";

const CreatedUsersList = ({ onEditClick }) => {
  const { newUsers } = useSelector((state) => state.users);
  const [page, setPage] = useState(1);

  const usersPerPage = 5;

  const totalPages = Math.ceil(newUsers.length / usersPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const startIdx = (page - 1) * usersPerPage;
  const usersToDisplay = newUsers.slice(startIdx, startIdx + usersPerPage);

  return (
    <Fragment>
      <UserList>
        {usersToDisplay.map((user) => (
          <UserBox key={user.id} className="no-pointer">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={`${user.name}`}
            />
            <div>
              <p>{user.name}</p>
              <p>{user.job}</p>
              <div className="edit">
                <EditButton onClick={() => onEditClick(user)}>
                  <span className="sr-only">Edit</span>
                </EditButton>
              </div>
            </div>
          </UserBox>
        ))}
      </UserList>

      {totalPages > 1 && (
        <div className="spaced">
          <PrimaryButton onClick={() => handlePageChange(page - 1)}>
            &#10094;
          </PrimaryButton>

          <PrimaryButton onClick={() => handlePageChange(page + 1)}>
            &#10095;
          </PrimaryButton>
        </div>
      )}
    </Fragment>
  );
};

export default CreatedUsersList;
