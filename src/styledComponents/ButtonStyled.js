import styled from "styled-components";

export const ButtonStyled = styled.button`
    width: 100%;
    margin: 1rem auto;
    padding: 1rem;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.colorBtnSecondary};
    border: 1px solid ${props => props.colorBtnSecondary};
    position: relative;
    transition: .8s;
    overflow: hidden;
    cursor: pointer;
    
    :focus {
        outline-color: ${props => props.colorBtnSecondary};
    }
    
    @media screen and (min-width: 750px) {
        width: 50%;
        margin: 3rem auto 1.5rem;
    }
    
    :hover {
        background-color: transparent;
        color: ${props => props.colorBtnPrimary};
        z-index: 1;
    }
    
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        background: ${props => props.colorBtnSecondary};
        border-radius: 0 0 50% 50%;
        transition: .8s;
    }
    :hover:before {
        height: 180%;
        z-index: -1;
    }     
`;
