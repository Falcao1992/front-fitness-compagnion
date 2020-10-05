import React from 'react';
import {Link} from 'react-router-dom';
import {pageTransition, pageVariants} from "../../../functionUtils/AnimationMotion"
import {
    BlockImageHeader, BlockTitle,
    ContainerHeaderMain,
    ContainerPage,
    ContainerPrincipal
} from "../../../styledComponents/UniformPageComponents"
import bgLoginPage from "../../../assets/images/bgLoginPage.jpg"

const NotFoundPage = ({history}) => {
    if(history.location.key) {
        return null
    }
    return (
        <ContainerHeaderMain initial="initial"
                             animate="in"
                             exit="out"
                             variants={pageVariants}
                             transition={pageTransition}
        >
            <ContainerPage>
                <BlockImageHeader>
                    <img src={bgLoginPage} alt="Jeune femme faisant du sport"/>
                </BlockImageHeader>
                <ContainerPrincipal>
                    <BlockTitle>
                        <h1>Fitness<br/>Companion</h1>
                        <p>Pas de résultat pour {history.location.pathname}</p>
                        <p><Link to="/">Go to Home </Link></p>
                    </BlockTitle>
                </ContainerPrincipal>
                {console.log(history.location)}

            </ContainerPage>

        </ContainerHeaderMain>
    );
}

export default NotFoundPage
