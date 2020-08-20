import React from "react";
import styled from 'styled-components'
import bgRegisterPage from "../../assets/images/bgRegisterPage.jpeg"
import RegisterForm from "./RegisterForm";


const RegisterPage = ({history}) => {


    return (
        <ContainerRegisterPage bgPage={bgRegisterPage}>
            <BlockTitle>
                {console.log('render')}
                <h1>Creer un nouveau Compte</h1>
            </BlockTitle>
            <RegisterForm history={history}/>
        </ContainerRegisterPage>
    )
}

const ContainerRegisterPage = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-image: url(${props => props.bgPage});
    background-size: cover;
    background-position: left;
`

const BlockTitle = styled.div`
    text-align: center;
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.primary};
    border-top: 2px solid ${props => props.theme.colors.secondary};
    border-bottom: 2px solid ${props => props.theme.colors.secondary};
    opacity: .9;
    
    h1 {
        font-size: 1.7rem;
        color: ${props => props.theme.colors.secondary};
    }
`


export default RegisterPage
