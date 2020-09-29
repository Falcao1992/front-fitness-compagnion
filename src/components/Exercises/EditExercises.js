import React, {useState} from "react";
import {Icon, InlineIcon} from "@iconify/react";
import bxUpArrow from "@iconify/icons-bx/bx-up-arrow";
import bxDownArrow from "@iconify/icons-bx/bx-down-arrow";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import timerIcon from "@iconify/icons-carbon/timer";
import sortNumericallyOutline from "@iconify/icons-typcn/sort-numerically-outline";
import repeatLine from "@iconify/icons-clarity/repeat-line";
import styled from "styled-components";
import addAlt from "@iconify/icons-carbon/add-alt";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    BlockTitle,
    ContainerPrincipal,
    ErrorMsgStyled
} from "../../styledComponents/UniformPageComponents"
import {FormStyled} from "../../styledComponents/FormComponents"
import bgEditExercises from "../../assets/images/bgEditExercises.jpg"

const axios = require('axios');
toast.configure();

const EditExercises = ({exercisesUpdate, setExercisesUpdate, workoutUpdate, setWorkoutUpdate, workoutId, defaultExercises}) => {

    const [showExercises, setShowExercises] = useState({})
    const [addedExercise, setAddedExercise] = useState(false)
    const [missingField, setMissingField] = useState(false)


    const handleChangeExercisesData = (e, index) => {
        let copyExercisesUpdate = [...exercisesUpdate]

        if (e.target.value === "") {
            copyExercisesUpdate[index] = {...copyExercisesUpdate[index], [e.target.name]: e.target.value}
        } else {
            copyExercisesUpdate[index] = {...copyExercisesUpdate[index], [e.target.name]: parseInt(e.target.value)}
        }

        // Check if data is not equal to empty string
        for (const property in copyExercisesUpdate[index]) {
            if (copyExercisesUpdate[index][property] === "") {
                console.log("error chaine vide")
                setMissingField(true)
                break
            } else {
                setMissingField(false)
            }
        }
        setExercisesUpdate(copyExercisesUpdate)
    }

    const displayExercises = (e, index) => {
        if (showExercises[index] === undefined || showExercises[index] === false) {
            setShowExercises({...showExercises, [index]: true})
        } else if (showExercises[index] === true) {
            setShowExercises({...showExercises, [index]: false})
        }
    }

    const addExercise = () => {
        let copyExerciceUpdate = []
        let newExercise = {
            "DefaultExerciseId": 1,
            "WorkoutId": parseInt(workoutId),
            "duration": 0,
            "number": 10,
            "series": 10
        }
        if (exercisesUpdate) {
            copyExerciceUpdate = exercisesUpdate
        }
        copyExerciceUpdate.push(newExercise)
        setExercisesUpdate(copyExerciceUpdate)
        setAddedExercise(true)
    }

    const sendExercise = async (e, exeDuration, index) => {

        let durationUpdated = workoutUpdate.duration
        setWorkoutUpdate({...workoutUpdate, "duration": durationUpdated + exeDuration})
        await axios.post(`${process.env.REACT_APP_BASE_URL}/detailsExercise`, exercisesUpdate[index]);
        exercisesUpdate[index].added = true
        setAddedExercise(false)
        setShowExercises({...showExercises, [index]: false})
        console.log("poster")
        toast.success('Exercice ajouté !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        });
    }

    const deleteExercise = async (e, exerciseDuration, exerciseId, index) => {
        let durationUpdated = workoutUpdate.duration
        setWorkoutUpdate({...workoutUpdate, "duration": durationUpdated - exerciseDuration})
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/detailsExercise/${exerciseId}`);
        let newArrayExercises = [...exercisesUpdate]
        newArrayExercises.splice(index, 1)
        setExercisesUpdate(newArrayExercises)
        toast.success('🦄 votre exercice à été correctement supprimé!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        });
    }


    return (
        <>
            <ContainerPrincipal bgParallaxe={true} bgPage={bgEditExercises} styled={{height: "min-content"}}>
                <BlockTitle style={{display: "flex"}}>
                    <h2>Mes Exercises</h2>
                    {!addedExercise &&
                    <ButtonAddExercises type="button" onClick={addExercise}><Icon icon={addAlt} width="30px"
                                                                                  height="30px"/>
                    </ButtonAddExercises>}
                </BlockTitle>
                <FormStyled disabledBg={true}>
                    {exercisesUpdate && exercisesUpdate.map((exercise, index) => {
                        return (
                            <BlockExercise key={index}>
                                <BlockExerciseTitle newExercise={!exercise.id}>
                                    <p>Exercice {index + 1}</p>
                                    <BlockArrowBtn>
                                        {showExercises[index]
                                            ?
                                            <button type="button" onClick={(e) => displayExercises(e, index)}>
                                                <InlineIcon icon={bxUpArrow} width="15px" height="15px"/></button>
                                            :
                                            <button type="button" onClick={(e) => displayExercises(e, index)}>
                                                <InlineIcon icon={bxDownArrow} width="15px" height="15px"/>
                                            </button>}
                                    </BlockArrowBtn>
                                </BlockExerciseTitle>
                                <BlockExerciseContent showExercises={showExercises[index]}>
                                    <div>
                                        <InputLabel id={`NameExercise${exercise.index}`}>Nom</InputLabel>
                                        <Select
                                            labelId={`NameExercise${exercise.index}`}
                                            name="DefaultExerciseId"
                                            disabled={!!exercise.id}
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
                                            value={exercise.duration}
                                            onChange={(e) => handleChangeExercisesData(e, index)}
                                            id="duration"
                                            name="duration"
                                            type="number"
                                            min="5"
                                            max="180"
                                            disabled={!!exercise.id}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="number"><InlineIcon icon={sortNumericallyOutline}
                                                                            width="15px"
                                                                            height="15px"/> Nombre</label>
                                        <input
                                            value={exercise.number}
                                            onChange={(e) => handleChangeExercisesData(e, index)}
                                            id="number"
                                            name="number"
                                            type="number"
                                            min="1"
                                            max="999"
                                            disabled={!!exercise.id}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="series"><InlineIcon icon={repeatLine} width="15px"
                                                                            height="15px"/> Serie(s) </label>
                                        <input
                                            value={exercise.series}
                                            onChange={(e) => handleChangeExercisesData(e, index)}
                                            id="series"
                                            name="series"
                                            type="number"
                                            min="1"
                                            max="100"
                                            disabled={!!exercise.id}
                                        />
                                    </div>
                                    {missingField && <div>
                                        <ErrorMsgStyled> Champ(s) non renseigné !</ErrorMsgStyled>
                                    </div>}

                                    <BlockExerciseBtnAddDelete>
                                        {!exercise.id && !exercise.added ?
                                            <button type="button" disabled={missingField === true}
                                                    onClick={(e) => sendExercise(e, exercise.duration, index)}>
                                                Ajouter cet exercise
                                            </button>
                                            : !exercise.added
                                            && <button type="button"
                                                       onClick={(e) => deleteExercise(e, exercise.duration, exercise.id, index)}>
                                                Supprimer cet exercise
                                            </button>}
                                    </BlockExerciseBtnAddDelete>
                                </BlockExerciseContent>
                            </BlockExercise>
                        )
                    })}
                </FormStyled>
            </ContainerPrincipal>
        </>
    )
}

const ButtonAddExercises = styled.button`
    margin-left: 1.4rem;
    svg {
        color: ${props => props.theme.colors.primary};
    }
`

const BlockExercise = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: .7rem;
    background-color: ${props => props.theme.colors.secondary};
    @media only screen and (min-width: 750px ) {
        width: 32% ;
        height:  max-content;
        margin-bottom: 1.4rem;
        
    }
    @media only screen and (min-width: 1200px ) {
        width: 24% ;
    }
`

const BlockExerciseTitle = styled.div`
    border-bottom: .5px solid ${props => props.theme.colors.primary};
    padding: .7rem;
    display: flex;
    justify-content: space-between;
    
    button {
        color: ${props => props.newExercise ? props.theme.colors.validated : props.theme.colors.third};
    }
    p {
        color: ${props => props.theme.colors.third};
        font-weight: ${props => props.newExercise && "700"};
        color: ${props => props.newExercise && props.theme.colors.validated};
    }
`

const BlockArrowBtn = styled.div`
    button {
        padding: 0 1rem;
        cursor: pointer;
    }
`

const BlockExerciseContent = styled.div`
    padding: 0 .7rem ;
    overflow: hidden;
    max-height: ${props => !props.showExercises ? "0" : `320px`};  
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

const BlockExerciseBtnAddDelete = styled.div`
    padding: 1rem 0 !important;

    button {
        margin-left: auto;
        padding: .7rem;
        color: ${props => props.theme.colors.third};
        background-color: ${props => props.theme.colors.dark};
        border: 1px solid ${props => props.theme.colors.third};
        cursor: pointer;  
    }
    button:disabled, button[disabled] {
        opacity: .4;
    }
`

export default EditExercises
