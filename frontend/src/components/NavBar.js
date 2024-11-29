import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "..";
import { observer } from 'mobx-react-lite';
import '../styles/NavBar.css';
import { ADMIN_ROUTE, GENDER_CHECK_ROUTE, LOGIN_ROUTE, PIZZA_ROUTE, IP_ROUTE, REGISTRATION_ROUTE, BASKET_ROUTE } from "../utils/consts";

const NavBar = observer(() => {
    const { user } = useContext(Context);

    const logOut = () =>{
        user.setUser({});
        user.setAuth(false);
        localStorage.removeItem('token');
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    PizzaHub
                </Link>
                {user.isAuth ?
                    <ul className="navbar-menu">
                        <li>
                            <Link to={GENDER_CHECK_ROUTE} className="navbar-link">Пол</Link>
                        </li>
                        <li>
                            <Link to={IP_ROUTE} className="navbar-link">Ip</Link>
                        </li>
                        <li style={{ color: 'white' }}>
                            Добро пожаловать, {user.user.email}
                        </li>
                        <li>
                            <Link to={BASKET_ROUTE} className="navbar-link">Корзина</Link>
                        </li>
                        {user.user.role === 'admin' &&
                        <li>
                            <Link to={ADMIN_ROUTE} className="navbar-link">Администрирование</Link>
                        </li>}
                        <li>
                            <Link to={PIZZA_ROUTE} onClick={() => logOut()} className="navbar-link">Выйти</Link>
                        </li>
                    </ul>
                :
                    <ul className="navbar-menu">
                        <li>
                            <Link to={GENDER_CHECK_ROUTE} className="navbar-link">Пол</Link>
                        </li>
                        <li>
                            <Link to={IP_ROUTE} className="navbar-link">Ip</Link>
                        </li>
                        <li>
                            <Link to={REGISTRATION_ROUTE} className="navbar-link">Регистрация</Link>
                        </li>
                        <li>
                            <Link to={LOGIN_ROUTE} className="navbar-link">Авторизация</Link>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    );
  }
);
  
export default NavBar;