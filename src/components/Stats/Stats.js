import React, {useEffect, useState, forwardRef, useLayoutEffect} from "react";
import styled from "styled-components";
import {BlockTitle, ContainerLoading} from "../../styledComponents/UniformPageComponents";
import {Line} from 'react-chartjs-2'
import CircularProgress from "@material-ui/core/CircularProgress"

const axios = require('axios');

const Stats = forwardRef(({onBackClick, history}, ref) => {

    const [filterNameWorkout, setFilterNameWorkout] = useState([])
    const [filterDurationWorkout, setFilterDurationWorkout] = useState([])
    const [filterDateWorkout, setFilterDateWorkout] = useState([])
    const [filterExercisesWorkout, setFilterExercisesWorkout] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const GetAllData = async () => {
            try {
                await fetchDataWorkoutsAssociatedUser()
                    .then((dataWorkout) => {
                        return transformData(dataWorkout)
                    })
                    .then((arrayDataWorkoutFilter) => {
                        setFilterNameWorkout(arrayDataWorkoutFilter[0])
                        setFilterDurationWorkout(arrayDataWorkoutFilter[1])
                        setFilterDateWorkout(arrayDataWorkoutFilter[2])
                        setFilterExercisesWorkout(arrayDataWorkoutFilter[3])
                        return arrayDataWorkoutFilter
                    })
                await setIsLoading(false)
            } catch (error) {
                console.error("error unknown", error)
            }
        }
        GetAllData()
            .then(() => {
                console.log("GetAllData")
            }).catch((error) => {
            if (error.response.status === 401) {
                history.push("/login")
                localStorage.clear()
            }
        })

    }, [history])

    useLayoutEffect(() => {
        const checkRefStats = async () => {
            if (history.location.state) {
                if (history.location.state.goStatsRef === true && ref.current !== undefined) {
                    onBackClick()
                }
            }
        }
        checkRefStats()
    },[history, onBackClick, ref])

    // With userId Fetch workout's data and return it
    const fetchDataWorkoutsAssociatedUser = async () => {
        const resultDataWorkoutsByUser = await axios.get(`${process.env.REACT_APP_BASE_URL}/workouts?Access_token=${localStorage.getItem("token")}`)
        return resultDataWorkoutsByUser.data
    }

    const transformData = (dataWorkout) => {
        const filterNameWorkout = []
        const filterDurationWorkout = []
        const filterDateWorkout = []
        const filterNumberExercise = []

        const filterDateWorkoutData = dataWorkout.sort((a, b) => new Date(a.date) - new Date(b.date))
        filterDateWorkoutData.forEach((workout) => {
            filterNameWorkout.push(workout.name)
            filterDurationWorkout.push(workout.duration)
            filterNumberExercise.push(workout.DetailsExercises.length)
            let newDate = workout.date.substring(0, 10)
            filterDateWorkout.push(newDate)
        })

        setFilterNameWorkout(filterNameWorkout)
        return [filterNameWorkout, filterDurationWorkout, filterDateWorkout, filterNumberExercise]
    }


    const data = (canvas) => {
        const ctx = canvas.getContext("2d")
        const height = window.innerHeight / 2;
        const width = (window.innerWidth * 70) / 100 - 44.8;

        const gradientFillExercises = ctx.createLinearGradient(0, height, 0, 0);
        gradientFillExercises.addColorStop(1, "rgb(34,34,140,0.2)");
        gradientFillExercises.addColorStop(0, "rgb(34,34,140,0.1)");

        const gradientStrokeExercises = ctx.createLinearGradient(0, 0, width, height);
        gradientStrokeExercises.addColorStop(1, '#6bb1d9');
        gradientStrokeExercises.addColorStop(0, '#032c8d');

        const gradientFillDuration = ctx.createLinearGradient(0, height, 0, 0);
        gradientFillDuration.addColorStop(1, "rgba(10,169,136,0.5)");
        gradientFillDuration.addColorStop(0, "rgba(10,169,136,0.1)");

        /*const gradientStrokeDuration = ctx.createLinearGradient(0, 0, width, height);
        gradientStrokeDuration.addColorStop(0, '#22298d');
        gradientStrokeDuration.addColorStop(1, '#941906');*/

        setIsLoading(false)

        return {
            labels: filterDateWorkout,
            datasets: [
                {
                    label: "Nb. Exercices",
                    data: filterExercisesWorkout,
                    fill: true,
                    borderColor: gradientStrokeExercises,
                    pointBorderColor: gradientStrokeExercises,
                    pointBackgroundColor: gradientStrokeExercises,
                    pointHoverBackgroundColor: gradientStrokeExercises,
                    pointHoverBorderColor: gradientStrokeExercises,
                    pointBorderWidth: 8,
                    pointHoverRadius: 8,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    borderWidth: 4,
                },
                {
                    label: "Durées (mn)",
                    data: filterDurationWorkout,
                    fill: true,
                    backgroundColor: gradientFillDuration,
                    borderColor: "rgba(10,169,136,0.8)",
                    pointBorderWidth: 8,
                    pointHoverRadius: 8,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    borderWidth: 4,
                },

            ]
        }
    }

    if (isLoading === true) {
        return (
            <ContainerLoading>
                <CircularProgress size="5rem"/>
            </ContainerLoading>
        )
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            easing: "easeInOutBack"
        },

        layout: {
            padding: {top: 5, left: 5, right: 5, bottom: 5}
        },
        title: {
            display: true,
            text: 'Statistiques de mes séances',
            fontSize: 20,
            fontColor: "#C89446"
        },
        tooltips: {
            mode: 'x',
            intersect: true,
            callbacks: {
                title: function (tooltipItem, data) {
                    return `${filterNameWorkout[tooltipItem[0]['index']]} :`;
                }
            },
        },
        scales: {
            xAxes: [
                {
                    display: true, type: 'time', distribution: 'series',
                    scaleLabel: {
                        display: true,
                        labelString: 'Date',
                        fontColor: "#C89446"
                    },
                    time: {
                        unit: "week",
                        //displayFormats: {
                        //    quarter: 'MMM YYYY'
                        //}
                    },
                }
            ],
            yAxes: [
                {
                    display: true,
                    distribution: 'series',


                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 7,
                        padding: 5
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value',
                        fontColor: "#C89446"
                    }
                }
            ]
        },
    }

    return (
        <>
            <ContainerStats ref={ref}>
                <BlockTitle>
                    <h1>Mes statistiques</h1>
                </BlockTitle>

                <ContainerChart>
                    <Line data={data}
                          options={chartOptions}
                    />
                </ContainerChart>
            </ContainerStats>
        </>
    )
})

const ContainerStats = styled.section`
    padding: 0 1.4rem 1.4rem;
    width: 100%;
    @media only screen and (min-width: 750px) {
        width: 80%;
        margin: auto;
    }
`

const ContainerChart = styled.div`
    background-color: ${props => props.theme.colors.secondaryLight};
    position: relative;
    height: 50vh;
    width: 100%;

    @media only screen and (min-width: 750px) {
        //width: 70%;
        margin: auto;
    }
`
export default Stats
