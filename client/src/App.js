import { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { Redirect } from 'react-router';
import Messenger from './pages/messenger/Messenger';

function App() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Router>
                <Switch>
                    <Route path="/profile/:username">
                        <Profile />
                    </Route>
                    <Route path="/login">
                        {user ? <Redirect to="/" /> : <Login />}
                    </Route>
                    <Route path="/register">
                        {user ? <Redirect to="/" /> : <Register />}
                    </Route>
                    <Route path="/messenger">
                        {user ? <Messenger /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/">{user ? <Home /> : <Login />}</Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
