import React, {useState, useEffect} from "react";
import moment from "moment";
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
        setDataUserFormatted({...dataUserFormatted, [e.target.id]: e.target.value});
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
        const b = moment(dateBirth, 'YYYY');
        return a.diff(b, 'years'); // calculates patient's age in years
    }

    const {username, size, weight, dateBirth, email, id} = dataUserFormatted

    return (
        <div>
            <h2>Mon Profiles</h2>
            <button onClick={() => onSubmit()}>Modifier mon Profile</button>
            <div>
                <label htmlFor='username'>username</label>
                <input type="text" id='username' value={username} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='email'>email</label>
                <input type="email" id='email' value={email} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='size'>Taille (entre 120 et 200cm</label>
                <input type="number" min="120" max="200" id='size' value={size !== null ? size : 120}
                       onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='weight'>Poids (entre 50 et 130kg)</label>
                <input type="number" min="30" max="130" id='weight' value={weight !== null ? weight : 50}
                       onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='dateBirth'>Anniversaire</label>
                <input type="date" id='dateBirth' value={dateBirth !== null ? moment(dateBirth).format('YYYY-MM-DD') : '2000-01-01'}
                       onChange={handleChange}/>
            </div>
            <p>age : {} </p>
            <p>{calculateAge()}</p>
        </div>
    )
}

export default MyProfile
