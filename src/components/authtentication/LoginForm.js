import withAuth from "../../hoc/withAuth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";
import "./authenticationForm.scss";

import { useForm } from "react-hook-form";

const LoginForm = () => {
    const dispatch = useDispatch();

    console.log('render')

    const { register, handleSubmit} = useForm();

    const onSubmit = data => {
        console.log(data)
    }

    return(
        <div className="auth-container login auth">
            <p className="auth__title">Вход</p>

            <form onSubmit={handleSubmit(onSubmit)} className="auth__form form">
                <label htmlFor="username" className="form__label">Username</label>
                <input {...register("username")} type="text" name="username" placeholder="Введите логин..." className="form__field"/>

                <label htmlFor="username" className="form__label">Password</label>
                <input {...register("password")} type="password" name="password" placeholder="Введите пароль..." className="form__field"/>

                <button className="form__button">Войти</button>
                <p className="form__nav nav">
                    <span className="nav__text">Нет аккаунта?</span>
                    <Link to="/registration" className="nav__text nav__reg">Регистрация</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginForm;