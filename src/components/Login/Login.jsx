import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StyledForm, StyledInputContainer, StyledInput, StyledButton } from './LoginStyledComps';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/stateHandlers';
import { ToastContainer } from 'react-toastify';
import { customToast } from '../../utils/helpers';

const Login = () => {
    
    const history = useHistory();

    const USER = 'raptormaps';
    const PASS = 'raptormapstest2020';

    const [userInputs, setUserInputs] = useState({
        username: '',
        password: ''
    });


    const dispatch = useDispatch();
    
    const handleLogin = () => {
        // Will change to actual authentication
        const { username, password } = userInputs;
        if(username === USER && password === PASS){
            dispatch(login());
            history.push('map');
            return;
        }
        customToast('Invalid Credentials')
    }

    const handleUsernameInput = (e) => setUserInputs({ ...userInputs, username: e.target.value })

    const handlePasswordInput = (e) => setUserInputs({  ...userInputs, password: e.target.value });


    return (
        <StyledForm>   
            <ToastContainer />
            <StyledInputContainer>
                <StyledInput onChange = { handleUsernameInput } value = { userInputs.username } type="text" placeholder="Enter Username" name="username" required />  
            </StyledInputContainer>
            <StyledInputContainer>
                <StyledInput onChange = { handlePasswordInput } value = { userInputs.password } type="password" placeholder="Enter Password" name="password" required />  
            </StyledInputContainer>
            <StyledInputContainer>
                <StyledButton onClick = {handleLogin}>
                    Login
                </StyledButton>
            </StyledInputContainer>     
        </StyledForm> 
    )
}

export default Login