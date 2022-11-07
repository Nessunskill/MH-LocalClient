import RegistrationForm from "../components/authtentication/RegistrationForm";

import "../styles/auth.scss";
import cover from "../assets/images/cover.jpg";

const Registration = () => {
    
    return(
        <div className="auth-container auth">
            <img src={cover} alt="cover" className="auth-cover"/>
            <RegistrationForm/>
        </div>
    )
}

export default Registration;