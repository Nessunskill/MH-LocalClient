import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";
import "./authenticationForm.scss";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginForm = () => {
    const dispatch = useDispatch();

    const schema = yup.object({
        username: yup.string().min(4, "Длина логина должна быть не менее 4 символов").max(12, "Длина логина должна быть не более 12 символов"),
    })

    console.log('render')

    const { register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        console.log(data)
    }

    return(
        <div className="auth-container login auth">
            <p className="auth__title">Вход</p>

            <form onSubmit={handleSubmit(onSubmit)} className="auth__form form">
                <label htmlFor="username" className="form__label">Username</label>
                <input {...register("username")} type="text" name="username" placeholder="Введите логин..." className="form__field"/>
                <p>{errors.username?.message}</p>

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