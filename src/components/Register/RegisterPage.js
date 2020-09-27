import React from "react";
import RegisterForm from "./RegisterForm";
import {
    BlockImageHeader,
    BlockTitle,
    ContainerHeaderMain,
    ContainerPage, ContainerPrincipal
} from "../../styledComponents/UniformPageComponents";
import bgRegisterPage from "../../assets/images/bgRegisterPage.jpeg"

const RegisterPage = ({history}) => {

    return (
        <ContainerHeaderMain>
            <ContainerPage>
                <BlockImageHeader>
                    <img src={bgRegisterPage} alt="Jeune femme faisant du sport"/>
                </BlockImageHeader>
                <ContainerPrincipal>
                    <BlockTitle>
                        <h1>Creer un nouveau Compte</h1>
                        <p>Merci de remplir les champs suivant afin de creer votre compte</p>
                    </BlockTitle>
                    <RegisterForm history={history}/>
                </ContainerPrincipal>
            </ContainerPage>
        </ContainerHeaderMain>
    )
}

export default RegisterPage
