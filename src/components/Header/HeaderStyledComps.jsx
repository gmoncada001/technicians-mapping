import styled from 'styled-components';

export const StyledHeader = styled.div`
    background-color: #1d2d54;
    background-image: linear-gradient(to right, #1d2d54, #3f5cac);
    color: white;
    padding: 1%;
    text-align: center;
    border: solid #1d2d54 1px;
    font-family: Perpetua;
    font-size: 5vh;
`;

export const LogoutButton = styled.span`
    position: absolute;
    right: 5%;
    top: 3%;
    font-size: 3vh;
    color: white;
    border-radius: 1vh;
    padding: 0.5%;
    &:hover {
        cursor: pointer;
    }
`;