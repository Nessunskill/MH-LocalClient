import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Layout.scss";
import "../styles/general.scss";
import Menu from "../components/menu/Menu";

const Layout = () => {
    const {auth, userName} = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        !auth ? navigate('/login') : navigate('/');
        // eslint-disable-next-line
    }, [auth]);

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