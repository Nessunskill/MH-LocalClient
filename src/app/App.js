import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
// eslint-disable-next-line 
import { Login, Registration, Dashboard, Transactions, Savings, Analytics, Settings, NotFound } from '../pages/PagesCollection';
import { useSelector } from 'react-redux';
import { isExpired } from 'react-jwt';
import { useEffect } from 'react';
import $axios from '../axios/axios';

const App = () => {
    const {auth} = useSelector(state => state.auth);
    const navigate = useNavigate();

    const checkAuth = async () => {
        const token = localStorage.getItem("accessToken");

        const isTokenExpired = isExpired(token);

        if (token && !isTokenExpired) {
            navigate("/");
        } else {
            $axios.get("refresh")
                .then(res => res.data)
                .then(res => console.log(res));
        }
    }

    useEffect(() => {
        checkAuth();
    }, [auth]);
    
    return (
        <>
            <Routes>
                <Route path='login' element={<Login/>}/>
                <Route path='registration' element={<Registration/>}/>

                <Route path='/' element={<Layout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path='transactions' element={<Transactions/>}/>
                    {/* <Route path='savings' element={<Savings/>}/> */}
                    <Route path='analytics' element={<Analytics/>}/>
                    <Route path='settings' element={<Settings/>}/>
                    <Route path='*' element={<NotFound/>} />
                </Route>
            </Routes>  
        </>
    );
}

export default App;
