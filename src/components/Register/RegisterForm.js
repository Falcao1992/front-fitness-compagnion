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
import 'moment/locale/fr'
import moment from "moment";
import frLocale from "date-fns/locale/fr"

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

    moment.locale("fr")

    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


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

        if (username.length <= 4 || username.length >= 13) {
            setErrorMsg("Votre pseudo doit contenir entre 3 et 15 caractères")
            return
        } else if (weight < 30 || weight > 150) {
            setErrorMsg("Votre poids doit etre entre 30 et 150kg")
            return
        } else if (size <= 100 || size >= 210) {
            setErrorMsg("Votre taille doit etre entre 100 et 210cm")
            return
        } else if (!EMAIL_REGEX.test(email)) {
            setErrorMsg("Email Invalide")
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
                }
            );
    }

    const handleChangeDate = (date) => {
        let dateFormat = moment(date, "DD MMM YYYY").format("YYYY-MM-DD")
        setBirthday(dateFormat)
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
                        <LabelInputStyled htmlFor="size">Taille (cm) </LabelInputStyled>
                        <InputStyled
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            id="size"
                            type="number"
                            min="120"
                            max="210"
                        />
                    </BlockInputLabelStyled>

                    <BlockInputLabelStyled>
                        <LabelInputStyled htmlFor="weight">Poids (kg) </LabelInputStyled>
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

                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                    <KeyboardDatePickerStyled
                        invalidDateMessage
                        animateYearScrolling={true}
                        format="d MMM yyyy"
                        id="birthday"
                        label="Anniversaire"
                        value={birthday}
                        onChange={handleChangeDate}
                    />
                </MuiPickersUtilsProvider>

                <BlockRadio>
                    <FormLabel component="legend">Sexe :</FormLabel>
                    <RadioGroup aria-label="gender" name="gender" value={gender}
                                onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel value="man" id="man" control={<Radio/>}
                                          label={<InlineIcon icon={manRunningMediumSkinTone} width="40px"
                                                             height="40px"/>}/>
                        <FormControlLabel value="women" id="woman" control={<Radio/>}
                                          label={<InlineIcon icon={womanRunningLightSkinTone} width="40px"
                                                             height="40px"/>}/>
                    </RadioGroup>
                </BlockRadio>

            </FormStyled>
            {handleErrMsg(errorMsg)}
            <ButtonStyled
                type="button"
                onClick={handleSubmit}
                colorBtnPrimary="aliceblue"
                colorBtnSecondary="rgba(46, 59, 133, 0.816)"
            >
                Creer mon Compte
            </ButtonStyled>
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
