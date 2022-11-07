import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import "./menu.scss";

const Menu = ({userName}) => {
    const [activeLink, setActiveLink] = useState('dashboard');
    const [hoverExit, setHoverExit] = useState(false);
    
    const dispatch = useDispatch();

    const handleActiveLink = (link) => {
        setActiveLink(link);
    }

    const onExit = () => {
        dispatch(logout());
    }

    return(
        <div className="header__container">
            <p className="greetings">
                Hi, {userName}👋
            </p>
            <nav className="header__nav">
                <ul className="header__menu menu">
                    <li className="menu__item" onClick={(e) => handleActiveLink(e.target.getAttribute("data-link"))} data-link="dashboard">
                        <NavLink data-link="dashboard" to="/" className={({isActive}) => !isActive ? "menu__link" : "menu__link menu__link_active"}>
                            <img
                                data-link="dashboard"
                                className="menu__icon" 
                                src={activeLink === "dashboard" ? `${process.env.PUBLIC_URL}/images/menu/dashboard_light.png` : `${process.env.PUBLIC_URL}/images/menu/dashboard_dark.png`} alt="icon"/>
                                Панель
                        </NavLink>
                    </li>
                    <li className="menu__item" onClick={(e) => handleActiveLink(e.target.getAttribute("data-link"))} data-link="analytics" >
                        <NavLink data-link="analytics" to="analytics" className={({isActive}) => !isActive ? "menu__link" : "menu__link menu__link_active"}>
                            <img
                                data-link="analytics"
                                className="menu__icon" 
                                src={activeLink === "analytics" ? `${process.env.PUBLIC_URL}/images/menu/analytics_light.png` : `${process.env.PUBLIC_URL}/images/menu/analytics_dark.png`} alt="icon"/>
                                Статистика
                        </NavLink>
                    </li>
                    <li className="menu__item" onClick={(e) => handleActiveLink(e.target.getAttribute("data-link"))} data-link="transactions">
                        <NavLink data-link="transactions" to="transactions" className={({isActive}) => !isActive ? "menu__link" : "menu__link menu__link_active"}>
                            <img
                                data-link="transactions"
                                className="menu__icon" 
                                src={activeLink === "transactions" ? `${process.env.PUBLIC_URL}/images/menu/transactions_light.png` : `${process.env.PUBLIC_URL}/images/menu/transactions_dark.png`} alt="icon"/>
                                Транзакции
                        </NavLink>
                    </li>
                    {/* <li className="menu__item" onClick={(e) => handleActiveLink(e.target.getAttribute("data-link"))} data-link="savings">
                        <NavLink data-link="savings" to="savings" className={({isActive}) => !isActive ? "menu__link" : "menu__link menu__link_active"}>
                            <img
                                data-link="savings"
                                className="menu__icon" 
                                src={activeLink === "savings" ? `${process.env.PUBLIC_URL}/images/menu/savings_light.png` : `${process.env.PUBLIC_URL}/images/menu/savings_dark.png`} alt="icon"/>
                                Накопления
                        </NavLink>
                    </li> */}
                    {/* <li className="menu__item" onClick={(e) => handleActiveLink(e.target.getAttribute("data-link"))} data-link="settings">
                        <NavLink data-link="settings" to="settings" className={({isActive}) => !isActive ? "menu__link" : "menu__link menu__link_active"}>
                            <img
                                data-link="settings"
                                className="menu__icon" 
                                src={activeLink === "settings" ? `${process.env.PUBLIC_URL}/images/menu/settings.png` : `${process.env.PUBLIC_URL}/images/menu/settings_dark.png`} alt="settings"/>
                                Настройки
                        </NavLink>
                    </li> */}
                    <li onMouseLeave={() => setHoverExit(false)} onMouseOver={() => setHoverExit(true)} onClick={onExit} className="menu__item">
                        <span className="menu__link">
                            <img
                                className="menu__icon" 
                                src={hoverExit ? `${process.env.PUBLIC_URL}/images/menu/logout_light.png` : `${process.env.PUBLIC_URL}/images/menu/logout_dark.png`} alt="icon"/>
                                Выход
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu;