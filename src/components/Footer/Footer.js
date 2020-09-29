import React from "react";
import styled from "styled-components";

const Footer = () => {
    return (
        <ContainerFooter>
            <BlockText>
                <p>©2020 Eduardo Lépine, Tous droits réservés</p>
            </BlockText>
        </ContainerFooter>
    )
};

const ContainerFooter = styled.footer`
    background-color: ${props => props.theme.colors.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.4rem 0;
    //margin-top: 2rem;
`;

const BlockText = styled.div`

    p {
        color: ${props => props.theme.colors.dark};
        text-align: center;
        padding: .25rem 0;
    }
    
`;

export default Footer
