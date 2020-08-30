import React, {useState} from "react";
import styled from "styled-components";
import MenuIcon from '@material-ui/icons/Menu';
import {logout} from "../../_services/user.service";
import {Link} from "react-router-dom";

const SideBar = ({history}) => {

    const [userId, setUserId] = useState(null)

    const [burgerActive, setBurgerActive] = useState(false)
    const handleClickBurger = () => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUserId(userData.id)
        setBurgerActive(!burgerActive)

    }

    return (
        <>
            <BlockBurgerMenu burgerStatus={burgerActive}>
                <button onClick={handleClickBurger}><MenuIcon fontSize="large"/></button>
            </BlockBurgerMenu>
            <ContainerSideBar burgerStatus={burgerActive}>
                <ul>
                    <li><Link to="/">Acceuil</Link></li>
                    <li><Link to="/workouts">Voir mes Séance</Link></li>
                    <li><Link to={{
                        pathname: `/workout`,
                        state: {userId}
                    }}>Ajouer une séance</Link>
                    </li>
                    <li><Link to="/stats">Voir mes stats</Link></li>
                    <li><Link to="/myProfile">Modifer mon profil</Link></li>
                    <li>
                        <button onClick={() => logout(history)}>Me déconecter</button>
                    </li>
                </ul>
            </ContainerSideBar>
        </>
    )
}

const ContainerSideBar = styled.nav`
    height: 100%;
    background-color: ${props => props.theme.colors.dark};
    position: fixed;
    z-index: 1000;
    transform: ${props => !props.burgerStatus ? "translateX(-100%)" : "translateX(0)"};
    transition: transform .4s linear;
    
    ul {
        margin-top: 7.5rem;
    }
    li {
        margin: 0 1.2rem 0 1rem;
        list-style: none;
        padding: .7rem 0;
        color: ${props => props.theme.colors.primary};
        border-bottom: 1px solid ${props => props.theme.colors.primary};
    }
`

const BlockBurgerMenu = styled.div`
    display: flex;
    position: absolute;
    z-index: 1001;
    top: 0;
    left: 0;
    margin-top: 2.5rem;
    margin-left: 1rem;
    
    button {
        padding: .2rem;
        border: ${props => !props.burgerStatus ? `1px solid ${props.theme.colors.third}` : `1px solid ${props.theme.colors.primary}`};
        color:  ${props => !props.burgerStatus ? props.theme.colors.third : props.theme.colors.primary};
        transform: ${props => !props.burgerStatus ? "rotate(0deg)" : "rotate(180deg)"};
        position: fixed;
        transition: all .5s linear;
    }
    
    svg {
        vertical-align: middle;
    }
`

export default SideBar
