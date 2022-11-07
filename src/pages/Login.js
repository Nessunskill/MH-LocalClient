import LoginForm from "../components/authtentication/LoginForm";

import "../styles/auth.scss";
import cover from "../assets/images/cover.jpg";

const Login = () => {
    
    return(
        <div className="auth-container auth">
            <img src={cover} alt="cover" className="auth-cover"/>
            <LoginForm/>
        </div>
    )
}

export default Login;