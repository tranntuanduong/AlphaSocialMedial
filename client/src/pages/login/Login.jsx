import CircularProgress from '@material-ui/core/CircularProgress';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

function Login(props) {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, /*error,*/ dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };

    console.log(user);

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">AlphaSocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on
                        AlphaSocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Email"
                            type="email"
                            className="loginInput"
                            ref={email}
                            required
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            className="loginInput"
                            ref={password}
                            required
                        />
                        <button className="loginButton" disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress color="inherit" size="22px" />
                            ) : (
                                'Log in'
                            )}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register" className="loginForgot">
                            Don't have an account. Register here
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
