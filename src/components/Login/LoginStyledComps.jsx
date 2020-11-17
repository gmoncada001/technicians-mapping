import styled from 'styled-components';

export const StyledForm = styled.div`
    color: black;
    margin-top: 5vh;
    margin-left: auto;
    margin-right: auto;
    padding: 2%;
    width: 25%;
    font-size: 3vh;
    background-color: white;
    text-align: center;
    box-shadow: 0 5px 12px 0 rgba(0,0,0,0.4);
    border-radius: 0.5vh;
`;

export const StyledInputContainer = styled.div`
    width: auto;
    margin: 0%;
    padding: 3%;
`;

export const StyledButton = styled.div`
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    padding: 1%;
    background-color: #00B241;
    color: white;
    text-align: center;
    &:hover {
        cursor: pointer;
    }
    border-radius: 4px;
`;

export const StyledInput = styled.input`
    width: 90%;
    height: 4vh;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    ::-webkit-input-placeholder {
        text-align: center;
        font-size: 2vh;
     }
     
     :-moz-placeholder { 
        text-align: center;  
        font-size: 2vh;
     }
     
     ::-moz-placeholder { 
        text-align: center;  
        font-size: 2vh;
     }
     
     :-ms-input-placeholder {  
        text-align: center; 
        font-size: 2vh;
     }
`;