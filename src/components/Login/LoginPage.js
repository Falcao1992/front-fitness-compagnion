import React, {useState} from "react";

import {login} from "../../_services/user.service";
import {Link} from "react-router-dom";

import bgLoginPage from '../../assets/images/bgLoginPage.jpg'
import {ButtonStyled} from "../../styledComponents/ButtonStyled";
import {BlockTitle, ContainerPage} from "../../styledComponents/UniformPageComponents";
import {BlockButtons, FormStyled, TextFieldStyled} from "../../styledComponents/FormComponents";
import {handleErrMsg} from "../../functionUtils/FunctionUtils";

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
        <ContainerPage bgPage={bgLoginPage}>
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
            </FormStyled>
            {handleErrMsg(errorMsg)}
            <BlockButtons column={true} >
                <ButtonStyled type="button"
                              disabledBtn={!username || !password}
                              onClick={handleSubmit}
                              colorBtnPrimary="aliceblue"
                              colorBtnSecondary="rgba(46, 59, 133, 0.8)"
                >
                    <span>Me Connecter</span>
                </ButtonStyled>

                <ButtonStyled type="button"
                              colorBtnPrimary="aliceblue"
                              colorBtnSecondary="rgb(226 21 64 / 82%)"
                ><Link to="/register">
                    Creer un nouveau Compte</Link>
                </ButtonStyled>

            </BlockButtons>
        </ContainerPage>
    )
}

export default LoginPage
