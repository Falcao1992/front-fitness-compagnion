import styled from "styled-components";
import { motion } from 'framer-motion';

export const ContainerHeaderMain = styled(motion.main)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    overflow: hidden;
    /*background: ${props => `repeating-linear-gradient(45deg,
                                                ${props.theme.colors.secondary} 0px,
                                                ${props.theme.colors.secondary} 97px,
                                                ${props.theme.colors.secondary}d4 97px,
                                                ${props.theme.colors.secondary}d4 194px,
                                                ${props.theme.colors.secondary}e8 194px,
                                                ${props.theme.colors.secondary}e8 291px)`};
    
     */
     
     
    @media screen and (min-width: 750px){
        justify-content: space-evenly;
        flex-direction: ${props => props.activeHeightAuto && 'column'};
        //padding: ${props => props.activeHeightAuto && '2rem 0'};
        height: ${props => !props.activeHeightAuto && '100vh'};
        
    }
    @media screen and (min-width: 1200px){
        flex-direction: ${props => !props.activeHeightAuto && 'row'};
        margin: auto;
    }
`

export const ContainerPage = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    @media only screen and (min-width: 750px ) {
        width: 85%;
        flex-direction: row;
        padding: 1.4rem;
        align-self: center;
        justify-content: space-between;
        border-radius: 10px;
        min-height: 100vh;
        align-items: center;
    } 
    @media only screen and (min-width: 1200px ) {
        width: 65%;
    }                       
`
export const ContainerPrincipal = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1.4rem 1.4rem;
    background-color: ${props => props.theme.colors.secondaryTransparent};
    
    @media only screen and (min-width: 750px ) {
        width: ${props => props.bgParallaxe && !props.widthMid ? "100%" : "45%"};
        box-shadow: 0 0 5px 3px ${props => props.theme.colors.secondaryLight};
        border-radius: 10px;
        background-size: ${props => props.bgParallaxe && "cover" };
        background-attachment: ${props => props.bgParallaxe && "fixed" };;
        background-image: ${props => props.bgParallaxe && `linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(5,5,32,0.85) 20%, rgba(58,148,230,0.20) 100%), url(${props.bgPage})` };
    } 
              
`

export const BlockImageHeader = styled.div`
    display: flex;
    padding-bottom: .7rem;
    margin: .35rem;
    border-bottom: 1px solid ${props => props.theme.colors.third};
    img {
        width: 100%;
        height: 20vh;
        object-fit: cover;
        border-radius: 0 5% 5% 100%;
    }
    
    @media only screen and (min-width: 750px ) {
        display: ${props => props.disabledMobile && "none"};
        width: 50%;
        border-bottom: none;
        height: fit-content;
        align-self: center;
        padding: 0;   
        margin: 0;
        
        img {
            width: 100%;
            border-radius: initial;
            height: initial;
            object-fit: contain;
            box-shadow: 0 0 15px 5px ${props => props.theme.colors.dark};
        }
    }  
     @media only screen and (min-width: 1200px ) {
        width: 35%;
    }  
`

export const BlockTitle = styled.div`
    font-family: ${props => props.theme.fonts.primary};
    h1,h2 {
        font-size: 2rem;
        margin: 0.67em 0;
        font-weight: 300;
        color: ${props => props.theme.colors.third};
    }
    
    p {
        font-size: .8rem;
        font-weight: 300;
        color: ${props => props.theme.colors.primary};
    }
    small {
        font-size: 1.2rem;
        color: ${props => props.theme.colors.primary};
    }
    
`

export const ErrorMsgStyled = styled.span`
    width: 85%;
    margin: 0 auto 1.4rem;
    background-color: rgb(240 248 255 / 100%);
    color: ${props => props.theme.colors.error};
    text-align: center;
    padding: .5rem;
    border-radius: 5px;
`

export const ContainerLoading = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const BlockArrowUp = styled.div`
    display: flex;
    position: fixed;
    z-index: 2000;
    color: ${props => props.theme.colors.third};
    cursor: pointer;
    bottom: 4.5rem;
    left: 3%;
    opacity: .8;
    @media screen and (min-width: 750px) {
        left: 5%;
    }
`;
