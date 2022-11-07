import './App.scss';

import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import { Login, Registration, Dashboard, Transactions, Savings, Analytics, Settings, NotFound } from '../pages/PagesCollection';

const App = () => {
    return (
        <>
            <Routes>
                <Route path='login' element={<Login/>}/>
                <Route path='registration' element={<Registration/>}/>

                <Route path='/' element={<Layout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path='transactions' element={<Transactions/>}/>
                    <Route path='savings' element={<Savings/>}/>
                    <Route path='analytics' element={<Analytics/>}/>
                    <Route path='settings' element={<Settings/>}/>
                    <Route path='*' element={<NotFound/>} />
                </Route>
            </Routes>  
        </>
    );
}

export default App;
