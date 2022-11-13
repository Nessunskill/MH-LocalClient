import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Layout.scss";
import "../styles/general.scss";
import Menu from "../components/menu/Menu";

const Layout = () => {
    const {userName} = useSelector(state => state.auth);

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