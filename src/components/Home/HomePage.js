import React from "react";
import SideBar from "../SideBar/SideBar";

const HomePage = ({history}) => {

    return (
        <>
            <SideBar history={history}/>
            <div>
                <p>Comosantn home page</p>
            </div>
        </>
    )
}
export default HomePage
