import React, { useState, useEffect } from "react";
import { PrimaryButton, CloseButton } from "./styled/Buttons";
import { BoxCenter } from "./styled/Box";
import logo from "../assets/img/prueba-LOGO-WHITE.svg";
import { Modal } from "./styled/Modal";
import { Form, Input, InputSubmit } from "./styled/Form";
import { useDispatch, useSelector } from "react-redux";
import { login, googleLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import { MainCenter } from "./styled/Main";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, loading } = useSelector((state) => state);

  useEffect(() => {
    if (token || user) {
      navigate("/dashboard");
    }
  }, [token, user, navigate]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  const handleGoogleSuccess = (decodedResponse) => {
    const googleUserData = {
      name: decodedResponse.name,
      email: decodedResponse.email,
      picture: decodedResponse.picture,
    };
    dispatch(
      googleLogin({ profileObj: googleUserData, tokenId: decodedResponse.sub })
    )
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch((error) => console.error("Google login failed:", error));
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <MainCenter>
      <BoxCenter>
        <img src={logo} alt="Logo de Login Demo" width={256} />
        <h1 className="title">Bienvenido a Login Demo</h1>
        <p>Inicie sesión para comenzar</p>
        <PrimaryButton onClick={handleModal}>Iniciar sesión</PrimaryButton>
      </BoxCenter>

      <Modal className={`${isModalOpen ? "open" : "close"}`}>
        <Form onSubmit={handleSubmit}>
          <h2 className="title">Iniciar sesión</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <CloseButton className="close" onClick={handleModal}></CloseButton>
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputSubmit
            type="submit"
            onClick={handleSubmit}
            value={loading ? "Iniciando sesión..." : "Iniciar sesión"}
          ></InputSubmit>
          <div className="divider">
            <span></span>
            <p>o</p>
            <span></span>
          </div>
          <GoogleLoginButton
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
          />
        </Form>
      </Modal>
    </MainCenter>
  );
};

export default Home;
