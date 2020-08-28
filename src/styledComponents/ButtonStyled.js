import styled from "styled-components";

export const ButtonStyled = styled.button`
    width: 100%;
    margin: 1rem auto;
    padding: 1rem;
    background-color: ${props => props.colorBtnPrimary};
    opacity: ${props => !props.disabledBtn ? "1" : "0.5"};
    color: ${props => props.colorBtnSecondary};
    border: 1px solid ${props => props.colorBtnSecondary};
    position: relative;
    transition: .8s ;
    overflow: hidden;
    cursor: pointer;
    
    a {
        color: ${props => props.colorBtnSecondary};
    }
    
    :focus {
        outline-color: ${props => props.colorBtnSecondary};
    }
    
    @media screen and (min-width: 750px) {
        width: 50%;
        margin: 3rem auto 1.5rem;
    }
    
    :hover {
        background-color: transparent;
        border: 1px solid ${props => props.colorBtnPrimary};
        color: ${props => props.colorBtnPrimary};
        z-index: 1;
        a,span {
            color: ${props => props.colorBtnPrimary};
            font-weight: 700;
        }
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
