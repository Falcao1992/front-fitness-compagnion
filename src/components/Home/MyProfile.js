import React, {useState, useEffect} from "react";
import moment from "moment";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {ButtonStyled} from "../../styledComponents/ButtonStyled";

import {InlineIcon} from '@iconify/react';
import womanRunningLightSkinTone from '@iconify/icons-noto/woman-running-light-skin-tone';
import manRunningMediumSkinTone from '@iconify/icons-noto/man-running-medium-skin-tone';
import bgMyProfilePage from "../../assets/images/bgMyProfilePage.jpg";
import SideBar from "./SideBar";
import {
    BlockButtons,
    BlockInputLabelStyled, BlockRadio, ContainerMultiNumberField,
    FormStyled, InputStyled, LabelInputStyled, TextFieldDateStyled,
    TextFieldStyled
} from "../../styledComponents/FormComponents";
import {BlockTitle, ContainerPage} from "../../styledComponents/UniformPageComponents";


const axios = require('axios');

const MyProfile = ({history}) => {

    const [dataUserFormatted, setDataUserFormatted] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [dataHasBeenModified, setDataHasBeenModified] = useState(false)

    useEffect(() => {
        formatUserData()
        setIsLoading(false)
    }, [])

    const formatUserData = () => {
        const dataUser = JSON.parse(localStorage.getItem('user'))
        setDataUserFormatted(dataUser)
        console.log(dataUser)
    }

    const handleChange = (e) => {
        setDataHasBeenModified(true)
        if (e.target.name === 'gender') {
            setDataUserFormatted({...dataUserFormatted, [e.target.name]: e.target.value})
        } else {
            setDataUserFormatted({...dataUserFormatted, [e.target.id]: e.target.value});
        }
    };

    const onSubmit = () => {
        if (dataHasBeenModified) {
            console.log(dataUserFormatted, "dataUserFormatted")
            axios.put(`http://localhost:8000/api/v1/users/${id}`, dataUserFormatted);
            localStorage.setItem('user', JSON.stringify(dataUserFormatted))
            history.push("/")
        } else {
            console.log("pas de ta modifier")
        }
    }

    if (isLoading && dataUserFormatted === null) {
        return (
            <div>
                pas encore chargé
            </div>
        )
    }

    /*const calculateAge = () => {
        const a = moment();
        const b = moment(birthday, 'YYYY');
        return a.diff(b, 'years'); // calculates patient's age in years
    }
    */

    const {username, size, weight, email, id, gender, birthday} = dataUserFormatted

    return (
        <>
            <SideBar history={history} sidebar={true}/>
            <ContainerPage bgPage={bgMyProfilePage}>
                {console.log('render Myprofile')}

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
                                    min="120"
                                    max="200"
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

                        <TextFieldDateStyled id="birthday"
                                             label="Anniversaire"
                                             type="date"
                                             value={birthday !== null ? moment(birthday).format('YYYY-MM-DD') : '2000-01-01'}
                                             onChange={handleChange}
                        />

                        <BlockRadio>
                            <FormLabel component="legend">Sexe :</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleChange}>
                                <FormControlLabel value="man" id="man" control={<Radio/>}
                                                  label={<InlineIcon icon={manRunningMediumSkinTone} width="40px"
                                                                     height="40px"/>}/>
                                <FormControlLabel value="women" id="woman" control={<Radio/>}
                                                  label={<InlineIcon icon={womanRunningLightSkinTone} width="40px"
                                                                     height="40px"/>}/>
                            </RadioGroup>
                        </BlockRadio>
                    </div>
                    <BlockButtons>
                        <ButtonStyled
                            type="button"
                            onClick={() => onSubmit()}
                            disabledBtn={!dataHasBeenModified}
                            colorBtnPrimary="aliceblue"
                            colorBtnSecondary="rgba(46, 59, 133, 0.816)"
                        >
                            Modifier mon Profile
                        </ButtonStyled>
                    </BlockButtons>
                </FormStyled>
            </ContainerPage>
        </>
    )
}


export default MyProfile
