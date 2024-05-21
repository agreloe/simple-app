import styled from "styled-components";
import {
  textColor,
  boxBg,
  boxBorder,
  boxShadowBox,
  primaryColor,
  buttonColor,
  buttonColorHover,
} from "../../utils/colors";

export const Form = styled.form`
  background: ${boxBg};
  border-radius: 16px;
  box-shadow: ${boxShadowBox};
  backdrop-filter: blur(6px);
  border: ${boxBorder};
  width: fit-content;
  padding: 3rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .spaced {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 2rem;
  }

  .divider {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 6px;

    p {
      transform: translateY(-2px);
    }

    span {
      width: 100%;
      height: 1px;
      background-color: ${textColor};
      margin: 1rem 0;
      position: relative;
      display: block;
    }
  }
`;

export const Input = styled.input`
  border: 0;
  border-bottom: 1px solid ${textColor};
  background-color: transparent;
  width: 100%;
  padding: 0.25rem 0.5rem;
  color: ${textColor};

  &:focus {
    outline: none;
    border-bottom: 1px solid ${primaryColor};
  }

  &::placeholder {
    color: ${textColor};
  }
`;

export const InputSubmit = styled.input`
  cursor: pointer;
  width: fit-content;
  text-align: center;
  padding: 0.5rem 1rem;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid ${buttonColor};
  color: ${textColor};
  border-radius: 2rem;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: 1px solid ${buttonColor};
  background-color: ${buttonColor};

  &:hover {
    outline-offset: 4px;
    background-color: ${buttonColorHover};
  }
`;
