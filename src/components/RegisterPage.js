import React, {useState} from "react";
import {register} from "../_services/user.service";
import styled from 'styled-components'
import {TextField, Button} from '@material-ui/core';
import bgRegisterPage from "../assets/images/bgRegisterPage.jpeg"
import {ButtonStyled} from "../styledComponents/ButtonStyled";


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
        setSubmitted(true)

        // stop here if form is invalid
        if (!(username && password && checkPassword && email)) {
            setErrorMsg('Veuillez remplir les champs obligatoire svp*')
            return;
        }

        if (password !== checkPassword) {
            setErrorMsg('Les deux mot de passe ne correspondent pas')
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
        <ContainerRegisterPage bgPage={bgRegisterPage}>
            <BlockTitle>
                {console.log('render')}
                <h1>Creer un nouveau Compte</h1>
            </BlockTitle>
            <FormStyled name="form">
                <TextFieldStyled id="username"
                                 label="Pseudo *"
                                 variant="filled"
                                 type="text"
                                 autoComplete="nickname"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 error={submitted && !username}
                                 //helperText={submitted && !username ? <small>Veuillez saisir votre pseudo !</small> : false}
                />

                <TextFieldStyled id="email"
                                 label="Adresse électronique *"
                                 variant="filled"
                                 type="email"
                                 autoComplete="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 error={submitted && !email}
                                 //helperText={submitted && !email ? <small>Veuillez saisir votre adresse mail!</small> : false}
                />

                <ContainerPasswords>
                    <TextFieldStyledMultiple id="password"
                                     label="Mot de passe *"
                                     variant="filled"
                                     type="password"
                                     autoComplete="current-password"
                                     value={password}
                                     onChange={(e) => setPassword(e.target.value)}
                                     error={submitted && !password}
                                     //helperText={submitted && !password ? <small>Veuillez saisir votre mot de passe !</small> : false}
                    />
                    <TextFieldStyledMultiple id="checkPassword"
                                     label="Mot de passe *"
                                     variant="filled"
                                     type="password"
                                     autoComplete="off"
                                     value={checkPassword}
                                     onChange={(e) => setCheckPassword(e.target.value)}
                                     error={submitted && !checkPassword}
                                     //helperText={submitted && !checkPassword ? <small>Veuillez saisir à nouveau votre mot de passe !</small> : false}
                    />
                </ContainerPasswords>


                <ContainerSizeWeight>
                    <BlockInputLabelStyled>
                        <LabelInputStyled htmlFor="size">Taille (cm): </LabelInputStyled>
                        <InputStyled
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            id="size"
                            type="number"
                            min="120"
                            max="200"
                        />
                    </BlockInputLabelStyled>

                    <BlockInputLabelStyled>
                        <LabelInputStyled htmlFor="weight">Poids (kg): </LabelInputStyled>
                        <InputStyled
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            id="weight"
                            type="number"
                            min="30"
                            max="130"
                        />
                    </BlockInputLabelStyled>

                </ContainerSizeWeight>


                {<TextFieldDateStyled id="dateBirth"
                                  label="Anniversaire"
                                  type="date"
                                  value={dateBirth}
                                  onChange={(e) => setDateBirth(e.target.value)}
                />}

                {errorMsg && <ErrorMsgStyled>{errorMsg}</ErrorMsgStyled>}
            </FormStyled>
            <BlockButtons>
                <ButtonStyled
                    type="button"
                    onClick={handleSubmit}
                    colorBtnPrimary="aliceblue"
                    colorBtnSecondary="rgba(46, 59, 133, 0.816)"
                >
                    Creer un nouveau Compte
                </ButtonStyled>
            </BlockButtons>

        </ContainerRegisterPage>
    )
}

const ContainerRegisterPage = styled.div`
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
    background-color: rgb(240 248 255 / 73%);
    margin-bottom: .6rem !important;
`

const TextFieldDateStyled = styled(TextField)`
    background-color: rgb(206 214 221 / 80%);
    label {
        padding: 0.5rem .7rem;
    }
    input {
        text-align: center;
        padding: .7rem;
    }
`
const ContainerPasswords = styled.div`
    display: flex;
    justify-content: space-between;
`

const TextFieldStyledMultiple = styled(TextField)`
    background-color: rgb(240 248 255 / 73%);
    width: 48%;
    margin-bottom: .6rem !important;
`

const ContainerSizeWeight = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: .6rem;
    color: rgba(0, 0, 0, 0.54);
    
`

const BlockInputLabelStyled = styled.div`
    background-color: rgb(206 214 221 / 80%);
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const LabelInputStyled = styled.label`
    align-self: center;
    padding: .5rem .5rem .1rem;
    font-family: "Roboto", sans-serif;
    
`

const InputStyled = styled.input`
    background-color: rgb(240 248 255 / 23%);
    text-align: center;
    border: none;
    padding: .5rem 0;
    color: rgba(0, 0, 0, 0.54);
    
    :focus {
        outline-color: rgba(46, 59, 133, 0.816);;
    }
`

const ErrorMsgStyled = styled.p`
    background-color: rgb(240 248 255 / 100%);
    color: #ff3b3b;
    text-align: center;
    padding: .5rem;
    margin-top: .5rem;
`

const BlockButtons = styled.div`
    width: 70%;
    margin: 0 auto;
`


export default RegisterPage
