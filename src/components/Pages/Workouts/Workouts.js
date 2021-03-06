import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SideBar from "../../SideBar/SideBar";
import moment from "moment";
import {Link} from "react-router-dom";
import 'moment/locale/fr';
import {Icon, InlineIcon} from '@iconify/react';
import timerIcon from '@iconify/icons-carbon/timer';
import repeatLine from '@iconify/icons-clarity/repeat-line';
import sortNumericallyOutline from '@iconify/icons-typcn/sort-numerically-outline';
import noteEditLine from '@iconify/icons-clarity/note-edit-line';

import {
    BlockArrowUp,
    BlockImageHeader,
    BlockTitle,
    ContainerHeaderMain,
    ContainerLoading,
    ContainerPage, ContainerPrincipal
} from "../../../styledComponents/UniformPageComponents";
import bxDownArrow from "@iconify/icons-bx/bx-down-arrow";
import bxUpArrow from "@iconify/icons-bx/bx-up-arrow";
import {handleErrMsg} from "../../../functionUtils/FunctionUtils";
import {toast} from "react-toastify";
import {ButtonStyled} from "../../../styledComponents/ButtonStyled";
import {BlockButtons} from "../../../styledComponents/FormComponents";
import crossMark from '@iconify/icons-noto/cross-mark';
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from "../../Footer/Footer"
import bgWorkoutsPage from "../../../assets/images/bgWorkoutsPage.jpg"
import arrowUpCircle from '@iconify/icons-bi/arrow-up-circle';
import {pageTransition, pageVariants} from "../../../functionUtils/AnimationMotion"

const axios = require('axios');

const Workouts = ({history}) => {

    const [dataWorkoutsAssociatedUser, setDataWorkoutsAssociatedUser] = useState(null)
    const [showExercises, setShowExercises] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)
    const [closeAllCard, setCloseAllCard] = useState(false)

    moment.locale('fr');

    useEffect(() => {

        // With userId Fetch workout's data and return it
        const fetchDataWorkoutsAssociatedUser = async () => {
            try {
                const resultDataWorkoutsByUser = await axios.get(`${process.env.REACT_APP_BASE_URL}/workouts?Access_token=${localStorage.getItem("token")}`)
                return resultDataWorkoutsByUser.data
            } catch (error) {
                if (error.message === "Network Error") {
                    const errorNetwork = new Error('Serveur indisponible')
                    setErrorMsg(errorNetwork.message)
                } else if (error.response.status === 401) {
                    // Redirect if status (401) unauthorized ex. token expired
                    history.push("/login")
                    console.log("catch fetch dataWorkout")
                    localStorage.clear()
                } else {
                    console.error({msg: error})
                }
            }
        }

        const GetAllData = async () => {
            try {
                await fetchDataWorkoutsAssociatedUser()
                    .then((dataWorkout) => {
                        // Sort Workouts by order DSC
                        const filterDateWorkoutData = dataWorkout.sort((a, b) => new Date(b.date) - new Date(a.date))
                        setDataWorkoutsAssociatedUser(filterDateWorkoutData)
                    })
            } catch (error) {
                console.error(error)
                console.log("catch getall data")
                history.push("/login")
                localStorage.clear()
            }
        }

        GetAllData().then(() => {
            setIsLoading(false)
        })
    }, [history])

    // Check if cards must be closed
    useEffect(() => {
        if (closeAllCard === true) {
            handleCloseAllCard()
        }
    })

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
    // Close All Workouts's Card
    const handleCloseAllCard = () => {
        if (closeAllCard === false) {
        } else {
            let copyShowExercises = {}
            copyShowExercises = showExercises
            Object.entries(copyShowExercises).forEach(([key, value]) => {

                if (value === true) {
                    copyShowExercises[key] = false
                }
            })
            setShowExercises(copyShowExercises)
            setCloseAllCard(false)
        }
    }

    // Disabled Button CloseCard if no Card is open
    const handleDisabledBtnCloseCard = () => {
        let copyShowExercises = {}
        copyShowExercises = showExercises
        const disabledBtn = Object.entries(copyShowExercises).find(([key, value]) => value === true)
        return disabledBtn === undefined;
    }

    const redirectArrowUp = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    };

    if (isLoading || dataWorkoutsAssociatedUser === null) {
        return (
            <ContainerLoading>
                <CircularProgress size="5rem"/>
            </ContainerLoading>
        )
    }

    return (
        <>
            <SideBar history={history}/>
            <ContainerHeaderMain activeHeightAuto={true}
                                 initial="initial"
                                 animate="in"
                                 exit="out"
                                 variants={pageVariants}
                                 transition={pageTransition}
            >
                <ContainerPage>
                    <BlockImageHeader disabledMobile={true}>
                        <img src={bgWorkoutsPage} alt="Homme faisant du sport"/>
                    </BlockImageHeader>
                    <ContainerPrincipal bgParallaxe={true} bgPage={bgWorkoutsPage} styled={{height: "min-content"}}>
                        <BlockTitle>
                            <h1>Mes Scéances</h1>
                        </BlockTitle>
                        {handleErrMsg(errorMsg)}
                        <BlockButtons column={true}>
                            <ButtonStyled style={{marginLeft: 0}}>
                                <Link to={{pathname: `/workout`,}}>Creer une nouvelle séance</Link>
                            </ButtonStyled>
                            <ButtonStyled onClick={() => setCloseAllCard(true)}
                                          disabledBtn={handleDisabledBtnCloseCard()}
                                          disabled={handleDisabledBtnCloseCard()}
                                          style={{marginLeft: 0}}>
                                Replier les Séances
                            </ButtonStyled>
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
                                                <button type="button" onClick={(e) => deleteWorkout(e, index, id)}>
                                                    <InlineIcon
                                                        icon={crossMark} width="1.4rem" height="1.4rem"/>
                                                </button>
                                                <Link to={{
                                                    pathname: `/workout/${id}`,
                                                }}>

                                                    <InlineIcon icon={noteEditLine} width="1.6rem" height="1.6rem"/>
                                                </Link>
                                                {showExercises[index]
                                                    ?
                                                    <button type="button" onClick={(e) => displayExercises(e, index)}>
                                                        <InlineIcon icon={bxUpArrow} width="1.6rem" height="1.6rem"/>
                                                    </button>
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
                    </ContainerPrincipal>
                </ContainerPage>
            </ContainerHeaderMain>
            <BlockArrowUp onClick={redirectArrowUp}>
                <Icon icon={arrowUpCircle} width="50px" height="50px"/>
            </BlockArrowUp>
            <Footer/>
        </>
    )
}

const ContainerWorkouts = styled.div`
    display: flex;
    width: 100%;
    margin: 1.4rem auto;
    flex-direction: column;
    
    @media only screen and (min-width: 750px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;     
    }
`

const ContainerWorkoutCard = styled.article`
    display: flex;
    flex-direction: column;
    margin-bottom: .7rem;
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.secondaryTransparent};
    height: max-content;
    border-radius: 10px;
    
    @media only screen and (min-width: 750px) {
        width: 48%;
    }
    @media only screen and (min-width: 1200px) {
        width: 32%;
    }
`

const WorkoutCardHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .7rem;   
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
    overflow: ${props => props.numberExercises <= 1 ? "hidden" : "scroll"};;
    overflow-x: hidden;
    max-height: ${props => !props.showExercises ? "0" : `170px`};  
    transition: all .6s linear;
    position: relative;
    
    @media only screen and (min-width: 750px) {
        ::-webkit-scrollbar {
            width: .7rem;
        }
        ::-webkit-scrollbar-track {
            background: ${props => props.theme.colors.lightDark};
        }      
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(to top, #031183, #1546a7, #0ba2d0);       
        }        
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: ${props => props.theme.colors.third};
            transition: all .5s linear;
        }
    }
}
`

const BlockExercise = styled.div`
    display: flex;
    flex-direction: column;
    padding: .7rem;
    background-color: ${props => props.theme.colors.secondaryTransparent};
    
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

