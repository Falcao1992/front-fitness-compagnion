import React, {useEffect, useState} from "react";
//import {useParams} from "react-router-dom"
import SideBar from "./SideBar";
import {
    BlockButtons,
    BlockInputLabelStyled, ContainerMultiNumberField,
    FormStyled, InputStyled, KeyboardDatePickerStyled, LabelInputStyled,
    TextFieldStyled
} from "../../styledComponents/FormComponents";

import {InputLabel, Select, MenuItem} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import bgEditWorkoutPage from "../../assets/images/bgEditWorkoutPage.jpg"
import {BlockTitle, ContainerPage} from "../../styledComponents/UniformPageComponents";
import moment from "moment";
import {ButtonStyled} from "../../styledComponents/ButtonStyled";
import {InlineIcon} from "@iconify/react";
import timerIcon from "@iconify/icons-carbon/timer";
import sortNumericallyOutline from "@iconify/icons-typcn/sort-numerically-outline";
import repeatLine from "@iconify/icons-clarity/repeat-line";
import styled from "styled-components";
import bxDownArrow from '@iconify/icons-bx/bx-down-arrow';
import bxUpArrow from '@iconify/icons-bx/bx-up-arrow';


const axios = require('axios');

const EditWorkout = ({location, history}) => {

    const {workout} = location.state;
    const [workoutUpdate, setWorkoutUpdate] = useState(workout)
    const [exercisesUpdate, setExercisesUpdate] = useState(workout.DetailsExercises)
    const [showExercises, setShowExercises] = useState({})
    const [defaultExercises, setDefaultExercises] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    //let {workoutId} = useParams()

    useEffect(() => {
        fetchDefaultExercises()
            .then((defaultEx) => {
                setDefaultExercises(defaultEx)
                setIsLoading(false)
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

    const handleChangeWorkoutData = (e,date) => {
        console.log("e.target.id", date)
        if(e.target === undefined) {
            let dateFormat = moment(date, "DD mm YYYY").format('YYYY-MM-DD')
            setWorkoutUpdate({...workoutUpdate, "date": dateFormat})
        } else {
            setWorkoutUpdate({...workoutUpdate, [e.target.id]: e.target.value})
        }
    };

    const handleChangeExercisesData = (e, index) => {
        let copyExercisesUpdate = [...exercisesUpdate]
        copyExercisesUpdate[index] = {...copyExercisesUpdate[index], [e.target.name]: parseInt(e.target.value)}
        setExercisesUpdate(copyExercisesUpdate)
    }

    const onSubmit = () => {
        if (workoutUpdate) {
            axios.put(`http://localhost:8000/api/v1/${workoutUpdate.UserId}/workout/${workoutUpdate.id}`, workoutUpdate);
            history.push(`/workouts`)
            console.log('data modifié')
        } else {
            console.log("pas de ta modifier")
        }
    }

    const displayExercises = (e, index) => {
        console.log("functn display exercises")
        if (showExercises[index] === undefined || showExercises[index] === false) {
            setShowExercises({...showExercises, [index]: true})
        } else if (showExercises[index] === true) {
            setShowExercises({...showExercises, [index]: false})
        }
    }
    if (isLoading || defaultExercises === null) {
        return (
            <div>entrain de chargé</div>
        )
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
                    <TextFieldStyled id="name"
                                     label="Nom de la séance *"
                                     variant="filled"
                                     type="text"
                                     value={name}
                                     onChange={handleChangeWorkoutData}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePickerStyled
                            disableToolbar
                            variant="inline"
                            format="d MMM yyyy"
                            margin="normal"
                            id="date"
                            label="Date"
                            value={date}
                            onChange={handleChangeWorkoutData}
                        />
                    </MuiPickersUtilsProvider>
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
                <FormStyled>
                    <ContainerExercises>
                        {exercisesUpdate.map((ex, index) => {
                            return (
                                <BlockExercise key={ex.id}>
                                    <BlockExerciseTitle>
                                        <p>Exercice {index + 1}</p>
                                        <div>
                                            {showExercises[index]
                                                ?
                                                <button type="button" onClick={(e) => displayExercises(e, index)}>
                                                    <InlineIcon icon={bxUpArrow} width="15px" height="15px"/></button>
                                                :
                                                <button type="button" onClick={(e) => displayExercises(e, index)}>
                                                    <InlineIcon icon={bxDownArrow} width="15px" height="15px"/>
                                                </button>}
                                        </div>
                                    </BlockExerciseTitle>
                                    <BlockExerciseContent showExercises={showExercises[index]}>
                                        <div>
                                            <InputLabel id={`NameExercise${ex.id}`}>Nom</InputLabel>
                                            <Select
                                                labelId={`NameExercise${ex.id}`}
                                                name="DefaultExerciseId"
                                                value={exercisesUpdate[index].DefaultExerciseId}
                                                onChange={(e) => handleChangeExercisesData(e, index)}
                                            >
                                                {defaultExercises.map((defaultEx) => (
                                                    <MenuItem key={defaultEx.id}
                                                              value={defaultEx.id}>{defaultEx.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </div>

                                        <div>
                                            <label htmlFor="duration">
                                                <InlineIcon icon={timerIcon} width="15px" height="15px"/> Durée (mn)
                                            </label>
                                            <input
                                                value={ex.duration}
                                                onChange={(e) => handleChangeExercisesData(e, index)}
                                                id="duration"
                                                name="duration"
                                                type="number"
                                                min="5"
                                                max="180"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="number"><InlineIcon icon={sortNumericallyOutline}
                                                                                width="15px"
                                                                                height="15px"/> Nombre</label>
                                            <input
                                                value={ex.number}
                                                onChange={(e) => handleChangeExercisesData(e, index)}
                                                id="number"
                                                name="number"
                                                type="number"
                                                min="1"
                                                max="999"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="series"><InlineIcon icon={repeatLine} width="15px"
                                                                                height="15px"/> Serie </label>
                                            <input
                                                value={ex.series}
                                                onChange={(e) => handleChangeExercisesData(e, index)}
                                                id="series"
                                                name="series"
                                                type="number"
                                                min="1"
                                                max="100"
                                            />
                                        </div>

                                    </BlockExerciseContent>


                                </BlockExercise>
                            )
                        })}
                    </ContainerExercises>
                </FormStyled>
            </ContainerPage>
        </>
    )
}

const ContainerExercises = styled.div`
    color: ${props => props.theme.colors.primary};
`

const BlockExercise = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: .7rem;
    background-color: ${props => props.theme.colors.dark};
    
`

const BlockExerciseTitle = styled.div`
    border-bottom: .5px solid ${props => props.theme.colors.primary};
    padding: .7rem;
    display: flex;
    justify-content: space-between;
    
    button {
        color: ${props => props.theme.colors.third};
    }
    p {
        color: ${props => props.theme.colors.third};
    }
`

const BlockExerciseContent = styled.div`
    padding: 0 .7rem ;
    overflow: hidden;
    max-height: ${props => !props.showExercises ? "0" : `200px`};  
    transition: all 1s linear;
    
    > div:first-child {
        margin-top: .7rem;
    }
    
    > div {
        display: flex;
        justify-content: space-between;
        padding: .35rem 0;
    }
    
    label {
        color: ${props => props.theme.colors.primary};
        align-self: center;
    }
    
    input {
        color: ${props => props.theme.colors.third};
        padding: .35rem;
        text-align: center;
    }
    
    .MuiInputBase-root {
        color: ${props => props.theme.colors.third};
        background-color: ${props => props.theme.colors.primary};
        padding: 0 .35rem;
    }
`

export default EditWorkout
