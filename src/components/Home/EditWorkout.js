import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import SideBar from "./SideBar";
import {
    BlockButtons,
    BlockInputLabelStyled, ContainerMultiNumberField,
    FormStyled, InputStyled, LabelInputStyled,
    TextFieldDateStyled,
    TextFieldStyled
} from "../../styledComponents/FormComponents";

import {InputLabel, Select, MenuItem} from '@material-ui/core';
import bgEditWorkoutPage from "../../assets/images/bgEditWorkoutPage.jpg"
import {BlockTitle, ContainerPage} from "../../styledComponents/UniformPageComponents";
import moment from "moment";
import {ButtonStyled} from "../../styledComponents/ButtonStyled";
import {InlineIcon} from "@iconify/react";
import timerIcon from "@iconify/icons-carbon/timer";
import sortNumericallyOutline from "@iconify/icons-typcn/sort-numerically-outline";
import repeatLine from "@iconify/icons-clarity/repeat-line";
import bxShowAlt from "@iconify/icons-bx/bx-show-alt";
import styled from "styled-components";

const axios = require('axios');

const EditWorkout = ({location, history}) => {


    const {workout} = location.state;
    const [workoutUpdate, setWorkoutUpdate] = useState(workout)
    const [exercisesUpdate, setExercisesUpdate] = useState(workout.DetailsExercises)
    const [defaultExercises, setDefaultExercises] = useState(null)

    let {workoutId} = useParams()

    useEffect( () => {
        fetchDefaultExercises()
            .then((defaultEx) => {
                setDefaultExercises(defaultEx)
            })
    }, [])

    const fetchDefaultExercises = async () => {
        try {
            const resultDefaultExercises = await axios.get(`http://localhost:8000/api/v1/defaultExercises`)
            return resultDefaultExercises.data
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeWorkoutData = (e) => {
        setWorkoutUpdate({...workoutUpdate, [e.target.id]: e.target.value})
    };

    const handleChangeExercisesData = (e, index) => {
        let copyExercisesUpdate = [...exercisesUpdate]
        copyExercisesUpdate[index] = {...copyExercisesUpdate[index], [e.target.name]: parseInt(e.target.value)}
        setExercisesUpdate(copyExercisesUpdate)
    }

    const onSubmit = () => {
        if (workoutUpdate) {
            console.log(workoutUpdate, "dataUserFormatted")
            axios.put(`http://localhost:8000/api/v1/${workoutUpdate.UserId}/workout/${workoutUpdate.id}`, workoutUpdate);
            history.push(`/workouts`)
            console.log('data modifié')
        } else {
            console.log("pas de ta modifier")
        }
    }

    const {name, duration, date, hour} = workoutUpdate

    return (
        <>
            <SideBar history={history} sidebar={true}/>
            <ContainerPage bgPage={bgEditWorkoutPage}>
                <BlockTitle>
                    <h1>Ma séance</h1>
                    <p>Modifier "{workoutUpdate.name}"</p>
                </BlockTitle>
                <FormStyled>
                    <div>
                        <TextFieldStyled id="name"
                                         label="Nom de la séance *"
                                         variant="filled"
                                         type="text"
                                         value={name}
                                         onChange={handleChangeWorkoutData}
                        />

                        <TextFieldDateStyled id="date"
                                             label="Date *"
                                             type="date"
                                             value={date !== null ? moment(date).format('YYYY-MM-DD') : '2000-01-01'}
                                             onChange={handleChangeWorkoutData}
                        />
                        <ContainerMultiNumberField>
                            <BlockInputLabelStyled>
                                <LabelInputStyled htmlFor="duration">Durée (mn): </LabelInputStyled>
                                <InputStyled
                                    value={duration}
                                    onChange={handleChangeWorkoutData}
                                    id="duration"
                                    type="number"
                                    min="5"
                                    max="180"
                                />
                            </BlockInputLabelStyled>
                            <BlockInputLabelStyled>
                                <LabelInputStyled htmlFor="hour">Heure: </LabelInputStyled>
                                <InputStyled
                                    value={hour}
                                    onChange={handleChangeWorkoutData}
                                    id="hour"
                                    type="time"
                                />
                            </BlockInputLabelStyled>
                        </ContainerMultiNumberField>
                    </div>
                    <BlockButtons>
                        <ButtonStyled
                            type="button"
                            onClick={() => onSubmit()}
                            //disabledBtn={!dataHasBeenModified}
                            colorBtnPrimary="aliceblue"
                            colorBtnSecondary="rgba(46, 59, 133, 0.816)"
                        >
                            Modifier ma séance
                        </ButtonStyled>
                    </BlockButtons>
                </FormStyled>
                <form>
                    <div>
                        {exercisesUpdate !== null && exercisesUpdate.map((ex, index) => {
                            return (
                                <BlockExercise key={ex.id}>
                                    <div><p>Exercice {index + 1}</p><span>{ex.DefaultExercise.name}</span></div>
                                    <InputLabel id={`NameExercise${ex.id}`}>Nom</InputLabel>
                                    <Select
                                        labelId={`NameExercise${ex.id}`}
                                        name="DefaultExerciseId"
                                        value={ex.DefaultExerciseId}
                                        onChange={(e) => handleChangeExercisesData(e, index)}
                                    >
                                        {defaultExercises && defaultExercises.map((defaultEx) => (
                                            <MenuItem key={defaultEx.id} value={defaultEx.id}>{defaultEx.name}</MenuItem>
                                        ))}
                                    </Select>

                                    <div>
                                        <div>
                                            <label htmlFor="duration"><InlineIcon icon={timerIcon} width="15px" height="15px"/> Durée (mn) </label>
                                            <InputStyled
                                                value={ex.duration}
                                                onChange={(e) => handleChangeExercisesData(e, index)}
                                                name="duration"
                                                type="number"
                                                min="5"
                                                max="180"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="number"><InlineIcon icon={sortNumericallyOutline} width="15px" height="15px"/> Nombre</label>
                                            <input
                                                value={ex.number}
                                                onChange={(e) => handleChangeExercisesData(e, index)}
                                                name="number"
                                                type="number"
                                                min="1"
                                                max="999"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="number"><InlineIcon icon={repeatLine} width="15px" height="15px"/> Serie </label>
                                            <input
                                                value={ex.series}
                                                onChange={(e) => handleChangeExercisesData(e, index)}
                                                name="series"
                                                type="number"
                                                min="1"
                                                max="100"
                                            />
                                        </div>
                                    </div>
                                </BlockExercise>
                            )
                        })}
                    </div>
                </form>
            </ContainerPage>
        </>
    )
}

const BlockExercise = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 0 auto .7rem;
    padding: .7rem;
    background-color: ${props => props.theme.colors.primary};
`

export default EditWorkout
