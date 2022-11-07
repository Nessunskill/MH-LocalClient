import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {

    return () => {
        const {auth} = useSelector(state => state.auth);
        const navigate = useNavigate();

        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        useEffect(() => {
            if (auth) navigate('/');
            // eslint-disable-next-line
        }, [auth]);

        const handleChange = (callback, value) => {
            callback(value);
        }

        return <WrappedComponent 
                handleChange={handleChange}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}/>
    }
}

export default withAuth;