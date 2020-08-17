import React from "react";
import {logout} from "../_services/user.service";

const HomePage = ({history}) => {
    return (
        <div>
            <p>comoosant homepage</p>
            <button onClick={() => logout(history)}>se déconecter</button>
        </div>
    )
}
export default HomePage
