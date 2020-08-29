import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {BlockTitle, ContainerPage} from "../../styledComponents/UniformPageComponents";
import SideBar from "../SideBar/SideBar";
import {Line} from 'react-chartjs-2'
//import moment from "moment";

const axios = require('axios');

const Stats = ({history}) => {

    const [chartData, setChartData] = useState(null)
    const [filterNameWorkout, setFilterNameWorkout] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const GetAllData = async () => {
            try {
                const formatDataUser = await formatUserData()
                await fetchDataWorkoutsAssociatedUser(formatDataUser)
                    .then((dataWorkout) => {
                        console.log(dataWorkout, "dataworkout")
                        return transformData(dataWorkout)
                    })
                    .then((arrayDataWorkoutFilter) => {
                        setFilterNameWorkout(arrayDataWorkoutFilter[0])
                        return arrayDataWorkoutFilter
                    })
                    .then((arrayDataWorkoutFilter) => {
                        chart(arrayDataWorkoutFilter)
                    })

                await

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
            return JSON.parse(localStorage.getItem('user'))
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
                //setErrorMsg(errorNetwork.message)
                console.log(errorNetwork.message)
            } else {
                console.log("error unkown")
            }
        }
    }

    const transformData =  (dataWorkout) => {
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

    const chart = (arrayAllData) => {
        console.log("dans la fonction chart")
        //let dataName = arrayAllData[0]
        let dataDuration = arrayAllData[1]
        let dataDate = arrayAllData[2]
        let dataNumberExercise = arrayAllData[3]

        setChartData(
            {
                labels: dataDate,
                datasets: [
                    {
                        label: "Durées (mn)",
                        data: dataDuration,
                        fill: false,
                        backgroundColor: 'rgba(9,56,192)',
                        borderColor: 'rgba(133,174,192,0.6)',
                        borderWidth: 5
                    },
                    {
                        label: "Nb. Exercices",
                        data: dataNumberExercise,
                        fill: false,
                        backgroundColor: 'rgb(192,0,101)',
                        borderColor: 'rgba(192,131,176,0.6)',
                        borderWidth: 5
                    }
                ]
            }
        )
        return 'finish function chart'
    }

    if (isLoading === true) {
        return <div>
            pas de data
        </div>
    }


    return (
        <>
            <SideBar history={history} sidebar={true}/>
            <ContainerPage>
                <BlockTitle>
                    <h1>Mes statistiques</h1>
                </BlockTitle>

                <ContainerChart>
                    <Line data={chartData} options={{
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Statistiques de mes séances'
                        },
                        tooltips: {
                            mode: 'x',
                            //intersect: true
                            callbacks: {
                                title: function(tooltipItem, data) {
                                    console.log("tooltipItem", tooltipItem)
                                    console.log("filterNameWorkout", filterNameWorkout)
                                    return `${filterNameWorkout[tooltipItem[0]['index']]} :`;
                                }
                            },
                        },
                        scales: {
                            xAxes: [
                                {
                                    display:true,
                                    type: 'time',
                                    distribution: 'series',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Date'
                                    },
                                    time: {
                                        unit: "week",
                                        //displayFormats: {
                                        //    quarter: 'MMM YYYY'
                                        //}
                                    },
                                    ticks : {
                                        //autoSkip: true,
                                        //maxTicksLimit: 10,
                                    },

                                }
                            ],
                            yAxes: [
                                {
                                    display: true,
                                    distribution: 'series',
                                    ticks : {
                                        autoSkip: true,
                                        maxTicksLimit: 10,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Value'
                                    }

                                }
                            ]
                        }

                    }}/>
                </ContainerChart>
            </ContainerPage>
        </>
    )
}

const ContainerChart = styled.div`
    width: 90%;
    margin: auto;
    background-color: aliceblue;
`
export default Stats
