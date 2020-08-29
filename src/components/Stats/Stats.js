import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {BlockTitle, ContainerPage} from "../../styledComponents/UniformPageComponents";
import SideBar from "../SideBar/SideBar";
import {Line} from 'react-chartjs-2'
//import moment from "moment";

const axios = require('axios');

const Stats = ({history}) => {

    const [chartData, setChartData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const GetAllData = async () => {
            try {
                const formatDataUser = await formatUserData()
                await fetchDataWorkoutsAssociatedUser(formatDataUser)
                    .then((dataWorkout) => {
                        chart(dataWorkout)
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

    const chart = (dataWorkout) => {
        console.log("dans la fonction")

        const filterNameWorkout = []
        const filterDurationWorkout = []
        const filterDateWorkout = []

        const filterDateWorkoutData = dataWorkout.sort((a, b) => new Date(a.date) - new Date(b.date))
        filterDateWorkoutData.forEach((workout) => {

            filterNameWorkout.push(workout.name)
            filterDurationWorkout.push(workout.duration)

            let newDate = workout.date.substring(0, 10)
            filterDateWorkout.push(newDate)

        })
        console.log("filterDateWorkout", filterDateWorkout)
        setChartData(
            {
                labels: filterDateWorkout,
                datasets: [
                    {
                        label: 'Durée des séances',
                        data: filterDurationWorkout,
                        backgroundColor: 'rgba(75,192,192,0)',
                        borderColor: 'rgba(192,165,37,0.6)',
                        borderWidth: 4
                    }
                ]
            }
        )
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

                        scales: {
                            xAxes: [
                                {
                                    type: 'time',
                                    //distribution: 'series',
                                    time: {
                                        displayFormats: {
                                            quarter: 'MMM YYYY'
                                        }
                                    },
                                    ticks : {
                                        autoSkip: true,
                                        //maxTicksLimit: 10,
                                    },

                                }
                            ]
                        }

                    }}/>
                </ContainerChart>
                <button type="button" onClick={() => chart()}>lancer les data</button>
            </ContainerPage>
        </>
    )
}

const ContainerChart = styled.div`
    width: 85%;
    margin: auto;
    background-color: aliceblue;
`
export default Stats
