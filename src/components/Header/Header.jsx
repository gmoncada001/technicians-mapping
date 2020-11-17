import React from 'react';
import { logout } from '../../actions/stateHandlers';
import { useDispatch, useSelector } from 'react-redux';
import { StyledHeader, LogoutButton } from './HeaderStyledComps';

const Header = () => {
    
    const dispatch = useDispatch();

    const outerState = useSelector(state => state.stateReducer);

    const handleLogout = () => dispatch(logout());

    return (
        <StyledHeader>
                <span>Technician Current Location Viewer</span>
                { outerState.loggedIn && <LogoutButton onClick = { handleLogout }>Logout</LogoutButton> }
        </StyledHeader>
    )
}

export default Header;