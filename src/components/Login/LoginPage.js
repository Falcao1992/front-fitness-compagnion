import React, {useState} from "react";

import {login} from "../../_services/user.service";
import {Link} from "react-router-dom";

import styled from 'styled-components'
import {TextField} from '@material-ui/core';
import bgLoginPage from '../../assets/images/bgLoginPage.jpg'
import {ButtonStyled} from "../../styledComponents/ButtonStyled";

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
        <ContainerLoginPage bgPage={bgLoginPage}>
            <BlockTitle>
                <h1>Fitness Compagnion</h1>
            </BlockTitle>
            <FormStyled name="form">
                <TextFieldStyled id="username"
                                 label="Pseudo"
                                 variant="filled"
                                 type="text"
                                 autoComplete="nickname"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 error={submitted && !username}
                                 helperText={submitted && !username ?
                                     <small>Veuillez rentrer votre pseudo !</small> : false}
                />
                <TextFieldStyled id="password"
                                 label="Mot de passe"
                                 variant="filled"
                                 type="password"
                                 autoComplete="current-password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 error={submitted && !password}
                                 helperText={submitted && !password ?
                                     <small>Veuillez rentrer votre mot de passe !</small> : false}
                />
                {errorMsg && <ErrorMsgStyled>{errorMsg}</ErrorMsgStyled>}
            </FormStyled>
            <BlockButtons>
                <ButtonStyled type="button"
                              onClick={handleSubmit}
                              colorBtnPrimary="aliceblue"
                              colorBtnSecondary="rgba(46, 59, 133, 0.8)"
                >
                    Me Connecter
                </ButtonStyled>
                <Link to="/register">
                    <ButtonStyled type="button"
                                  colorBtnPrimary="aliceblue"
                                  colorBtnSecondary="rgb(226 21 64 / 82%)"
                    >
                        Creer un nouveau Compte
                    </ButtonStyled>
                </Link>
            </BlockButtons>
        </ContainerLoginPage>
    )
}

const ContainerLoginPage = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-image: url(${props => props.bgPage});
    background-size: cover;
    background-position: left;
`

const BlockTitle = styled.div`
    text-align: center;
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.primary};
    border-top: 2px solid ${props => props.theme.colors.secondary};
    border-bottom: 2px solid ${props => props.theme.colors.secondary};
    opacity: .9;
    h1 {
        font-size: 1.7rem;
        color: ${props => props.theme.colors.secondary};

    }
`

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 0 auto;
`

const TextFieldStyled = styled(TextField)`
    width: 100%;
    background-color: rgb(240 248 255 / 83%);
    margin-bottom: 1rem !important;
`
const ErrorMsgStyled = styled.p`
    background-color: rgb(240 248 255 / 83%);
    color: #ff3b3b;
    text-align: center;
    padding: .5rem;
`
const BlockButtons = styled.div`
    width: 70%;
    margin: 0 auto;
`

export default LoginPage
