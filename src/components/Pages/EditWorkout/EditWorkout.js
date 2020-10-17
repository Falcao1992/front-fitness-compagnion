import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import EditExercises from "../Exercises/EditExercises";
import SideBar from "../../SideBar/SideBar";
import DateFnsUtils from '@date-io/date-fns';
import {
    BlockInputLabelStyled, ContainerMultiNumberField,
    FormStyled, InputStyled, KeyboardDatePickerStyled, LabelInputStyled,
    TextFieldStyled
} from "../../../styledComponents/FormComponents";
import {
    BlockImageHeader,
    BlockTitle, ContainerHeaderMain,
    ContainerLoading,
    ContainerPage,
    ContainerPrincipal
} from "../../../styledComponents/UniformPageComponents";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import moment from "moment";
import 'moment/locale/fr'
import frLocale from "date-fns/locale/fr";
import {ButtonStyled} from "../../../styledComponents/ButtonStyled";
import CircularProgress from "@material-ui/core/CircularProgress";
import {toast} from "react-toastify"
import Footer from "../../Footer/Footer"
import bgEditWorkoutPage from "../../../assets/images/bgEditWorkoutPage.jpg"
import bgEditExercises from "../../../assets/images/bgEditExercises.jpg"
import {pageTransition, pageVariants} from "../../../functionUtils/AnimationMotion"

toast.configure();

const axios = require('axios');


const EditWorkout = ({history}) => {

    const [workoutUpdate, setWorkoutUpdate] = useState(null)
    const [exercisesUpdate, setExercisesUpdate] = useState(null)
    const [defaultExercises, setDefaultExercises] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const userId = localStorage.getItem("userId")
    let {workoutId} = useParams()

    moment.locale("fr")

    useEffect(() => {
        // Fetch One Workouts with userId and workoutId
        const fetchDataWorkout = async () => {
            try {
                if (workoutId) {
                    const resultDataWorkoutsByUser = await axios.get(`${process.env.REACT_APP_BASE_URL}/${userId}/workouts/${workoutId}`)
                    return resultDataWorkoutsByUser.data
                } else {
                    return {
                        "name": "Nouvelle séance",
                        "duration": 0,
                        "date": moment().format('yyyy-MM-DD'),
                        "hour": "12:00",
                        "UserId": userId
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchDataWorkout()
            .then((dataWorkout) => {
                setWorkoutUpdate(dataWorkout)
                setExercisesUpdate(dataWorkout.DetailsExercises)
                return dataWorkout
            })
            .then((dataWorkout) => {
                if (dataWorkout.DetailsExercises !== undefined) {
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

    }, [userId, workoutId])


    const fetchDefaultExercises = async () => {
        try {
            const resultDefaultExercises = await axios.get(`${process.env.REACT_APP_BASE_URL}/defaultExercises`)
            return resultDefaultExercises.data
        } catch (error) {
            console.error(error)
        }
    }

    const handleChangeWorkoutData = (e, date) => {
        if (e === null || e.target === undefined) {
            let dateFormat = moment(date, "DD MMM YYYY").format("YYYY-MM-DD")
            setWorkoutUpdate({...workoutUpdate, "date": dateFormat})
        } else {
            setWorkoutUpdate({...workoutUpdate, [e.target.id]: e.target.value})
        }
    }

    const editWorkout = async (e, id) => {
        if (workoutUpdate && id !== undefined) {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/${workoutUpdate.UserId}/workout/${workoutUpdate.id}`, workoutUpdate);
            toast.success('Votre Séance a été correctement Modifer !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
            history.push(`/workouts`)
        } else if (id === undefined) {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/workout/create`, workoutUpdate);
            toast.success('Votre Séance a été correctement Creer !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
            const location = {
                pathname: '/workouts',
                state: {fromEditWorkout: true},
                redirect: true
            }
            history.replace(location)
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
        } else {
            console.error("error unkown")
        }
    }

    if(workoutId === undefined && history.location.pathname !== "/workout") {
        return null
    }

    if (isLoading || defaultExercises === null || workoutUpdate === null) {
        return (
            <ContainerLoading>
                <CircularProgress size="5rem"/>
            </ContainerLoading>
        )
    }



    const {name, duration, date, hour, id} = workoutUpdate

    return (
        <>
            <SideBar history={history} sidebar={true}/>
            <ContainerHeaderMain
                                 activeHeightAuto={true}
                                 initial="initial"
                                 animate="in"
                                 exit="out"
                                 variants={pageVariants}
                                 transition={pageTransition}
            >
                <ContainerPage>
                    <BlockImageHeader>
                        <img src={bgEditWorkoutPage} alt="Homme faisant du sport"/>
                    </BlockImageHeader>
                    <ContainerPrincipal bgParallaxe={true} bgPage={bgEditExercises} widthMid={true}>
                        <BlockTitle>
                            {id !== undefined ? <h2>Modifier la séance</h2> : <h2>Creer une séance</h2>}
                        </BlockTitle>
                        <FormStyled>
                            <TextFieldStyled id="name"
                                             label="Nom de la séance *"
                                             variant="filled"
                                             type="text"
                                             value={name}
                                             onChange={handleChangeWorkoutData}
                                             error={name.length < 5 || name.length > 30}
                                             helperText={name.length < 5 ? "Le nom doit contenir au moins 5 lettres" : name.length > 30 && "Le nom ne peut pas contenir plus de 30 lettres"}
                            />


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

                            <MuiPickersUtilsProvider locale={frLocale}
                                                     utils={DateFnsUtils}
                            >
                                <KeyboardDatePickerStyled
                                    invalidDateMessage
                                    animateYearScrolling={true}
                                    format="dd MMM yyyy"
                                    id="date"
                                    label="Date"
                                    value={date}
                                    onChange={handleChangeWorkoutData}
                                />
                            </MuiPickersUtilsProvider>
                        </FormStyled>
                        <ButtonStyled
                            type="button"
                            onClick={(e) => editWorkout(e, id)}
                            disabledBtn={name.length < 5 || name.length > 30 || name === "Nouvelle séance"}
                            disabled={name.length < 5 || name.length > 30 || name === "Nouvelle séance"}
                        >
                            {id !== undefined ? "Valider Changement" : "Creer ma séance"}
                        </ButtonStyled>
                    </ContainerPrincipal>

                </ContainerPage>
                <ContainerPage style={{minHeight: "initial"}}>
                    {id !== undefined &&
                    <EditExercises exercisesUpdate={exercisesUpdate}
                                   setExercisesUpdate={setExercisesUpdate}
                                   workoutUpdate={workoutUpdate} setWorkoutUpdate={setWorkoutUpdate}
                                   defaultExercises={defaultExercises}
                                   workoutId={workoutId}/>
                    }
                </ContainerPage>
            </ContainerHeaderMain>
            <Footer/>
        </>
    )
}


export default EditWorkout
