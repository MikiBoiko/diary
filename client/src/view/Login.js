import { useCallback, useState } from "react";

import { postLogin } from "../common/api";

import "./Login.css";

const Login = (props) => {
    const onLogin = props.onLogin.bind(this);

    const [reason, setReason] = useState("");
    const [password, setPassword] = useState("");

    const handleAccess = useCallback(() => {
        postLogin(reason, password)
        .then((response) => {
            console.log(response.message);
            onLogin();
        })
        .catch((err) => {
            console.error(`[${ err.name }] : FAILED LOGIN`);
        });
    }, [reason, password, onLogin]);

    return (
        <div className="Login">
            <h1>Login.</h1>
            <div className="Form">
                <input 
                    className="Input" 
                    onChange={ (e) => setReason(e.target.value) }
                    name="diary-reason" 
                    type="text" 
                    placeholder="Reason." 
                />
                <input 
                    className="Input" 
                    onChange={ (e) => setPassword(e.target.value) }
                    name="diary-password" 
                    type="password" 
                    placeholder="Password." 
                />
                <button className="Button" type="submit" onClick={ handleAccess }>Access</button>
            </div>
        </div>
    );
}

export default Login;