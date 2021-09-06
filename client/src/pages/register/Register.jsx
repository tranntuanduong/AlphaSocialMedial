import './Register.css';

function Register(props) {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">AlphaSocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on AlphaSocial.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Username" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <input placeholder="Retype Password" className="loginInput" />
                        <button className="loginButton">Register</button>
                        <span className="loginForgot">Have an account. Login here</span>
                        <button className="loginRegisterButton">Log into Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
