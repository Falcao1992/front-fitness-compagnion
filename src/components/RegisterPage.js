import React, {useState} from "react";

import {register} from "../_services/user.service";

const RegisterPage = ({location, history}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)

        // stop here if form is invalid
        if (!(username && password && checkPassword && email)) {
            console.log('tout les champs ne sont pas rensigné')
            return;
        }

        if (password !== checkPassword) {
            console.log('les deux mot de passe ne corresponde pas')
            return
        }

        register(username, password, email)
            .then(
                user => {
                    const { from } = location.state || { from: { pathname: "/" } };
                    console.log(user,'user')
                    history.push("/");
                },
                error => console.log('erreur')
            );
    }

    return (
        <div>
            <form name="form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    {submitted && !username &&
                    <div>Username is required</div>
                    }
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {submitted && !email &&
                    <div>Username is required</div>
                    }
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    {submitted && !password &&
                    <div>Password is required</div>
                    }
                </div>
                <div>
                    <label htmlFor="checkPassword">Repeat password</label>
                    <input type="password" name="checkPassword" value={checkPassword}
                           onChange={(e) => setCheckPassword(e.target.value)}/>
                    {submitted && !password &&
                    <div>Password is required</div>
                    }
                </div>
                <div>
                    <button>Creer nouveau compte</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage
