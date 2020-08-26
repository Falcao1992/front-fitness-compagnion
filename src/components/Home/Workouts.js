import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import bgWorkoutsPage from "../../assets/images/bgWorkoutsPage.jpg";
import moment from "moment";
import {Link} from "react-router-dom";
import 'moment/locale/fr';
import {InlineIcon, Icon} from '@iconify/react';
import timerIcon from '@iconify/icons-carbon/timer';
import repeatLine from '@iconify/icons-clarity/repeat-line';
import sortNumericallyOutline from '@iconify/icons-typcn/sort-numerically-outline';

import addAlt from '@iconify/icons-carbon/add-alt';
import {BlockTitle} from "../../styledComponents/UniformPageComponents";
import bxDownArrow from "@iconify/icons-bx/bx-down-arrow";
import bxUpArrow from "@iconify/icons-bx/bx-up-arrow";


const axios = require('axios');

const Workouts = ({history}) => {

    const [dataWorkoutsAssociatedUser, setDataWorkoutsAssociatedUser] = useState(null)
    const [showExercises, setShowExercises] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)

    moment.locale('fr');

    useEffect(() => {
        console.log("useffect workout")
        const GetAllData = async () => {
            try {
                const formatDataUser = await formatUserData()
                await fetchDataWorkoutsAssociatedUser(formatDataUser)
                    .then((dataWorkout) => {
                        setDataWorkoutsAssociatedUser(dataWorkout)
                    })
                setIsLoading(false)
                return 'data recup'
            } catch (error) {
                console.log(error)
            }
        }
        GetAllData()
    }, [])




    // Format user's data and return it
    const formatUserData = () => {
        try {
            return JSON.parse(localStorage.getItem('user'))
        } catch (error) {
            console.log(error, "error")
        }
    }

    // With userId Fetch workout's data and return it
    const fetchDataWorkoutsAssociatedUser = async (dataUsr) => {
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

    const displayExercises = (e, index) => {
        console.log("function display exercises")
        if (showExercises[index] === undefined || showExercises[index] === false) {
            setShowExercises({...showExercises, [index]: true})
        } else if (showExercises[index] === true) {
            setShowExercises({...showExercises, [index]: false})
        }
        console.log("finish display exercises")
    }

    if (isLoading || dataWorkoutsAssociatedUser === null) {
        return (
            <div>entrain de chargé</div>
        )
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
                    {dataWorkoutsAssociatedUser && dataWorkoutsAssociatedUser.map((workout, index) => {
                        const {id, name, date, hour, duration, DetailsExercises} = workout

                        return (
                            <ContainerWorkoutCard key={id}>
                                <WorkoutCardHeader showExercises={showExercises[index]} >
                                    <h4>{name} <span>({duration}mn)</span></h4>
                                    <p>{moment(date).format('dddd Do MMMM YYYY')} à {hour.substring(0, hour.length - 6)} h</p>
                                    <div>
                                        <Link to={{
                                            pathname: `/workout/${id}`, state: {
                                                workout
                                            }
                                        }}>
                                            <Icon icon={addAlt} width="25px" height="25px" />
                                        </Link>
                                        {showExercises[index]
                                            ?
                                            <button type="button" onClick={(e) => displayExercises(e, index)}><InlineIcon icon={bxUpArrow} width="15px" height="15px" /></button>
                                            :
                                            <button type="button" onClick={(e) => displayExercises(e, index)}><InlineIcon icon={bxDownArrow} width="15px" height="15px" /></button>}
                                    </div>

                                </WorkoutCardHeader>

                                <ContainerExercises showExercises={showExercises[index]} numberExercises={DetailsExercises.length}>
                                    {DetailsExercises.map((ex, index) => {
                                        return (
                                            <BlockExercise key={ex.id}>
                                                <div><p>Exercice {index + 1}</p><span>{ex.DefaultExercise.name}</span>
                                                </div>
                                                <div><p><InlineIcon icon={timerIcon} width="15px" height="15px"/> Durée
                                                </p><span>{ex.duration}</span></div>
                                                <div><p><InlineIcon icon={sortNumericallyOutline} width="15px"
                                                                    height="15px"/> Nombre </p><span>{ex.number}</span>
                                                </div>
                                                <div><p><InlineIcon icon={repeatLine} width="15px"
                                                                    height="15px"/> Serie(s)</p><span>{ex.series}</span>
                                                </div>
                                            </BlockExercise>
                                        )
                                    })}
                                </ContainerExercises>
                            </ContainerWorkoutCard>
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
    background-image: url(${props => props.bgPage});
    background-size: cover;
    background-position: left;
`

const ContainerWorkouts = styled.section`
    display: flex;
    width: 85%;
    margin: 0 auto;
    flex-direction: column;
`
const ContainerWorkoutCard = styled.article`
    display: flex;
    flex-direction: column;
    margin-bottom: .7rem;
    color: ${props => props.theme.colors.primary};
`

const WorkoutCardHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .7rem;
    background-color: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.third};
    p {
        color: ${props => props.theme.colors.primary}; 
        font-size: .7rem;
        padding: .35rem;
    }
    
    button, a {
        align-self: flex-start;
        vertical-align: middle;
        z-index: 2;
        padding: .7rem;
        
    }
    
    button:last-child {
        color: ${props => props.showExercises ? props.theme.colors.third : props.theme.colors.primary };
        transition: all .6s linear;
    }
`

const ContainerExercises = styled.div`
    overflow: hidden;
    max-height: ${props => !props.showExercises ? "0" : `${props.numberExercises * 200}px` };  
    transition: all 1s linear;
`

const BlockExercise = styled.div`
    display: flex;
    flex-direction: column;
    padding: .7rem;
    background-color: ${props => props.theme.colors.dark};;
    
    div {
        display: flex;
        justify-content: space-between;
        padding: .35rem 0;
    }
    
    div:first-child {
        margin-bottom: .7rem;
        border-bottom: 1px solid aliceblue;
    }
    
    span {
        color: ${props => props.theme.colors.third};
    }
`

export default Workouts

