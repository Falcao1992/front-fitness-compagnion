export const register = (username, password, email, size, weight, birthday, gender) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, email, size, weight, birthday, gender})
    };

    return fetch(`${process.env.REACT_APP_BASE_URL}/users/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user
        })
}
export const login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };

    return fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                //user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user.userId));
            }
            return user;
        })
        //.catch((err) => console.error({msg: err}))

}

export const logout = (history) => {
    // remove user from local storage to log user out
    history.push("/login")
    localStorage.removeItem('user');
}

export const handleResponse = (response) => {
    // Return data or error msg from back by specific error
    return response.text()
        .then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('user');
                }
                console.log("data", data)
                const error = (data && data.msg) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        })
}

