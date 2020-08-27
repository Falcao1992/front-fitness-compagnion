import React, {useState} from "react";
import {register} from "../../_services/user.service";
import styled from 'styled-components'
import {TextField, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ButtonStyled} from "../../styledComponents/ButtonStyled";
import {InlineIcon} from "@iconify/react";
import manRunningMediumSkinTone from "@iconify/icons-noto/man-running-medium-skin-tone";
import womanRunningLightSkinTone from "@iconify/icons-noto/woman-running-light-skin-tone";
import {
    BlockButtons,
    BlockInputLabelStyled, BlockRadio,
    ContainerMultiNumberField,
    FormStyled, InputStyled, KeyboardDatePickerStyled, LabelInputStyled,
    TextFieldStyled
} from "../../styledComponents/FormComponents";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {handleErrMsg} from "../../functionUtils/FunctionUtils";


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
                    history.push("/");
                },
                error => {
                    setErrorMsg(error)
                    console.log('erreur', error)
                }
            );
    }

    const handleChangeDate = (date) => {
        setBirthday(date)
    }

    return (
        <>
            <FormStyled name="form" sidebar={false}>
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


                <ContainerMultiNumberField>
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

                </ContainerMultiNumberField>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePickerStyled
                        disableToolbar
                        variant="inline"
                        format="d MMM yyyy"
                        margin="normal"
                        id="birthday"
                        label="Anniversaire"
                        value={birthday}
                        onChange={handleChangeDate}
                    />
                </MuiPickersUtilsProvider>

                <BlockRadio>
                    <FormLabel component="legend">Sexe :</FormLabel>
                    <RadioGroup aria-label="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel value="man" id="man" control={<Radio/>}
                                          label={<InlineIcon icon={manRunningMediumSkinTone} width="40px"
                                                             height="40px"/>}/>
                        <FormControlLabel value="women" id="woman" control={<Radio/>}
                                          label={<InlineIcon icon={womanRunningLightSkinTone} width="40px"
                                                             height="40px"/>}/>
                    </RadioGroup>
                </BlockRadio>

                {handleErrMsg(errorMsg)}
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

const ContainerPasswords = styled.div`
    display: flex;
    justify-content: space-between;
`

const TextFieldStyledMultiple = styled(TextField)`
    width: 48%;
    margin-bottom: .6rem !important;
`

export default RegisterForm
