import React from "react";
import SideBar from "../../SideBar/SideBar";
import {
    BlockArrowUp,
    BlockImageHeader,
    BlockTitle,
    ContainerHeaderMain,
    ContainerPage, ContainerPrincipal
} from "../../../styledComponents/UniformPageComponents";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { NavHashLink as NavLink } from 'react-router-hash-link';

import Footer from "../../Footer/Footer";
import bgHomePage from "../../../assets/images/bgHomePage.jpg"
import {Icon} from '@iconify/react';
import bxShowAlt from '@iconify/icons-bx/bx-show-alt';
import addAlt from "@iconify/icons-carbon/add-alt"
import statsChart from '@iconify/icons-ion/stats-chart';
import userEditSolid from '@iconify/icons-la/user-edit-solid';
import Stats from "./Stats/Stats"
import arrowUpCircle from "@iconify/icons-bi/arrow-up-circle"
import {pageTransition, pageVariants} from "../../../functionUtils/AnimationMotion"

const HomePage = ({history}) => {

    const redirectArrowUp = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    };

    return (
        <>
            <SideBar history={history}/>
            <ContainerHeaderMain activeHeightAuto={true}
                                 initial="initial"
                                 animate="in"
                                 exit="out"
                                 variants={pageVariants}
                                 transition={pageTransition}
            >
                <ContainerPage>
                    <BlockImageHeader>
                        <img src={bgHomePage} alt="Homme faisant du sport"/>
                    </BlockImageHeader>
                    <ContainerPrincipal>
                        <BlockTitle>
                            <h1>Fitness Companion </h1>
                            <small>Bonjour {localStorage.getItem('username').slice(1, -1)}</small>
                        </BlockTitle>
                        <ContainerArticle>
                            <BlockArticle>
                                <Icon icon={bxShowAlt} width="30px" height="30px"/>
                                <p>Voir mes séances</p>
                                <small><Link to="/workouts">></Link></small>
                            </BlockArticle>

                            <BlockArticle>
                                <Icon icon={addAlt} width="30px" height="30px"/>
                                <p>Creer une séance</p>
                                <small><Link to={{
                                    pathname: `/workout`,
                                    state: JSON.parse(localStorage.getItem('userId'))
                                }}>></Link></small>
                            </BlockArticle>

                            <BlockArticle>
                                <Icon icon={statsChart} width="30px" height="30px"/>
                                <p>Mes statistiques</p>
                                <small>
                                   {/* <button onClick={handleBackClick}>
                                        >
                                    </button>*/}
                                    <NavLink
                                        to="/#stats"
                                        scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'end' })}
                                    >
                                        >
                                    </NavLink>

                                </small>
                            </BlockArticle>

                            <BlockArticle>
                                <Icon icon={userEditSolid} width="30px" height="30px"/>
                                <p>Modifer mon profil</p>
                                <small><Link to="/myprofile">></Link></small>
                            </BlockArticle>

                        </ContainerArticle>
                    </ContainerPrincipal>

                </ContainerPage>
                <Stats history={history}
                />
            </ContainerHeaderMain>
            <BlockArrowUp onClick={redirectArrowUp}>
                <Icon icon={arrowUpCircle} width="50px" height="50px"/>
            </BlockArrowUp>
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
    align-items: center;

    p {
        font-size: .8rem;
        color: ${props => props.theme.colors.primary};
        font-family: ${props => props.theme.fonts.primary};
        padding: .9rem 0;
        letter-spacing: 1px;      
    }
    small {
        font-size: 1.7rem;    
        a,button {
            padding: .7rem;
            transition: color .4s linear;
        }
    }
    @media only screen and (min-width: 750px ) {        
        //justify-content: space-between;
        a:hover,button:hover {
            color: ${props => props.theme.colors.third};
        }
    }   
`

export default HomePage
