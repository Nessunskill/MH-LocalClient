import LoginForm from "../components/authtentication/LoginForm";

import "../styles/auth.scss";
import cover from "../assets/images/cover.jpg";
import { useDispatch, useSelector } from "react-redux";
import { isExpired } from "react-jwt";
import { useEffect } from "react";
import { authMe } from "../redux/slices/authSlice";
import $axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {auth} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const isTokenExpired = isExpired(token);

    useEffect(() => {
        if (token && !isTokenExpired) {
            dispatch(authMe());
        }

        if (token && isTokenExpired) {
            $axios.get("refresh")
                .then(res => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    dispatch(authMe());
                })
                .catch(() => {
                    navigate("/login");
                })
        }
        // eslint-disable-next-line
    }, [auth]);

    return(
        <div className="auth-container auth">
            <img src={cover} alt="cover" className="auth-cover"/>
            <LoginForm/>
        </div>
    )
}

export default Login;