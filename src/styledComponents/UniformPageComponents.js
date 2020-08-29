import styled from "styled-components";

export const ContainerPage = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: ${props => props.bgPage ? "100vh" : "100%"};
    background-image: ${props => props.bgPage && `url(${props.bgPage})`};
    background-size: ${props => props.bgPage && "cover"};
    background-position: ${props => props.bgPage && "left"};
    background: ${props => !props.bgPage && "linear-gradient(45deg, rgb(86, 95, 151) 0%, rgb(86, 95, 151) 63%,rgb(105, 118, 165) 63%, rgb(105, 118, 165) 75%,rgb(125, 141, 179) 75%, rgb(125, 141, 179) 81%,rgb(144, 165, 193) 81%, rgb(144, 165, 193) 85%,rgb(164, 188, 207) 85%, rgb(164, 188, 207) 90%,rgb(183, 211, 221) 90%, rgb(183, 211, 221) 100%);"};                     
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
    width: 85%;
    margin: 0 auto;
    background-color: rgb(240 248 255 / 100%);
    color: #ff3b3b;
    text-align: center;
    padding: .5rem;
`

export const ContainerLoading = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
