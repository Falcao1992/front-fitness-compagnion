import React, {useState, useEffect} from "react";
import moment from "moment";
import {FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import {ButtonStyled} from "../../styledComponents/ButtonStyled";
import styled from "styled-components";

import {InlineIcon} from '@iconify/react';
import womanRunningLightSkinTone from '@iconify/icons-noto/woman-running-light-skin-tone';
import manRunningMediumSkinTone from '@iconify/icons-noto/man-running-medium-skin-tone';
import bgMyProfilePage from "../../assets/images/bgMyProfilePage.jpg";
import SideBar from "./SideBar";


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
            <SideBar history={history}/>
            <ContainerMyProfilePage bgPage={bgMyProfilePage}>
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

                        <ContainerSizeWeight>
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
                        </ContainerSizeWeight>

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
            </ContainerMyProfilePage>
        </>
    )
}

const ContainerMyProfilePage = styled.section`
    display: flex;
    flex-direction: column;
    height: 100vh;
    //justify-content: space-evenly;
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
    margin: 1.5rem 0;
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
    
    // modif avec sidebar
    height: 100%;
    justify-content: space-evenly;
`

const TextFieldStyled = styled(TextField)`
    width: 100%;
    background-color: rgb(240 248 255 / 90%);
    margin-bottom: .6rem !important;
`
const ContainerSizeWeight = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: .6rem;
    color: rgba(0, 0, 0, 0.54);
    
`

const BlockInputLabelStyled = styled.div`
    background-color: rgb(206 214 221 / 95%);
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
// Input size and weight
const InputStyled = styled.input`
    background-color: rgb(240 248 255 / 10%);
    text-align: center;
    border: none;
    padding: .5rem 0;
    color: rgba(0, 0, 0, 0.54);
    
    :focus {
        outline-color: rgba(46, 59, 133, 0.816);;
    }
`

const TextFieldDateStyled = styled(TextField)`
    width: 100%;
    background-color: rgb(206 214 221 / 95%);
    margin-bottom: .6rem !important;
    label {
        padding: 0.5rem .7rem;
    }
    input {
        text-align: center;
        padding: .7rem;
    }
`

const BlockRadio = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(206 214 221 / 95%);
    margin-bottom: .6rem;
    padding: .5rem;
    
    > div {
        flex-direction: row;
    }
    
    > legend {
        padding-left: .5rem;
    }
`

const BlockButtons = styled.div`
    width: 70%;
    margin: 0 auto;
`

export default MyProfile
