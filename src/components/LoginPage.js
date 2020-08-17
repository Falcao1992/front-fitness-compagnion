import React, {useState} from "react";

import {login} from "../_services/user.service";

const LoginPage = ({location, history}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        login(username, password)
            .then(
                user => {
                    const { from } = location.state || { from: { pathname: "/" } };
                    history.push(from);
                },
                error => console.log('erreur')
            );
    }
    return (
        <div>
            <form name="form" onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {submitted && !username &&
                    <div>Username is required</div>
                    }
                </div>
                <div >
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {submitted && !password &&
                    <div>Password is required</div>
                    }
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
