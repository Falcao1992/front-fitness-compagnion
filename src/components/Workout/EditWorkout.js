import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import EditExercises from "../Exercises/EditExercises";
import SideBar from "../SideBar/SideBar";
import DateFnsUtils from '@date-io/date-fns';
import styled from "styled-components";
import {
    BlockButtons,
    BlockInputLabelStyled, ContainerMultiNumberField,
    FormStyled, InputStyled, KeyboardDatePickerStyled, LabelInputStyled,
    TextFieldStyled
} from "../../styledComponents/FormComponents";
import {BlockTitle, ContainerLoading, ContainerPage} from "../../styledComponents/UniformPageComponents";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import moment from "moment";
import 'moment/locale/fr'
import frLocale from "date-fns/locale/fr";
import {ButtonStyled} from "../../styledComponents/ButtonStyled";
import CircularProgress from "@material-ui/core/CircularProgress";

const axios = require('axios');



const EditWorkout = ({location, history}) => {

    const [workoutUpdate, setWorkoutUpdate] = useState(null)
    const [exercisesUpdate, setExercisesUpdate] = useState(null)
    const [defaultExercises, setDefaultExercises] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const {userId} = location.state;
    let {workoutId} = useParams()

    moment.locale("fr")

    useEffect(() => {
        // Fetch One Workout with userId and workoutId
        const fetchDataWorkout = async () => {
            try {
                if (workoutId) {
                    const resultDataWorkoutsByUser = await axios.get(`${process.env.REACT_APP_BASE_URL}/${userId}/workouts/${workoutId}`)
                    return resultDataWorkoutsByUser.data
                } else {
                    return {
                        "name": "Nouvelle séance",
                        "duration": 0,
                        "date": "2020-01-01",
                        "hour": "12:00",
                        "UserId": userId
                    }
                }
            } catch (error) {
                console.log("error unkown")
            }
        }

        fetchDataWorkout()
            .then((dataWorkout) => {
                setWorkoutUpdate(dataWorkout)
                setExercisesUpdate(dataWorkout.DetailsExercises)
                return dataWorkout
            })
            .then((dataWorkout) => {
                if(dataWorkout.DetailsExercises !== undefined){
                    let getDuration = 0
                    dataWorkout.DetailsExercises.forEach((exercise) => {
                        getDuration += exercise.duration
                    })
                    dataWorkout.duration = getDuration
                }
            })

        fetchDefaultExercises()
            .then((defaultEx) => {
                setDefaultExercises(defaultEx)
                setIsLoading(false)
            })

    }, [userId,workoutId])


    const fetchDefaultExercises = async () => {
        try {
            const resultDefaultExercises = await axios.get(`${process.env.REACT_APP_BASE_URL}/defaultExercises`)
            return resultDefaultExercises.data
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeWorkoutData = (e, date) => {
        if (e.target === undefined) {
            let dateFormat = moment(date, "DD MMM YYYY").format("YYYY-MM-DD")
            setWorkoutUpdate({...workoutUpdate, "date": dateFormat})
        } else {
            setWorkoutUpdate({...workoutUpdate, [e.target.id]: e.target.value})
        }
    }

    const editWorkout = async (e, id) => {
        if (workoutUpdate && id !== undefined) {
            await axios.put(`http://localhost:8000/api/v1/${workoutUpdate.UserId}/workout/${workoutUpdate.id}`, workoutUpdate);
            history.push(`/workouts`)
        } else if(id === undefined) {
            await axios.post("http://localhost:8000/api/v1/workout/create", workoutUpdate);
            history.push(`/workouts`)
        } else {
             console.error("error unkown")
        }
    }

    if (isLoading || defaultExercises === null) {
        return (
            <ContainerLoading>
                <CircularProgress size="5rem" />
            </ContainerLoading>
        )
    }

    const {name, duration, date, hour, id} = workoutUpdate

    return (
        <>
            {console.log('render editworkout')}
            <SideBar history={history} sidebar={true}/>
            <ContainerPage >
                <BlockTitle>
                    <h1>Ma séance</h1>
                </BlockTitle>
                <BlockTitleEditSeance>
                    {id !==undefined ? <h2>Modifier la séance</h2> : <h2>Creer une séance</h2> }
                </BlockTitleEditSeance>
                <FormStyled>
                    <TextFieldStyled id="name"
                                     label="Nom de la séance *"
                                     variant="filled"
                                     type="text"
                                     value={name}
                                     onChange={handleChangeWorkoutData}
                    />

                    <MuiPickersUtilsProvider locale={frLocale} utils={DateFnsUtils}>
                        <KeyboardDatePickerStyled
                            disableToolbar
                            variant="inline"
                            format="dd MMM yyyy"
                            margin="normal"
                            id="date"
                            label="Date"
                            value={date}
                            onChange={handleChangeWorkoutData}
                        />
                    </MuiPickersUtilsProvider>
                    <ContainerMultiNumberField>
                        <BlockInputLabelStyled>
                            <LabelInputStyled disabled htmlFor="duration">Durée (mn): </LabelInputStyled>
                            <InputStyled
                                value={duration}
                                onChange={handleChangeWorkoutData}
                                id="duration"
                                type="number"
                                disabled
                            />
                            <small>La durée sera calculé en fonction de celle des exercises</small>
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
                            onClick={(e) => editWorkout(e,id)}
                            colorBtnPrimary="rgba(11,11,11,0.85)"
                            colorBtnSecondary="#C89446"
                        >
                            {id !== undefined ? "Modifier ma séance" : "Creer ma séance" }
                        </ButtonStyled>

                    </BlockButtons>
                </FormStyled>
                <FormStyled>
                    {id !== undefined && <ContainerExercises>
                        <EditExercises exercisesUpdate={exercisesUpdate} setExercisesUpdate={setExercisesUpdate} workoutUpdate={workoutUpdate} setWorkoutUpdate={setWorkoutUpdate}
                                       defaultExercises={defaultExercises}
                                       workoutId={workoutId}/>
                    </ContainerExercises>}
                </FormStyled>
            </ContainerPage>
        </>
    )
}

const BlockTitleEditSeance = styled.div`
    width: 85%;
    margin: 1rem auto;
    padding: .7rem;
    border: 1px solid ${props => props.theme.colors.dark};
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.dark};
`

const ContainerExercises = styled.div`
    color: ${props => props.theme.colors.primary};   
`

export default EditWorkout