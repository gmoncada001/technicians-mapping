import SolarMap from './components/SolarMap/SolarMap';
import styled from 'styled-components';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { Route, Switch } from 'react-router-dom'; 

const StyledApp = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0;
`

const App = () => {
  return (
    <StyledApp>
      <Header />
      <Switch>
        <Route exact path='/' component = { Login } />
        <Route exact path='/login' component = { Login } />
        <Route exact path='/map' component = { SolarMap } />
      </Switch>
      </StyledApp>
  );
}

export default App;
