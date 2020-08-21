import React, {useState, useEffect} from "react";
import moment from "moment";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
const axios = require('axios');

const MyProfile = ({history}) => {
    const [dataUserFormatted, setDataUserFormatted] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        formatUserData()
        setIsLoading(false)
    }, [])

    const formatUserData = () => {
        const dataUser = JSON.parse(localStorage.getItem('user'))
        setDataUserFormatted(dataUser)
        console.log(dataUser)
    }

    const handleChange = (e) => {
        if(e.target.name === 'gender'){
            setDataUserFormatted({...dataUserFormatted, [e.target.name]: e.target.value})
        } else {
            setDataUserFormatted({...dataUserFormatted, [e.target.id]: e.target.value});
        }
    };

    const onSubmit = () => {
        console.log(dataUserFormatted, "dataUserFormatted")
        axios.put(`http://localhost:8000/api/v1/users/${id}`, dataUserFormatted);
        localStorage.setItem('user', JSON.stringify(dataUserFormatted))
        history.push("/")
    }

    if (isLoading && dataUserFormatted === null) {
        return (
            <div>
                pas encore chargé
            </div>
        )
    }
    const calculateAge = () => {
        const a = moment();
        const b = moment(birthday, 'YYYY');
        return a.diff(b, 'years'); // calculates patient's age in years
    }

    const {username, size, weight, email, id, gender, birthday} = dataUserFormatted

    return (
        <div>
            <h2>Mon Profiles</h2>
            <button onClick={() => onSubmit()}>Modifier mon Profile</button>
            <div>
                <label htmlFor='username'>username</label>
                <input type="text" id='username' value={username} onChange={handleChange}/>
            </div>
            <div>
                <FormLabel component="legend">Sexe</FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleChange}>
                    <FormControlLabel value="man" id="man" control={<Radio />} label="man" />
                    <FormControlLabel value="women" id="woman" control={<Radio />} label="women" />
                </RadioGroup>
            </div>
            <div>
                <label htmlFor='email'>email</label>
                <input type="email" id='email' value={email} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='size'>Taille (entre 120 et 200cm</label>
                <input type="number" min="120" max="200" id='size' value={size}
                       onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='weight'>Poids (entre 50 et 130kg)</label>
                <input type="number" min="30" max="130" id='weight' value={weight}
                       onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='birthday'>Anniversaire</label>
                <input type="date" id='birthday' value={birthday !== null ? moment(birthday).format('YYYY-MM-DD') : '2000-01-01'}
                       onChange={handleChange}/>
            </div>
            <p>age : {} </p>
            <p>{calculateAge()}</p>
        </div>
    )
}

export default MyProfile
