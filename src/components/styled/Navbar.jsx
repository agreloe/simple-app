import styled from "styled-components";
import { boxBg, boxBorder, boxShadowBox, transition } from "../../utils/colors";

export const Navbar = styled.header`
  nav {
    z-index: 5;
    background: ${boxBg};
    box-shadow: ${boxShadowBox};
    backdrop-filter: blur(6px);
    border: ${boxBorder};
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transition: ${transition};

    &.visible {
      background: rgba(0, 0, 0, 0.8);
    }
  }
`;
