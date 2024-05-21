import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    onSuccess(decoded);
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={onFailure} />;
};

export default GoogleLoginButton;
