import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login.js'
import Signup from '../pages/Signup.js'
import Materials from '../pages/Materials.js'
import Diary from '../pages/Diary.js'
import Statistics from '../pages/Statistics'
import NotFound from '../pages/NotFound.js'
import Admin from '../pages/Admin.js'
import { AppContext } from './AppContext.js'
import { useContext } from 'react'
import {observer} from "mobx-react-lite";
import OneMaterial from "../pages/OneMaterial";

const publicRoutes = [
    {path: '/login', Component: Login},
    {path: '/signup', Component: Signup},
    {path: '*', Component: NotFound},
]

const authRoutes = [
    {path: '/materials', Component: Materials},
    {path: '/materials/:id', Component: OneMaterial},
    {path: '/diary', Component: Diary},
    {path: '/statistics', Component: Statistics},
]

const adminRoutes = [
    {path: '/admin', Component: Admin},
]

const AppRouter = observer(() => {
    const { user } = useContext(AppContext)
    console.log(user.isAuth)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAdmin && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
        </Routes>
    )
})

export default AppRouter