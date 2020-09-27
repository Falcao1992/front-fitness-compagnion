import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import MenuIcon from '@material-ui/icons/Menu';
import {logout} from "../../_services/user.service";
import {NavLink, Link} from "react-router-dom";

const SideBar = ({history}) => {

    const [userId, setUserId] = useState(null)
    const burgerRef = useRef()

    const [burgerActive, setBurgerActive] = useState(false)

    const handleClickBurger = () => {
        const userId = JSON.parse(localStorage.getItem('userId'))
        setUserId(userId)
        setBurgerActive(!burgerActive)
    }

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if(burgerActive === true) {
                if (burgerRef.current && !burgerRef.current.contains(event.target)) {
                    console.log("You clicked outside of me!");
                    setBurgerActive(false)
                }
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [burgerRef, burgerActive]);

    return (
        <ContainerSideBar burgerStatus={burgerActive} ref={burgerRef}>
            <BlockBurgerMenu burgerStatus={burgerActive}>
                <button onClick={handleClickBurger}><MenuIcon fontSize="large"/></button>
            </BlockBurgerMenu>
            <ul>
                <li><StyledLinkNav exact to="/" activeClassName="activeClassName">Accueil</StyledLinkNav></li>
                <li><StyledLinkNav to="/workouts" activeClassName="activeClassName">Voir mes Séances</StyledLinkNav>
                </li>
                <li><StyledLinkNav to={{
                    pathname: `/workout`,
                    state: {userId}
                }} activeClassName="activeClassName">Ajouter une Séance</StyledLinkNav>
                </li>
                <li><StyledLinkNav to="/myProfile" activeClassName="activeClassName">Modifer mon
                    profil</StyledLinkNav></li>
                <li>
                    <Link to={{
                        pathname: "/",
                        hash: "#stats",
                        state: {goStatsRef: true}
                    }}>Voir mes Statistiques</Link>
                </li>
                <li>
                    <button onClick={() => logout(history)}>Me déconecter</button>
                </li>
            </ul>
        </ContainerSideBar>
    )
}

const ContainerSideBar = styled.nav`
    height: 100%;
    background-color: ${props => props.theme.colors.dark};
    position: fixed;
    z-index: 1002;
    transform: ${props => !props.burgerStatus ? "translateX(-100%)" : "translateX(0)"};
    transition: transform .4s linear;
    top: 0;
    left: 0;
    
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
    position: fixed;
    z-index: 1005;
    top: 0;
    left: 100%;
    width: 100%;
    transform: ${props => !props.burgerStatus ? `translateX(0)` : `translateX(-100%)`};
    margin-top: 2.5rem;
    margin-left: 1rem;
    transition: all .5s ease-out;
    
    button {
        padding: .2rem;
        border: ${props => !props.burgerStatus ? `1px solid ${props.theme.colors.third}` : `1px solid ${props.theme.colors.primary}`};
        color:  ${props => !props.burgerStatus ? props.theme.colors.third : props.theme.colors.primary};
        transform: ${props => !props.burgerStatus ? "rotate(0deg)" : "rotate(180deg)"};  
        position: absolute;
        transition: all .5s linear;
        cursor: pointer;
        background-color: ${props => props.theme.colors.secondary};    
    }
    svg {
        vertical-align: middle;
    }
`

const StyledLinkNav = styled(NavLink)`
    &.activeClassName {
        color: ${props => props.theme.colors.third};
  }
`

export default SideBar
