import React from "react";
import SideBar from "../SideBar/SideBar";
import {
    BlockImageHeader,
    BlockTitle,
    ContainerHeaderMain,
    ContainerPage
} from "../../styledComponents/UniformPageComponents";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Footer from "../Footer/Footer";
import bgHomePage from "../../assets/images/bgHomePage.jpg"
import { Icon, InlineIcon } from '@iconify/react';
import bxShowAlt from '@iconify/icons-bx/bx-show-alt';
import addAlt from "@iconify/icons-carbon/add-alt"
import statsChart from '@iconify/icons-ion/stats-chart';
import userEditSolid from '@iconify/icons-la/user-edit-solid';


const HomePage = ({history}) => {
    return (
        <>
            <SideBar history={history}/>
            <ContainerHeaderMain>
                <BlockImageHeader>
                    <img src={bgHomePage} alt="Homme faisant du sport"/>
                </BlockImageHeader>

            <ContainerPage>
                <BlockTitle>
                    <h1>Fitness Companion </h1>
                    <small>Bonjour {localStorage.getItem('username').slice(1, -1)}</small>
                </BlockTitle>
                <ContainerArticle>
                    <BlockArticle>
                        <Icon icon={bxShowAlt} width="30px" height="30px" />
                        <p>Voir mes séances</p>
                        <p><Link to="/workouts">></Link></p>
                    </BlockArticle>

                    <BlockArticle>
                        <Icon icon={addAlt} width="30px" height="30px"/>
                        <p>Creer une séance</p>
                        <p><Link to={{
                            pathname: `/workout`,
                            state: JSON.parse(localStorage.getItem('userId'))
                        }}>></Link></p>
                    </BlockArticle>

                    <BlockArticle>
                        <Icon icon={statsChart} width="30px" height="30px" />
                        <p>Mes statistiques</p>
                        <p><Link to="/stats">></Link></p>
                    </BlockArticle>

                    <BlockArticle>
                        <Icon icon={userEditSolid} width="30px" height="30px" />
                        <p>Modifer mon profil</p>
                        <p><Link to="/myprofile">></Link></p>
                    </BlockArticle>

                </ContainerArticle>
            </ContainerPage>
            </ContainerHeaderMain>
            <Footer/>
        </>
    )
}

const ContainerArticle = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.4rem auto;
    width: 100%;
    
     @media only screen and (min-width: 750px ) {         
           //justify-content: space-between;
    }
`
const BlockArticle = styled.article`
    display: flex;
    background-color: ${props => props.theme.colors.secondaryLight};
    color: ${props => props.theme.colors.primary};
    padding: .7rem;
    margin-bottom: .7rem;
    justify-content: space-between;

    p {
    font-size: .8rem;
        color: ${props => props.theme.colors.primary};
        font-family: ${props => props.theme.fonts.primary};
        padding: .9rem 0;
        letter-spacing: 1px;      
    }
    @media only screen and (min-width: 750px ) {        
        //justify-content: space-between;
    }   
`

export default HomePage
