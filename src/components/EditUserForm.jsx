import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../features/users/usersSlice";
import { CloseButton, SecondaryButton } from "./styled/Buttons";
import { Form, Input, InputSubmit } from "./styled/Form";

const EditUserForm = ({ user, onClose }) => {
  const [name, setName] = useState(`${user.name}` || "");
  const [job, setJob] = useState(user.job || "");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setName(capitalizedValue);
  };

  const handleJobChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setJob(capitalizedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user.id, name, job }));
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Editar usuario</h3>
      <CloseButton className="close" onClick={onClose}></CloseButton>
      <Input
        type="text"
        value={name}
        onChange={(e) => handleNameChange(e)}
        placeholder="Name"
        required
      />

      <Input
        type="text"
        value={job}
        onChange={(e) => handleJobChange(e)}
        placeholder="Job"
        required
      />

      <div className="spaced">
        <SecondaryButton type="button" onClick={handleDelete}>
          Eliminar usuario
        </SecondaryButton>
        <InputSubmit
          type="submit"
          value={`${loading ? "Actualizando..." : "Actualizar"}`}
        ></InputSubmit>
      </div>
    </Form>
  );
};

export default EditUserForm;
