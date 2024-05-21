import React, { useState } from "react";
import { CloseButton } from "./styled/Buttons";
import { Form, Input, InputSubmit } from "./styled/Form";
import { useDispatch } from "react-redux";
import { createUser } from "../features/users/usersSlice";

const CreateUserForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

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

  const handleNewUser = async (e) => {
    e.preventDefault();
    await dispatch(createUser({ name, job }));
    handleCloseModal();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleCloseModal = () => {
    setName("");
    setJob("");
    closeModal();
  };

  return (
    <Form onSubmit={handleNewUser}>
      <h2 className="title">Crear usuario</h2>
      <CloseButton className="close" onClick={handleCloseModal}></CloseButton>
      <Input
        placeholder="Nombre"
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => handleNameChange(e)}
        required
      ></Input>

      <Input
        placeholder="Trabajo"
        type="text"
        name="job"
        id="job"
        value={job}
        onChange={(e) => handleJobChange(e)}
        required
      ></Input>
      <InputSubmit type="submit" value="Guardar"></InputSubmit>
    </Form>
  );
};

export default CreateUserForm;
