import '../styles/Auth.css';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CATALOG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { googleAuthentifiaction, login, registration } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import google_icon from '../assets/google_icon.webp';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const click = async() => {
      try {
        let data;
        if (isLogin){
          data = await login(email, password);
        }
        else{
          data = await registration(email, password);
        }
        user.setUser(data);
        window.location.href = CATALOG_ROUTE;
      } catch (err) {
        alert(err.response.data);
      }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        click();
    };
    return (
      <div className="container">

      <div className="auth-container">
            <h2>{isLogin ? "Авторизация" : "Регистрация"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Электронная почта:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                </div>
                <button type="submit">Войти</button>
                {isLogin ?
                  <Link className="info" to={REGISTRATION_ROUTE}>Нет аккаунта? Создать</Link>
                  :
                  <Link className="info" to={LOGIN_ROUTE}>Уже есть аккаунт? Войти</Link>
                }
                <button type="button" className="google" onClick={() => googleAuthentifiaction()}>Войти с помощью <img src={google_icon} alt="google_icon"></img></button>
            </form>
        </div>
      </div>
    );
  });
  
export default Auth;