import styled from 'styled-components';

export const MapWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const MapContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`;

export const StyledButton = styled.div`
    position: fixed;
    bottom: 3%;
    right: 3%;
    font-size: 4vh;
    color: white;
    border-radius: 5%;
    padding: 2%;
    background-color: green;
    z-index: 1;
    &:hover {
        cursor: pointer;
    }
`;