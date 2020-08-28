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

const axios = require('axios');
toast.configure();

const EditExercises = ({exercisesUpdate, setExercisesUpdate, workoutId, defaultExercises }) => {

    const [showExercises, setShowExercises] = useState({})
    const [addedExercise, setAddedExercise] = useState(false)


    const handleChangeExercisesData = (e, index) => {
        console.log(e.target.value)
        if(e.target.value === "") {
            console.log('pas de valeur')
            return
        }
        let copyExercisesUpdate = [...exercisesUpdate]
        copyExercisesUpdate[index] = {...copyExercisesUpdate[index], [e.target.name]: parseInt(e.target.value)}
        setExercisesUpdate(copyExercisesUpdate)
    }

    const displayExercises = (e, index) => {
        console.log("functn display exercises")
        if (showExercises[index] === undefined || showExercises[index] === false) {
            setShowExercises({...showExercises, [index]: true})
        } else if (showExercises[index] === true) {
            setShowExercises({...showExercises, [index]: false})
        }
    }

    const addExercise = () => {
        let copyExerciceUpdate = []
        let newExercise = {
            "DefaultExerciseId" : 1,
            "WorkoutId" : parseInt(workoutId),
            "duration" : 10,
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

    const sendExercise = async (e,index) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/detailsExercise`, exercisesUpdate[index]);
        setAddedExercise(false)
        setShowExercises({...showExercises, [index]: false})
        console.log("poster")
        toast.success('🦄 votre exercice à été correctement ajouté!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        });
    }

    const deleteExercise = async (e,exerciseId,index) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/detailsExercise/${exerciseId}`);
        let newArrayExercises = [...exercisesUpdate]
        newArrayExercises.splice(index,1)
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

    /*if (addedExercise === true) {
        return (
            <div>entrain de chargé</div>
        )
    }*/

    return (
        <>
            {console.log("renderEditExercises")}
            <BlockSubTitleExercises>
                <h2>Mes Exercises</h2>
                {!addedExercise && <button type="button" onClick={addExercise}><Icon icon={addAlt} width="30px" height="30px" /></button>}
            </BlockSubTitleExercises>

            {exercisesUpdate && exercisesUpdate.map((exercise, index) => {
                return (
                    <BlockExercise key={index}>
                        <BlockExerciseTitle newExercise={!exercise.id}>
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
                                <InputLabel id={`NameExercise${exercise.index}`}>Nom</InputLabel>
                                <Select
                                    labelId={`NameExercise${exercise.index}`}
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
                                    value={exercise.duration}
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
                                    value={exercise.number}
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
                                    value={exercise.series}
                                    onChange={(e) => handleChangeExercisesData(e, index)}
                                    id="series"
                                    name="series"
                                    type="number"
                                    min="1"
                                    max="100"
                                />
                            </div>
                            <BlockExerciseBtnAddDelete>
                                {!exercise.id ? <button type="button" onClick={(e) => sendExercise(e, index)}>Ajouter cet
                                    exercise</button> : <button type="button" onClick={(e) => deleteExercise(e,exercise.id,index)}>Supprimer cet
                                    exercise</button> }
                            </BlockExerciseBtnAddDelete>
                        </BlockExerciseContent>
                    </BlockExercise>
                )
            })}
        </>
    )
}

const BlockSubTitleExercises = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    padding: .7rem;
    border: 1px solid ${props => props.theme.colors.dark};
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.dark};
    
    h2 {
        align-self: center;
    }
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
        color: ${props => props.newExercise ? props.theme.colors.validated : props.theme.colors.third };
    }
    p {
        color: ${props => props.theme.colors.third};
        font-weight: ${props => props.newExercise && "700"};
        color: ${props => props.newExercise && props.theme.colors.validated};
    }
`

const BlockExerciseContent = styled.div`
    padding: 0 .7rem ;
    overflow: hidden;
    max-height: ${props => !props.showExercises ? "0" : `300px`};  
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
    }
`

export default EditExercises
