import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Todo from './components/Todo';
import PrivateRoute from './components/private-route/PrivateRoute';
import Updatetodo from './components/sub-com/Updatetodo';

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/signup' element={<Signup/>} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/to-do' element={<Todo />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path='/update/:id' element={<Updatetodo />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
