import styled from "styled-components";
import { transition } from "../../utils/colors";

export const Modal = styled.div`
  opacity: 0;
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  transition: ${transition};
  visibility: hidden;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.4);

  &.open {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
    transform: translateY(0);
  }

  &.close {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    transform: translateY(-50px);
  }
`;
