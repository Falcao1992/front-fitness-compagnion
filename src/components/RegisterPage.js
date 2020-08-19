import React, {useState} from "react";
import {register} from "../_services/user.service";
import styled from 'styled-components'
import {TextField, Button} from '@material-ui/core';


const RegisterPage = ({location, history}) => {

    const [username, setUsername] = useState('')
    const [size, setSize] = useState(120)
    const [weight, setWeight] = useState(50)
    const [dateBirth, setDateBirth] = useState('2020-01-01')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    const [submitted, setSubmitted] = useState(false)

    const [errorMsg, setErrorMsg] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(typeof dateBirth)
        setSubmitted(true)

        // stop here if form is invalid
        if (!(username && password && checkPassword && email)) {
            setErrorMsg('tout les champs ne sont pas rensigné')
            return;
        }

        if (password !== checkPassword) {
            setErrorMsg('les deux mot de passe ne corresponde pas')
            return
        }

        register(username, password, email, size, weight, dateBirth)
            .then(
                user => {
                    //const { from } = location.state || { from: { pathname: "/" } };
                    console.log(user, 'user')
                    history.push("/");
                },
                error => {
                    setErrorMsg(error)
                    console.log('erreur', error)
                }
            );
    }


    return (
        <ContainerRegisterPage>
            <h1>Creer un nouveau Compte</h1>
            <p>Veuillez remplir les champs</p>
            <FormStyled name="form" onSubmit={handleSubmit}>
                <TextFieldStyled id="username"
                                 label="Pseudo *"
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

                <TextFieldStyled id="email"
                                 label="Adresse Mail *"
                                 variant="outlined"
                                 type="email"
                                 autoComplete="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 error={submitted && !email}
                                 helperText={submitted && !email ?
                                     <small>Veuillez rentrer votre adresse mail!</small> : email !== "" ?
                                         <small>Correct*</small> : false}
                />

                <TextFieldStyled id="password"
                                 label="Mot de passe *"
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
                <TextFieldStyled id="checkPassword"
                                 label="Retaper votre mot de passe *"
                                 variant="outlined"
                                 type="password"
                                 autoComplete="off"
                                 value={checkPassword}
                                 onChange={(e) => setCheckPassword(e.target.value)}
                                 error={submitted && !checkPassword}
                                 helperText={submitted && !checkPassword ?
                                     <small>Veuillez rentrer votre mot de passe !</small> : checkPassword !== "" ?
                                         <small>Correct*</small> : false}
                />

                <label htmlFor="size">Taille Comprise entre (120-200)cm :</label>
                <input
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    id="size"
                    type="number"
                    min="120"
                    max="200"
                />

                <label htmlFor="weight">Poids Compris entre (30-130)kg :</label>
                <input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    id="weight"
                    type="number"
                    min="30"
                    max="130"
                />

                {<TextFieldStyled id="dateBirth"
                                 label="date d'anniversaire"
                                 type="date"
                                 value={dateBirth}
                                 onChange={(e) => setDateBirth(e.target.value)}
                />}
                <ButtonStyled type="submit" variant="contained" color="secondary">
                    Creer un nouveau Compte
                </ButtonStyled>
                {errorMsg && <p>{errorMsg}</p>}
            </FormStyled>
        </ContainerRegisterPage>
    )
}

const ContainerRegisterPage = styled.div`
    //height: 100vh;
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

export default RegisterPage
