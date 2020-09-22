import React, {useState} from "react";

import {login} from "../../_services/user.service";
import {Link} from "react-router-dom";

import bgLoginPage from '../../assets/images/bgLoginPage.jpg'
import {ButtonStyled} from "../../styledComponents/ButtonStyled";
import {BlockImageHeader, BlockTitle, ContainerPage} from "../../styledComponents/UniformPageComponents";
import {FormStyled, TextFieldStyled} from "../../styledComponents/FormComponents";
import styled from "styled-components"
import {handleErrMsg} from "../../functionUtils/FunctionUtils";

const LoginPage = ({location, history}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit')
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
                    console.log('dans le then, from', from)
                },
                error => {
                    if (error.message === 'Failed to fetch') {
                        throw new Error('Serveur indisponible')
                    } else {
                        setErrorMsg(error)
                    }
                }
            )
            .catch((err) => {
                console.error({msg: err})
                setErrorMsg(err.message)
            })
    }

    return (
        <ContainerHeaderMain>
            <BlockImageHeader>
                <img src={bgLoginPage} alt="Jeune femme faisant du sport"/>
            </BlockImageHeader>
            <ContainerPage>

                <BlockTitle>
                    <h1>Fitness<br/>Companion</h1>
                    <p>Entrer votre pseudo et votre mot de passe pour acceder à votre compte. </p>
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
                                         <small>Veuillez rentrer votre pseudo svp !</small> : false}
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
                </FormStyled>
                {handleErrMsg(errorMsg)}

                <ButtonStyled type="button"
                              disabledBtn={!username || !password}
                              onClick={handleSubmit}
                              colorBtnPrimary="aliceblue"
                              colorBtnSecondary="rgba(46, 59, 133, 0.8)"
                >
                    <span>Me Connecter</span>
                </ButtonStyled>

                <BlockAccountMsg>
                    <p>Vous n'avez pas de compte?</p>
                    <p><Link to="/register">Creer un nouveau Compte</Link></p>
                </BlockAccountMsg>


            </ContainerPage>
        </ContainerHeaderMain>
    )
}
const ContainerHeaderMain = styled.main`
    @media screen and (min-width: 750px){
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100vh;
    }
    @media screen and (min-width: 1200px){
        flex-direction: row;
        width: 80%;
        
        margin: auto;
    }
`
const BlockAccountMsg = styled.div`
    margin: 1.4rem 0;
    p:first-child {
        font-size: .8rem;
        color: ${props => props.theme.colors.primary};
        margin-bottom: .7rem;
    }
    a {
        color: ${props => props.theme.colors.third};
    }
`

export default LoginPage
