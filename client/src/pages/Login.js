import { AppContext } from '../components/AppContext.js'
import {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Card, Form, Button}   from 'react-bootstrap'
import {useNavigate} from "react-router";
import { login } from '../http/userAPI.js'
import { observer } from 'mobx-react-lite'

const Login = observer(() => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    // если пользователь авторизован — ему здесь делать нечего
    useEffect(() => {
        if (user.isAdmin) navigate('/admin', {replace: true})
        if (user.isAuth) navigate('/diary', {replace: true})
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target.email.value.trim()
        const password = event.target.password.value.trim()
        const data = await login(email, password)
        if (data) {
            user.login(data)
            if (user.isAdmin) navigate('/admin')
            if (user.isAuth) navigate('/diary')
        }
    }

    return (
        <Container
            className="d-flex justify-content-center">
            <Card style={{width: '45%'}} className="p-4 mt-5 bg-light">
                <h3 className="m-auto">Авторизация</h3>
                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Control
                        name="email"
                        className="mt-3"
                        placeholder="Введите ваш email..."
                    />
                    <Form.Control
                        name="password"
                        type="password"
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button type="submit">
                            Войти
                        </Button>
                        <div>Нет аккаунта? <Link to="/signup">Зарегистрирутесь!</Link></div>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Login