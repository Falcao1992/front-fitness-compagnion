import React, {useState} from "react";
import {register} from "../../_services/user.service";
import styled from 'styled-components'
import {TextField, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ButtonStyled} from "../../styledComponents/ButtonStyled";


const RegisterForm = ({history}) => {

    const [username, setUsername] = useState('')
    const [size, setSize] = useState(120)
    const [weight, setWeight] = useState(50)
    const [birthday, setBirthday] = useState('2020-01-01')
    const [gender, setGender] = useState('man')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    const [submitted, setSubmitted] = useState(false)

    const [errorMsg, setErrorMsg] = useState(null)

    const handleErrMsg = () => {
        if (errorMsg) {
            return <ErrorMsgStyled>{errorMsg}</ErrorMsgStyled>
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation()
        setSubmitted(true)

        // stop here if form is invalid
        if (!(username && password && checkPassword && email && gender)) {
            setErrorMsg('Veuillez remplir les champs obligatoire svp*')
            return;
        }

        if (password !== checkPassword) {
            setErrorMsg('Les deux mot de passe ne correspondent pas')
            return
        }

        register(username, password, email, size, weight, birthday, gender)
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
        <>
            <FormStyled name="form">
                <TextFieldStyled id="username"
                                 label="Pseudo *"
                                 variant="filled"
                                 type="text"
                                 autoComplete="nickname"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 error={submitted && !username}
                />

                <TextFieldStyled id="email"
                                 label="Adresse électronique *"
                                 variant="filled"
                                 type="email"
                                 autoComplete="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 error={submitted && !email}
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
                    />
                    <TextFieldStyledMultiple id="checkPassword"
                                             label="Mot de passe *"
                                             variant="filled"
                                             type="password"
                                             autoComplete="off"
                                             value={checkPassword}
                                             onChange={(e) => setCheckPassword(e.target.value)}
                                             error={submitted && !checkPassword}
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


                {<TextFieldDateStyled id="birthday"
                                      label="Anniversaire"
                                      type="date"
                                      value={birthday}
                                      onChange={(e) => setBirthday(e.target.value)}
                />}
                <div>
                    <FormLabel component="legend">Sexe</FormLabel>
                    <RadioGroup aria-label="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel value="man" control={<Radio />} label="man" />
                        <FormControlLabel value="women" control={<Radio />} label="women" />
                    </RadioGroup>
                </div>

                {handleErrMsg()}
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
        </>
    )
}

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

const ErrorMsgStyled = styled.span`
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


export default RegisterForm
