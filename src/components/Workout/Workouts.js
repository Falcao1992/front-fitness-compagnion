import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SideBar from "../SideBar/SideBar";
import moment from "moment";
import {Link} from "react-router-dom";
import 'moment/locale/fr';
import {InlineIcon} from '@iconify/react';
import timerIcon from '@iconify/icons-carbon/timer';
import repeatLine from '@iconify/icons-clarity/repeat-line';
import sortNumericallyOutline from '@iconify/icons-typcn/sort-numerically-outline';
import noteEditLine from '@iconify/icons-clarity/note-edit-line';

import {BlockTitle, ContainerLoading, ContainerPage} from "../../styledComponents/UniformPageComponents";
import bxDownArrow from "@iconify/icons-bx/bx-down-arrow";
import bxUpArrow from "@iconify/icons-bx/bx-up-arrow";
import {handleErrMsg} from "../../functionUtils/FunctionUtils";
import {toast} from "react-toastify";
import {ButtonStyled} from "../../styledComponents/ButtonStyled";
import {BlockButtons} from "../../styledComponents/FormComponents";
import crossMark from '@iconify/icons-noto/cross-mark';
import CircularProgress from '@material-ui/core/CircularProgress';

const axios = require('axios');

const Workouts = ({history}) => {

    const [dataWorkoutsAssociatedUser, setDataWorkoutsAssociatedUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [showExercises, setShowExercises] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)

    moment.locale('fr');

    useEffect(() => {
        const GetAllData = async () => {
            try {
                const formatDataUser = await formatUserData()

                await fetchDataWorkoutsAssociatedUser(formatDataUser)
                    .then((dataWorkout) => {
                        setDataWorkoutsAssociatedUser(dataWorkout)
                    })
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        GetAllData()
    }, [])


    // Format user's data and return it
    const formatUserData = () => {
        try {
            const userDataFormat = JSON.parse(localStorage.getItem('user'))
            setUserId(userDataFormat.id)
            return userDataFormat
        } catch (error) {
            console.log(error, "error")
        }
    }

    // With userId Fetch workout's data and return it
    const fetchDataWorkoutsAssociatedUser = async (dataUsr) => {
        try {
            const resultDataWorkoutsByUser = await axios.get(`${process.env.REACT_APP_BASE_URL}/${dataUsr.id}/workouts`)
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

    // Toggle show exercise for display it or not
    const displayExercises = (e, index) => {
        if (showExercises[index] === undefined || showExercises[index] === false) {
            setShowExercises({...showExercises, [index]: true})
        } else if (showExercises[index] === true) {
            setShowExercises({...showExercises, [index]: false})
        }
    }

    const deleteWorkout = async (e, index, workoutId) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/workouts/${workoutId}`);
        let newArrayWorkouts = [...dataWorkoutsAssociatedUser]
        newArrayWorkouts.splice(index, 1)
        setDataWorkoutsAssociatedUser(newArrayWorkouts)
        toast.success('🦄 votre séance à été correctement supprimé!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        });
    }

    if (isLoading || dataWorkoutsAssociatedUser === null) {
        return (
            <ContainerLoading>
                <CircularProgress size="5rem" />
            </ContainerLoading>
        )
    }

    return (
        <>
            <SideBar history={history}/>
            <ContainerPage>
                {console.log('render WorkoutPage')}
                <BlockTitle>
                    <h1>Mes Scéances</h1>
                </BlockTitle>

                {handleErrMsg(errorMsg)}
                <BlockButtons>
                    <ButtonStyled colorBtnPrimary="rgba(11,11,11,0.85)"
                                  colorBtnSecondary="#C89446"><Link to={{
                        pathname: `/workout`,
                        state: {userId}
                    }}>
                        Creer une nouvelle séance
                    </Link></ButtonStyled>
                </BlockButtons>

                <ContainerWorkouts>
                    {dataWorkoutsAssociatedUser && dataWorkoutsAssociatedUser.map((workout, index) => {
                            const {id, name, date, hour, duration, DetailsExercises} = workout
                            return (
                                <ContainerWorkoutCard key={id}>
                                    <WorkoutCardHeader showExercises={showExercises[index]}>
                                        <h4>{name} <span>({duration}mn)</span></h4>
                                        <p>{moment(date).format('dddd Do MMMM YYYY')} à {hour.substring(0, hour.length - 6)} h</p>
                                        <div>
                                            <button type="button" onClick={(e) => deleteWorkout(e, index, id)}><InlineIcon icon={crossMark} width="1.4rem" height="1.4rem"/>
                                            </button>
                                            <Link to={{
                                                pathname: `/workout/${id}`,
                                                state: {userId: dataWorkoutsAssociatedUser[0].UserId}
                                            }}>

                                                <InlineIcon icon={noteEditLine} width="1.6rem" height="1.6rem"/>
                                            </Link>
                                            {showExercises[index]
                                                ?
                                                <button type="button" onClick={(e) => displayExercises(e, index)}>
                                                    <InlineIcon icon={bxUpArrow} width="1.6rem" height="1.6rem"/></button>
                                                :
                                                <button type="button" onClick={(e) => displayExercises(e, index)}>
                                                    <InlineIcon icon={bxDownArrow} width="1.6rem" height="1.6rem"/>
                                                </button>}
                                        </div>

                                    </WorkoutCardHeader>

                                    <ContainerExercises showExercises={showExercises[index]}
                                                        numberExercises={DetailsExercises.length}>
                                        {DetailsExercises.map((ex, index) => {
                                            return (
                                                <BlockExercise key={ex.id}>
                                                    <div><p>Exercice {index + 1}</p>
                                                        <span>{ex.DefaultExercise.name}</span>
                                                    </div>
                                                    <div><p><InlineIcon icon={timerIcon} width="15px"
                                                                        height="15px"/> Durée
                                                    </p><span>{ex.duration}</span></div>
                                                    <div><p><InlineIcon icon={sortNumericallyOutline} width="15px"
                                                                        height="15px"/> Nombre </p>
                                                        <span>{ex.number}</span>
                                                    </div>
                                                    <div><p><InlineIcon icon={repeatLine} width="15px"
                                                                        height="15px"/> Serie(s)</p>
                                                        <span>{ex.series}</span>
                                                    </div>
                                                </BlockExercise>
                                            )
                                        })}
                                    </ContainerExercises>
                                </ContainerWorkoutCard>
                            )
                        })}
                </ContainerWorkouts>
            </ContainerPage>
        </>
    )
}

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
        align-self: center;
        z-index: 2;
        padding: .7rem;
        margin: 0 .35rem;
        cursor: pointer;
        
    }
    
    button:last-child {
        color: ${props => props.showExercises ? props.theme.colors.third : props.theme.colors.primary};
        transition: all .6s linear;
    }
`

const ContainerExercises = styled.div`
    overflow: hidden;
    max-height: ${props => !props.showExercises ? "0" : `${props.numberExercises * 200}px`};  
    transition: all .9s linear;
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

