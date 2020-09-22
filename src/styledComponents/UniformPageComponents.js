import styled from "styled-components";

export const ContainerPage = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 1rem;
    
    @media only screen and (min-width: 750px ) {
        padding: 0 5rem;
    }                       
`

export const BlockImageHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-bottom: .7rem;
    margin: .35rem;
    border-bottom: 1px solid ${props => props.theme.colors.third};
    img {
        width: 100%;
        height: 20vh;
        object-fit: cover;
        border-radius: 0 5% 5% 100%;
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
