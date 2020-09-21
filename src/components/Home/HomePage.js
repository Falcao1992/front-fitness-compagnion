import React from "react";
import SideBar from "../SideBar/SideBar";
import {BlockTitle, ContainerPage} from "../../styledComponents/UniformPageComponents";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ButtonStyled} from "../../styledComponents/ButtonStyled";
import Footer from "../Footer/Footer";
import {BlockButtons} from "../../styledComponents/FormComponents";
import bgHomePage from "../../assets/images/bgHomePage.jpg"

const HomePage = ({history}) => {

    return (
        <>
            <SideBar history={history}/>
            <ContainerPage bgPage={bgHomePage}>
                <BlockTitle>
                    <h1>Fintess Companion </h1>
                </BlockTitle>
                <ContainerArticle>
                    <BlockArticle>
                        <h2>Creer vos séances</h2>
                        <p>Avec Fitness Companion, vous avez la possibilité d'ajouter les séances de sport que vous effectuez dans la vie réel.
                        Ajouter un exercice (nombres, series, durée) puis ajouté le à votre séance.

                        </p>
                        <BlockButtons>
                        <ButtonStyled colorBtnPrimary="rgba(11,11,11,0.85)"
                                      colorBtnSecondary="#C89446"><Link to="/workouts">Voir mes
                            Séance</Link></ButtonStyled>
                        </BlockButtons>
                    </BlockArticle>

                    <BlockArticle>
                        <h2>Suivi de vos séance</h2>
                        <p>Enfin une fois les premieres séance ajouté, Fitness Companion vous propose de suivre l'intégrale de vos séances via un graphique.</p>
                        <BlockButtons>
                            <ButtonStyled colorBtnPrimary="rgba(11,11,11,0.85)"
                                          colorBtnSecondary="#C89446"><Link to="/stats">Voir mes Stats</Link></ButtonStyled>
                        </BlockButtons>

                    </BlockArticle>
                </ContainerArticle>
            </ContainerPage>
            <Footer/>
        </>
    )
}

const ContainerArticle = styled.section`
    width: 85%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    
     @media only screen and (min-width: 750px ) {
           flex-direction: row;
           justify-content: space-between;
           margin: auto;
    }
`
const BlockArticle = styled.div`
    background-color: ${props => props.theme.colors.lightDark};
    border: 1px solid ${props => props.theme.colors.third} ;
    padding: .7rem;
    margin-bottom: 1.4rem;
    h2 {
        border-bottom: 1px solid ${props => props.theme.colors.third};
        color: ${props => props.theme.colors.third};
        padding: .7rem 0;
        
    }
    p {
        color: ${props => props.theme.colors.primary};
        font-family: ${props => props.theme.fonts.primary};
        padding: .9rem 0;
        letter-spacing: 1px;      
    }
    @media only screen and (min-width: 750px ) {
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }   
`

export default HomePage
