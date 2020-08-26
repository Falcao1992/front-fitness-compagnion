import styled from "styled-components";

export const ContainerPage = styled.section`
    display: flex;
    flex-direction: column;
    height: 100vh;
    //justify-content: space-evenly;
    background-image: url(${props => props.bgPage});
    background-size: cover;
    background-position: left;
`

export const BlockTitle = styled.div`
    text-align: center;
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.primary};
    border-top: 3px solid ${props => props.theme.colors.dark};
    border-bottom: 3px solid ${props => props.theme.colors.dark};
    opacity: .9;
    margin: 1.5rem 0;
    h1 {
        font-size: 1.7rem;
        color: ${props => props.theme.colors.third};
    }
    
    p {
        font-size: .9rem;
        padding-bottom: .7rem;
        font-weight: 700;
    }
`

export const ErrorMsgStyled = styled.span`
    background-color: rgb(240 248 255 / 100%);
    color: #ff3b3b;
    text-align: center;
    padding: .5rem;
    margin-top: .5rem;
`
