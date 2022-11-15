import withAuth from "../../hoc/withAuth";
import { Link, useNavigate } from "react-router-dom";
import "./authenticationForm.scss";
import $axios from "../../axios/axios";

const RegistrationForm = ({handleChange, username, setUsername, password, setPassword}) => {
    const navigate = useNavigate();

    console.log('render')

    const onSubmit = (e) => {
        e.preventDefault();

        const registrationData = {username, password};

        $axios.post("registration", registrationData)
            .then(() => navigate('/login'));
    }

    return(
        <div className="auth-container login auth">
            <p className="auth__title">Регистрация</p>

            <form onSubmit={onSubmit} className="auth__form form">
                <label htmlFor="username" className="form__label">Username</label>
                <input value={username} onChange={(e) => handleChange(setUsername, e.target.value)} placeholder="Введите логин..." type="text" name="username" className="form__field"/>

                <label htmlFor="username" className="form__label">Password</label>
                <input value={password} onChange={(e) => handleChange(setPassword, e.target.value)} placeholder="Введите пароль..." type="password" name="password" className="form__field"/>

                <button onSubmit={onSubmit} className="form__button">Зарегистрироваться</button>
                <p className="form__nav nav">
                    <span className="nav__text">Уже есть аккаунт?</span>
                    <Link to="/login" className="nav__text nav__reg">Войти</Link>
                </p>
            </form>
        </div>
    )
}

export default withAuth(RegistrationForm);