import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {BlockTitle, ContainerLoading, ContainerPage} from "../../styledComponents/UniformPageComponents";
import SideBar from "../SideBar/SideBar";
import {Line} from 'react-chartjs-2'
import bgStatsPage from "../../assets/images/bgStatsPage.jpg"
import CircularProgress from "@material-ui/core/CircularProgress"
//import moment from "moment";

const axios = require('axios');

const Stats = ({history}) => {

    const [chartData, setChartData] = useState(null)
    const [filterNameWorkout, setFilterNameWorkout] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const GetAllData = async () => {
            try {
                await fetchDataWorkoutsAssociatedUser()
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

    // With userId Fetch workout's data and return it
    const fetchDataWorkoutsAssociatedUser = async () => {
        try {
            const resultDataWorkoutsByUser = await axios.get(`${process.env.REACT_APP_BASE_URL}/workouts?Access_token=${localStorage.getItem("token")}`)
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
        return (
            <ContainerLoading>
                <CircularProgress size="5rem"/>
            </ContainerLoading>
        )
    }


    return (
        <>
            <SideBar history={history} sidebar={true}/>
            <ContainerPage bgPage={bgStatsPage}>
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
                            intersect: true,
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
                <BlockHelperTextOrientation>
                    <p>Pour visualiser votre graphique correctement, Veuillez mettre votre mobile en Orientation Paysage</p>
                </BlockHelperTextOrientation>
            </ContainerPage>
        </>
    )
}

const ContainerChart = styled.div`
    width: 90%;
    margin: auto;
    background-color: aliceblue;
    transition: opacity .5s linear;
    
    @media (orientation: landscape) {
        display: block;
    }
    @media (orientation: portrait) {
        display: none;
    }
    @media only screen and (min-width: 750px) {
        width: 70%;
        opacity: .6;
        
        :hover {
            opacity: .9;
        }
    }  
`

const BlockHelperTextOrientation = styled.div`
    width: 85%;
    margin: auto;
    padding: .7rem;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.dark};
    @media (orientation: landscape) {
        display: none;
    }
    @media (orientation: portrait) {
        display: flex;
    }  
`
export default Stats
