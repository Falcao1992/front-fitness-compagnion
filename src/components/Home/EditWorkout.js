import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import EditExercises from "./EditExercises";
import SideBar from "./SideBar";
import DateFnsUtils from '@date-io/date-fns';
import styled from "styled-components";
import {
    BlockInputLabelStyled, ContainerMultiNumberField,
    FormStyled, InputStyled, KeyboardDatePickerStyled, LabelInputStyled,
    TextFieldStyled
} from "../../styledComponents/FormComponents";
import {BlockTitle, ContainerPage} from "../../styledComponents/UniformPageComponents";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import bgEditWorkoutPage from "../../assets/images/bgEditWorkoutPage.jpg"
import moment from "moment";

const axios = require('axios');

const EditWorkout = ({location, history}) => {


    const [workoutUpdate, setWorkoutUpdate] = useState(null)
    const [exercisesUpdate, setExercisesUpdate] = useState(null)
    const [defaultExercises, setDefaultExercises] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const {userId} = location.state;
    let {workoutId} = useParams()

    useEffect(() => {
        // Fetch One Workout with userId and workoutId
        const fetchDataWorkout = async () => {
            try {
                const resultDataWorkoutsByUser = await axios.get(`http://localhost:8000/api/v1/${userId}/workouts/${workoutId}`)
                return resultDataWorkoutsByUser.data
            } catch (error) {
                console.log("error unkown")
            }
        }
        fetchDataWorkout()
            .then((dataWorkout) => {
                setWorkoutUpdate(dataWorkout)
                setExercisesUpdate(dataWorkout.DetailsExercises)
        })

        fetchDefaultExercises()
            .then((defaultEx) => {
                console.log('dans le then EditWorkout')
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

    const handleChangeWorkoutData = (e, date) => {
        if (e.target === undefined) {
            let dateFormat = moment(date, "DD mm YYYY").format('YYYY-MM-DD')
            setWorkoutUpdate({...workoutUpdate, "date": dateFormat})
        } else {
            setWorkoutUpdate({...workoutUpdate, [e.target.id]: e.target.value})
        }
    }

    const onSubmit = async () => {
        if (workoutUpdate) {
            await axios.put(`http://localhost:8000/api/v1/${workoutUpdate.UserId}/workout/${workoutUpdate.id}`, workoutUpdate);
            history.push(`/workouts`)
            console.log('workout modifié et redirect workout page')
        } else {
            console.log("pas de ta modifier")
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
            {console.log('render editworkout')}
            <SideBar history={history} sidebar={true}/>
            <ContainerPage bgPage={bgEditWorkoutPage}>
                <BlockTitle>
                    <h1>Ma séance</h1>
                </BlockTitle>
                <BlockTitleEditSeance>
                    <h2>Modifier la séance</h2>
                </BlockTitleEditSeance>
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

                    <BlockButtonsEditWorkout>
                        <button
                            type="button"
                            onClick={() => onSubmit()}
                        >
                            Modifier ma séance
                        </button>

                    </BlockButtonsEditWorkout>
                </FormStyled>
                <FormStyled>
                    <ContainerExercises>
                        <EditExercises exercisesUpdate={exercisesUpdate} setExercisesUpdate={setExercisesUpdate}
                                       defaultExercises={defaultExercises}
                                       workoutId={workoutId}/>
                    </ContainerExercises>
                </FormStyled>
            </ContainerPage>
        </>
    )
}

const BlockTitleEditSeance = styled.div`
    width: 85%;
    margin: 1rem auto;
    font-size: 1rem;
    padding: .7rem;
    border-bottom: 1px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
`

const BlockButtonsEditWorkout = styled.div`
    text-align: right;
    button {
        padding: .7rem;
        color: ${props => props.theme.colors.third};
        background-color: ${props => props.theme.colors.dark};
        border: 1px solid ${props => props.theme.colors.third};      
    }
`

const ContainerExercises = styled.div`
    color: ${props => props.theme.colors.primary};
    
`

export default EditWorkout
