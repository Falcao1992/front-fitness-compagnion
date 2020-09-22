import styled from "styled-components";

export const ContainerPage = styled.section`
    display: flex;
    flex-direction: column;
    padding: 0 1.4rem;
    background-color: ${props => props.theme.colors.secondaryTransparent};;
    
    @media only screen and (min-width: 750px ) {
        padding: 1.4rem;
        height: fit-content;
        align-self: center;
        justify-content: center;
        box-shadow: 0 0 15px 3px ${props => props.theme.colors.secondaryLight};
        border-radius: 10px;
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
        width: 40%;
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
`

export const BlockTitle = styled.div`
    font-family: ${props => props.theme.fonts.primary};
    h1 {
        font-size: 2rem;
        font-weight: 300;
        color: ${props => props.theme.colors.third};
    }
    
    p {
        font-size: .8rem;
        font-weight: 300;
        color: ${props => props.theme.colors.primary};
    }
    
    @media screen and (min-width: 750px) {
        //border: 3px solid ${props => props.theme.colors.dark};
    }
`

export const ErrorMsgStyled = styled.span`
    width: 85%;
    margin: 0 auto;
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
