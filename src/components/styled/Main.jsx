import styled from "styled-components";
import bgImg from "../../assets/img/prueba-bg-v3.svg";

const Main = styled.main`
  background-image: url(${bgImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  background-color: var(--bg-color);
  padding: 0 2rem;
`;

export const MainCenter = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
`;

export const MainBlurred = styled(Main)`
  position: relative;
  backdrop-filter: blur(8px);
  height: 100%;
  padding-top: calc(110px + 2rem);
  padding-bottom: 2rem;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);
    z-index: -1;
  }
`;
