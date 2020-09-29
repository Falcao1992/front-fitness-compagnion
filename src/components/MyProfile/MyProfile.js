import React, {useState, useEffect} from "react";
import moment from "moment";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {ButtonStyled} from "../../styledComponents/ButtonStyled";

import {InlineIcon} from '@iconify/react';
import womanRunningLightSkinTone from '@iconify/icons-noto/woman-running-light-skin-tone';
import manRunningMediumSkinTone from '@iconify/icons-noto/man-running-medium-skin-tone';
import SideBar from "../SideBar/SideBar";
import {
    BlockButtons,
    BlockInputLabelStyled, BlockRadio, ContainerMultiNumberField,
    FormStyled, InputStyled, KeyboardDatePickerStyled, LabelInputStyled,
    TextFieldStyled
} from "../../styledComponents/FormComponents";

import {
    BlockImageHeader,
    BlockTitle,
    ContainerHeaderMain,
    ContainerLoading,
    ContainerPage, ContainerPrincipal
} from "../../styledComponents/UniformPageComponents";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {handleErrMsg} from "../../functionUtils/FunctionUtils";
import CircularProgress from "@material-ui/core/CircularProgress"
import {toast} from "react-toastify"
import frLocale from "date-fns/locale/fr"
import bgMyProfilePage from "../../assets/images/bgMyProfilePage.jpg"

const axios = require('axios');

const MyProfile = ({history}) => {

    const [dataUserFormatted, setDataUserFormatted] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataHasBeenModified, setDataHasBeenModified] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)


    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/user?Access_token=${localStorage.getItem("token")}`);
                return result.data
            } catch (error) {
                if (error.response.status === 401) {
                    // Redirect if status (401) unauthorized ex. token expired
                    history.push(`/login`)
                    localStorage.clear()
                }
                console.error(error)
            }
        }
        fetchUserData()
            .then((userData) => {
                setDataUserFormatted(userData)
            })
            .then(() => {
                setIsLoading(false)
            })
    }, [history])


    const handleChange = (e, date) => {
        setDataHasBeenModified(true)
        if (e === null || e.target === undefined) {
            let dateFormat = moment(date, "DD MMM YYYY").format("YYYY-MM-DD")
            setDataUserFormatted({...dataUserFormatted, "birthday": dateFormat})
        } else if (e.target.name === 'gender') {
            setDataUserFormatted({...dataUserFormatted, [e.target.name]: e.target.value})
        } else {
            setDataUserFormatted({...dataUserFormatted, [e.target.id]: e.target.value});
        }
    };

    const onSubmit = () => {
        try {
            if (dataHasBeenModified) {
                if (username.length < 2 || username.length > 15) {
                    setErrorMsg("Votre pseudo doit contenir entre 3 et 15 caractères")
                } else if (weight < 30 || weight > 150) {
                    setErrorMsg("Votre poids doit etre entre 30 et 150kg")
                } else if (size <= 100 || size >= 210) {
                    setErrorMsg("Votre taille doit etre entre 100 et 210cm")
                } else if (!EMAIL_REGEX.test(email)) {
                    setErrorMsg("Email Invalide")
                } else {
                    axios.put(`${process.env.REACT_APP_BASE_URL}/user/edit?Access_token=${localStorage.getItem("token")}`, dataUserFormatted);
                    toast.success('🦄 Votre profil à été correctement mis à jour!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false
                    });
                    history.push("/")
                }
            } else {
                setErrorMsg("Aucun changement effectué")
            }
        } catch (error) {
            console.error(error)
        }

    }

    if (isLoading && dataUserFormatted.username !== null) {
        return (
            <ContainerLoading>
                <CircularProgress size="5rem"/>
            </ContainerLoading>
        )
    }

    const {username, size, weight, email, gender, birthday} = dataUserFormatted

    return (
        <>
            <ContainerHeaderMain>
                <SideBar history={history} sidebar={true}/>
                <ContainerPage>
                    {console.log('render Myprofile')}
                    <BlockImageHeader>
                        <img src={bgMyProfilePage} alt="Homme faisant du sport"/>
                    </BlockImageHeader>
                    <ContainerPrincipal>
                        <BlockTitle>
                            <h1>Mon Profil</h1>
                        </BlockTitle>

                        <FormStyled>
                            <div>
                                <TextFieldStyled id="username"
                                                 label="Pseudo *"
                                                 variant="filled"
                                                 type="text"
                                                 autoComplete="nickname"
                                                 value={username}
                                                 onChange={handleChange}
                                />

                                <TextFieldStyled id="email"
                                                 label="Adresse électronique *"
                                                 variant="filled"
                                                 type="email"
                                                 autoComplete="email"
                                                 value={email}
                                                 onChange={handleChange}
                                />

                                <ContainerMultiNumberField>
                                    <BlockInputLabelStyled>
                                        <LabelInputStyled htmlFor="size">Taille (cm): </LabelInputStyled>
                                        <InputStyled
                                            value={size}
                                            onChange={handleChange}
                                            id="size"
                                            type="number"
                                            min="100"
                                            max="210"
                                        />
                                    </BlockInputLabelStyled>

                                    <BlockInputLabelStyled>
                                        <LabelInputStyled htmlFor="weight">Poids (kg): </LabelInputStyled>
                                        <InputStyled
                                            value={weight}
                                            onChange={handleChange}
                                            id="weight"
                                            type="number"
                                            min="30"
                                            max="130"
                                        />
                                    </BlockInputLabelStyled>
                                </ContainerMultiNumberField>

                                <MuiPickersUtilsProvider locale={frLocale} utils={DateFnsUtils}>
                                    <KeyboardDatePickerStyled
                                        invalidDateMessage="Format de date invalide"
                                        animateYearScrolling={true}
                                        format="d MMM yyyy"
                                        id="date"
                                        label="Anniversaire"
                                        value={birthday}
                                        onChange={handleChange}
                                    />
                                </MuiPickersUtilsProvider>

                                <BlockRadio>
                                    <FormLabel component="legend">Sexe :</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender" value={gender}
                                                onChange={handleChange}>
                                        <FormControlLabel value="man" id="man" control={<Radio/>}
                                                          label={<InlineIcon icon={manRunningMediumSkinTone}
                                                                             width="40px"
                                                                             height="40px"/>}/>
                                        <FormControlLabel value="women" id="woman" control={<Radio/>}
                                                          label={<InlineIcon icon={womanRunningLightSkinTone}
                                                                             width="40px"
                                                                             height="40px"/>}/>
                                    </RadioGroup>
                                </BlockRadio>
                            </div>

                        </FormStyled>
                        {handleErrMsg(errorMsg)}
                        <BlockButtons>
                            <ButtonStyled
                                type="button"
                                onClick={() => onSubmit()}
                                disabledBtn={!dataHasBeenModified}
                                disabled={!dataHasBeenModified}
                            >
                                Modifier mon Profile
                            </ButtonStyled>
                        </BlockButtons>
                    </ContainerPrincipal>
                </ContainerPage>
            </ContainerHeaderMain>
        </>
    )
}


export default MyProfile
