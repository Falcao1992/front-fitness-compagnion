import React, {useState} from "react";

import {login} from "../_services/user.service";
import {Link} from "react-router-dom";

import styled from 'styled-components'
import {TextField, Button} from '@material-ui/core';


const LoginPage = ({location, history}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

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
                    const {from} = location.state || {from: {pathname: "/"}};
                    history.push(from);
                },
                error => {
                    setErrorMsg(error)
                    console.error('error', error)
                }
            );
    }
    return (
        <ContainerLoginPage>
            <h1>Bienvenue sur Fitness Compagnion</h1>
            <p>Veuillez Vous connecter</p>
            <FormStyled name="form" onSubmit={handleSubmit} >
                <TextFieldStyled id="username"
                                 label="Pseudo"
                                 variant="outlined"
                                 type="text"
                                 autoComplete="nickname"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 error={submitted && !username}
                                 helperText={submitted && !username ?
                                     <small>Veuillez rentrer votre pseudo !</small> : username !== "" ?
                                         <small>Correct*</small> : false}
                />
                <TextFieldStyled id="password"
                                 label="Mot de passe"
                                 variant="outlined"
                                 type="password"
                                 autoComplete="current-password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 error={submitted && !password}
                                 helperText={submitted && !password ?
                                     <small>Veuillez rentrer votre mot de passe !</small> : password !== "" ?
                                         <small>Correct*</small> : false}
                />

                <div>
                    <ButtonStyled type="submit"
                                  variant="contained"
                                  color="primary">
                        Me Connecter
                    </ButtonStyled>
                    <ButtonStyled variant="contained" color="secondary">
                        <Link to="/register">Creer un nouveau Compte</Link>
                    </ButtonStyled>
                </div>

                {errorMsg && <p>{errorMsg}</p>}
            </FormStyled>
        </ContainerLoginPage>
    )
}

const ContainerLoginPage = styled.div`
    height: 100vh;
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
`

const TextFieldStyled = styled(TextField)`
    width: 100%;
    
`

const ButtonStyled = styled(Button)`
    width: 100%;
`

export default LoginPage
