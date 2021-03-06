
export const register = (username, password, email, size, weight, birthday, gender) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, email, size, weight, birthday, gender})
    };

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user
        })
}
export const login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'https://fitness-companion.netlify.app',
            //'Authorization': 'Bearer ' + "token",
        },
        credentials: 'include',
        body: JSON.stringify({username, password}),
    };

    return fetch(`${process.env.REACT_APP_BASE_URL}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                localStorage.setItem('username', JSON.stringify(user.username));
                localStorage.setItem('userId', JSON.stringify(user.userId));
                localStorage.setItem('token', JSON.stringify(user.token));
            }
            return user;
        })
        //.catch((err) => console.error({msg: err}))

}

export const logout = async (history) => {
    // remove user from local storage to log user out
    await history.push("/login")
    localStorage.clear()
}

export const handleResponse = (response) => {
    // Return data or error msg from back by specific error
    return response.text()
        .then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('userId');
                    localStorage.removeItem('token');
                }
                console.log("data", data)
                const error = (data && data.msg) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        })
}

