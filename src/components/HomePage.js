import React  from "react";
import {logout} from "../_services/user.service";
import {Link} from "react-router-dom";

const HomePage = ({history}) => {

    return (
        <div>
            <Link to="/myProfile">Modifer Mon Profil</Link>
            <button onClick={() => logout(history)}>se déconecter</button>
        </div>
    )
}
export default HomePage
