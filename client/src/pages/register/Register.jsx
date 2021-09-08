import { useRef } from 'react';
import './Register.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function Register(props) {
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const retypePassword = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(retypePassword.current.value, password.current.value);
        if (retypePassword.current.value !== password.current.value) {
            retypePassword.current.setCustomValidity("Passwords don't match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };

            try {
                await axios.post('/auth/register', user);
                history.push('/login');
            } catch (error) {
                console.log(error);
            }
        }
    };
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
                <form className="loginRight" onSubmit={handleClick}>
                    <div className="loginBox">
                        <input
                            placeholder="Email"
                            className="loginInput"
                            ref={email}
                            required
                            type="email"
                        />
                        <input
                            placeholder="Username"
                            className="loginInput"
                            ref={username}
                            required
                        />
                        <input
                            placeholder="Password"
                            className="loginInput"
                            ref={password}
                            required
                            // type="password"
                        />
                        <input
                            placeholder="Retype Password"
                            className="loginInput"
                            ref={retypePassword}
                            required
                            // type="password"
                        />
                        <button className="loginButton" type="submit">
                            Register
                        </button>

                        <Link to="/login" className="loginForgot">
                            Have an account. Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
