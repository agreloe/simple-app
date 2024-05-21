import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { fetchUsers, clearSelectedUser } from "../features/users/usersSlice";
import UserDetails from "./UserDetails";
import { PrimaryButton } from "./styled/Buttons";
import logo from "../assets/img/prueba-LOGO-WHITE.svg";
import { Navbar } from "./styled/Navbar";
import { MainBlurred } from "./styled/Main";
import { Container } from "./styled/Container";
import { BoxFull } from "./styled/Box";

import { Modal } from "./styled/Modal";
import CreatedUsersList from "./CreatedUsersList";
import UsersList from "./UsersList";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { newUsers, page, loading, error, selectedFetchedUser } = useSelector(
    (state) => state.users
  );
  const [visible, setVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const closeModal = () => {
    document.getElementById("nav").style.zIndex = "5";
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.getElementById("nav").style.zIndex = "-1";
    window.scrollTo({
      top: document.documentElement.scrollHeight / 2 - window.innerHeight / 2,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(currentScrollPos < 20);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(page));
    } else {
      navigate("/");
    }
  }, [dispatch, token, page, navigate]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleBack = () => {
    dispatch(clearSelectedUser());
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    document.getElementById("nav").style.zIndex = "-1";
    window.scrollTo({
      top: document.documentElement.scrollHeight / 2 - window.innerHeight / 2,
      behavior: "smooth",
    });
  };

  const handleCloseForm = () => {
    setEditingUser(null);
    document.getElementById("nav").style.zIndex = "5";
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      <Navbar>
        <nav id="nav" className={`${!visible ? "visible" : ""}`}>
          <img src={logo} alt="Logo" width={256} />
        </nav>
      </Navbar>

      <MainBlurred>
        <Container>
          <h1>Dashboard</h1>
          <BoxFull>
            {user ? (
              <div className="user-info">
                <h2>Hola, {user.first_name || user.name}</h2>
                <img src={user.avatar || user.picture} alt="Profile" />

                <p>{user.email}</p>
                <PrimaryButton onClick={handleLogout}>
                  Cerrar sesión
                </PrimaryButton>
              </div>
            ) : (
              <p>Cargando los datos del usuario...</p>
            )}
          </BoxFull>

          <BoxFull>
            {selectedFetchedUser ? (
              <Fragment>
                <div className="spaced">
                  <PrimaryButton onClick={handleBack}>Volver</PrimaryButton>
                </div>
                <UserDetails />
              </Fragment>
            ) : (
              <Fragment>
                <div className="spaced">
                  <h3>Otros usuarios</h3>
                </div>
                {loading ? (
                  <p>Cargando usuarios...</p>
                ) : error ? (
                  <p style={{ color: "red" }}>{error}</p>
                ) : (
                  <UsersList></UsersList>
                )}
              </Fragment>
            )}
          </BoxFull>

          <BoxFull>
            <Fragment>
              <div className="spaced-column">
                <h3>Usuarios creados</h3>
                {newUsers.length !== 0 && (
                  <PrimaryButton onClick={openModal}>
                    Crear usuario
                  </PrimaryButton>
                )}
              </div>

              {newUsers.length !== 0 ? (
                <CreatedUsersList onEditClick={handleEditClick} />
              ) : (
                <div className="no-users">
                  <p>No hay usuarios creados</p>
                  <PrimaryButton onClick={openModal}>
                    Crear usuario
                  </PrimaryButton>
                </div>
              )}
            </Fragment>
          </BoxFull>
        </Container>
        <Modal id="modal" className={`${isModalOpen ? "open" : "close"}`}>
          <CreateUserForm closeModal={closeModal} />
        </Modal>

        <Modal className={editingUser ? "open" : "close"}>
          {editingUser && (
            <EditUserForm user={editingUser} onClose={handleCloseForm} />
          )}
        </Modal>
      </MainBlurred>
    </Fragment>
  );
};

export default Dashboard;
