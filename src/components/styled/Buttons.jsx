import styled from "styled-components";
import { textColor, buttonColor, buttonColorHover } from "../../utils/colors";
import closeIcon from "../../assets/img/icons8-close.svg";
import editIcon from "../../assets/img/edit.svg";

const Button = styled.button`
  cursor: pointer;
  width: fit-content;
  text-align: center;
  padding: 0.5rem 1rem;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 1rem;
  font-weight: 700;
`;

export const PrimaryButton = styled(Button)`
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

export const SecondaryButton = styled(Button)`
    border: 1px solid ${buttonColor};
    color: ${textColor};
    border-radius: 2rem;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    outline: 1px solid ${buttonColor};
    background-color: transparent;

    &:hover {
        outline-offset: 4px;
`;

export const CloseButton = styled.button`
  position: relative;
  outline: none;
  border: 0;
  background-color: transparent;
  width: 24px;
  height: 24px;
  padding: 0;
  cursor: pointer;

  &::after {
    content: url(${closeIcon});
    width: 24px;
    height: 24px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const EditButton = styled.button`
  position: relative;
  outline: none;
  border: 0;
  background-color: transparent;
  width: 24px;
  height: 24px;
  padding: 0;
  cursor: pointer;

  &::after {
    content: url(${editIcon});
    width: 24px;
    height: 24px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
