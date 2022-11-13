import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
// eslint-disable-next-line 
import { Login, Registration, Dashboard, Transactions, Savings, Analytics, Settings, NotFound } from '../pages/PagesCollection';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const App = () => {
     return (
        <>
            <Routes>
                <Route path='login' element={<Login/>}/>
                <Route path='registration' element={<Registration/>}/>

                <Route path='/' element={<PrivateRoute><Layout/></PrivateRoute>}>
                    <Route index element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                    <Route path='transactions' element={<PrivateRoute><Transactions/></PrivateRoute>}/>
                    {/* <Route path='savings' element={<PrivateRoute></PrivateRoute><Savings/>}/> */}
                    <Route path='analytics' element={<PrivateRoute><Analytics/></PrivateRoute>}/>
                    <Route path='settings' element={<PrivateRoute><Settings/></PrivateRoute>}/>
                    <Route path='*' element={<NotFound/>} />
                </Route>
            </Routes>  
        </>
    );
}

export default App;
