import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import bgWorkoutsPage from "../../assets/images/bgWorkoutsPage.jpg";
import moment from "moment";
import 'moment/locale/fr';
import {InlineIcon} from '@iconify/react';
import noteEditLine from '@iconify/icons-clarity/note-edit-line';

const axios = require('axios');

const Workouts = ({history}) => {

    const [dataWorkouts, setdataWorkouts] = useState(null)
    const [dataExercises, setDataExercises] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)

    moment.locale('fr');

    useEffect(() => {
        GetAllData()
    }, [])


    const GetAllData = async () => {
        const formatDataUser = await formatUserData()
        const dataWorkout = await fetchDataWorkout(formatDataUser)
            .then((dataWorkout) => {
                setdataWorkouts(dataWorkout)
                return dataWorkout
            })
        await fetchExercisesByWorkoutId(dataWorkout)
            .then((allExercises) => {
                setDataExercises(allExercises)
                setIsLoading(false)
            })
        return 'data recup'
    }

    // Format user's data and return it
    const formatUserData = () => {
        try {
            return JSON.parse(localStorage.getItem('user'))
        } catch (error) {
            console.log(error, "error")
        }
    }

    // With userId Fetch workout's data and return it
    const fetchDataWorkout = async (dataUsr) => {
        try {
            const resultDataWorkoutsByUser = await axios.get(`http://localhost:8000/api/v1/${dataUsr.id}/workouts`)
            return resultDataWorkoutsByUser.data
        } catch (error) {
            if (error.message === "Network Error") {
                const errorNetwork = new Error('Serveur indisponible')
                setErrorMsg(errorNetwork.message)
                console.log(errorNetwork.message)
            } else {
                console.log("error unkown")
            }
        }
    }

    // Fetch Exercises by WorkoutId
    const fetchExercisesByWorkoutId = async (allWorkouts) => {
        let allExercises = []
        for (let workout of allWorkouts) {
            const resultExercises = await axios.get(`http://localhost:8000/api/v1/${workout.id}/exercises`)
            allExercises.push(...resultExercises.data)
        }
        return allExercises
    }

    if (isLoading || dataWorkouts === null || dataExercises === null) {
        return (
            <div>entrain de chargé</div>
        )
    }

    const GetExercisesByWorkoutId = (id) => {
        let goodExercisesExtract = []
        dataExercises.filter(data => data.workoutId === id).map((datafilter => {
            //console.log("datafilter", datafilter)
            return (
                goodExercisesExtract.push(<BlockWorkoutExercise>{datafilter.duration}</BlockWorkoutExercise>)
            )
        }))
        return goodExercisesExtract
    }

    return (
        <>
            <SideBar history={history}/>
            <ContainerMyProfilePage bgPage={bgWorkoutsPage}>
                {console.log('render WorkoutPage')}
                <BlockTitle>
                    <h1>Mes Scéances</h1>
                </BlockTitle>
                <ContainerWorkouts>
                    {dataWorkouts && dataWorkouts.map((workout) => {
                        const {id, name, date, hour, duration} = workout

                        return (
                            <BlockWorkout key={id}>
                                <WorkoutName>{name} -<WorkoutDate>{moment(date).format('YYYY-MM-DD')}</WorkoutDate>-</WorkoutName>
                                <WorkoutHour>{hour.substring(0, hour.length - 3)}</WorkoutHour>
                                <WorkoutDuration>{duration} mn</WorkoutDuration>
                                {/*<button type="button" onClick={(e) => getExerciseByWorkoutId(e,id)}>Mes Exercices</button>*/}
                                <WorkoutEditBtn type="button" onClick={() => console.log("edit button")}><InlineIcon
                                    icon={noteEditLine} width="20px" height="20px"/></WorkoutEditBtn>

                                {GetExercisesByWorkoutId(id)}


                            </BlockWorkout>
                        )
                    })}
                </ContainerWorkouts>
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
const ContainerWorkouts = styled.section`
    display: flex;
    width: 85%;
    margin: 0 auto;
    flex-direction: column;
`
const BlockWorkout = styled.article`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    margin-bottom: .7rem;
    text-align: center;
    padding: .7rem 0 0;
   
`

const WorkoutName = styled.h3`
    grid-column: 1 / 5;
    text-align: center;
    padding-bottom: .7rem;
    border-bottom: 1px solid ${props => props.theme.colors.primary};
`
const WorkoutDate = styled.span`
    font-size: .7rem;
    padding: .7rem 0;
`
const WorkoutHour = styled.p`
    padding: .7rem 0;
`
const WorkoutDuration = styled.span`
    padding: .7rem 0;
    border-left: 1px solid ${props => props.theme.colors.primary};
    border-right: 1px solid ${props => props.theme.colors.primary};
`
const WorkoutEditBtn = styled.button`
    padding: .7rem;
    color: lightcoral;
`

const BlockWorkoutExercise = styled.div`
    grid-column: 1 / 5;
`


export default Workouts

