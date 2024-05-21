import styled from "styled-components";
import { boxBg, boxBorder, boxShadowBox } from "../../utils/colors";

const Box = styled.div`
  background: ${boxBg};
  border-radius: 16px;
  box-shadow: ${boxShadowBox};
  backdrop-filter: blur(6px);
  border: ${boxBorder};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const BoxCenter = styled(Box)`
  width: fit-content;
`;

export const BoxFull = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin: 2rem 0;

  .spaced,
  .spaced-column {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    & > img {
      border-radius: 50%;
      width: 120px;
      height: 120px;
      object-fit: cover;
    }
  }

  .no-users {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  @media screen and (max-width: 768px) {
    .spaced-column {
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

export const UserBox = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 16px;
    border: ${boxBorder};
    width: fit-content;
    cursor: pointer;
    min-width: 180px;
    position: relative;

    &.no-pointer {
        cursor: default;
    }

    & > img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    & > div {
        text-align: center;

        & > p:not(:last-child) {
            padding-bottom: 0.5rem;
        }

    .edit {
        position: absolute;
        top: 5px;
        right: 10px;
    }

    @media screen and (max-width: 768px) {
        min-width: 220px;
    }

`;
