import { NavLink } from 'react-router-dom'
import {useContext} from "react";
import { useNavigate } from 'react-router';
import {AppContext} from "./AppContext";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import CheckAuth from './HOC/CheckAuth.js'
import {logout} from "../http/userAPI";

const NavBar = observer(() => {
        const { user } = useContext(AppContext)
        const navigate = useNavigate()

        const handleLogout = (event) => {
            logout()
            user.logout()
            navigate('/login', {replace: true})
        }


        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink to="/diary" className="navbar-brand">ABC-дневник</NavLink>
                    <Nav className="me-auto">
                        <CheckAuth>
                            {user.isAuth ? (
                                <>
                                    <NavLink to="/materials" className="nav-link">Материалы</NavLink>
                                    <NavLink to="/diary" className="nav-link">Дневник</NavLink>
                                    <NavLink to="/statistics" className="nav-link">Статистика</NavLink>
                                    <Button onClick={handleLogout} variant="outline-light">Выйти</Button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/login" className="nav-link">Войти</NavLink>
                                    <NavLink to="/signup" className="nav-link">Регистрация</NavLink>
                                </>
                            )}
                            {user.isAdmin && (
                                <NavLink to="/admin" className="nav-link">Панель управления</NavLink>
                            )}
                        </CheckAuth>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
)

export default NavBar