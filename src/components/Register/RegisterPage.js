import React from "react";
import bgRegisterPage from "../../assets/images/bgRegisterPage.jpeg"
import RegisterForm from "./RegisterForm";
import {BlockTitle, ContainerPage} from "../../styledComponents/UniformPageComponents";

const RegisterPage = ({history}) => {

    return (
        <ContainerPage bgPage={bgRegisterPage}>
            <BlockTitle>
                <h1>Creer un nouveau Compte</h1>
            </BlockTitle>
            <RegisterForm history={history}/>
        </ContainerPage>
    )
}

export default RegisterPage
