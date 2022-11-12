import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Layout.scss";
import "../styles/general.scss";
import Menu from "../components/menu/Menu";
import { isExpired } from "react-jwt";
import $axios from "../axios/axios";
import { checkAuth } from "../redux/slices/authSlice";

const Layout = () => {
    const {auth, userName} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // dispatch(checkAuth(localStorage.getItem("accessToken")));
        // !auth ? navigate('/login') : navigate('/');
        // eslint-disable-next-line
    }, []);

    return(
        <div className="layout">
            <header className='layout__header header'>
                <Menu userName={userName}/>    
            </header>   
            
            <main className='layout__content'>
                <Outlet/>
            </main>

            <aside className='layout__sidebar'>

            </aside>   
        </div>
    )
}

export default Layout;