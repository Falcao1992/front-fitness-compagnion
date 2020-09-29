import styled from "styled-components";

export const ButtonStyled = styled.button`
    margin-left: auto;
    border-radius: 5px;
    padding: 1rem;
    background-color: ${props => props.theme.colors.secondaryLight};
    opacity: ${props => !props.disabledBtn ? "1" : "0.5"};
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    position: relative;
    transition: .8s ;
    overflow: hidden;
    cursor: pointer;
    
    a {
        color: ${props => props.theme.colors.primary};
        padding: inherit;
    }
    
    :focus {
        outline-color: ${props => props.theme.colors.secondary};
    }
    
    @media screen and (min-width: 750px) {
        width: auto;
    }
    
    :hover {
        background-color: transparent;
        border: 1px solid ${props => props.theme.colors.third};
        color: ${props => props.theme.colors.third};
        z-index: 1;
        animation: ${props => props.disabled && "nope .4s forwards"};;
        // Animation button effect nope 
        @keyframes nope {
            0% {
                transform: translateX(0);
            }
            20% {
                transform: translateX(-10px);
            }
            40% {
                transform: translateX(10px);
            }
            60% {
                transform: translateX(-10px);
            }
            80% {
                transform: translateX(10px);
            }
            100% {
                transform: translateX(0);
            }
            
        }
        a,span {
            color: ${props => props.theme.colors.third};
        }
    }
    
    
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        background: ${props => props.theme.colors.secondary};
        border-radius: 0 0 50% 50%;
        opacity: .7;
        transition: .8s;
    }
    :hover:before {
        height: 180%;
        //opacity: 1;
        z-index: -1;
    }     
`;
