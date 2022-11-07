import withAuth from "../../hoc/withAuth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";
import "./authenticationForm.scss";

const LoginForm = ({handleChange, username, setUsername, password, setPassword}) => {
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        const loginData = {username, password};
        dispatch(login(loginData));
    }

    return(
        <div className="auth-container login auth">
            <p className="auth__title">Вход</p>

            <form onSubmit={onSubmit} className="auth__form form">
                <label htmlFor="username" className="form__label">Username</label>
                <input value={username} onChange={(e) => handleChange(setUsername, e.target.value)} type="text" name="username" placeholder="Введите логин..." className="form__field"/>

                <label htmlFor="username" className="form__label">Password</label>
                <input value={password} onChange={(e) => handleChange(setPassword, e.target.value)} type="password" name="password" placeholder="Введите пароль..." className="form__field"/>

                <button onSubmit={onSubmit} className="form__button">Войти</button>
                <p className="form__nav nav">
                    <span className="nav__text">Нет аккаунта?</span>
                    <Link to="/registration" className="nav__text nav__reg">Регистрация</Link>
                </p>
            </form>
        </div>
    )
}

export default withAuth(LoginForm);