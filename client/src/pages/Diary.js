import {Row, Container, Spinner} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from "react-bootstrap/Card";
import { observer } from 'mobx-react-lite'
import React, {useContext, useEffect, useState} from "react";

import { AppContext } from '../components/AppContext';
import ItemForm from "./ItemForm";
import MarkForm from "./MarkForm";
import DiaryList from "./DiaryList";
import {getCategories, getItems} from "../http/itemAPI";

const Diary = observer(() => {
    const { item, user } = useContext(AppContext);
    const [notes, setNotes] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        fetchNotes()
        getItems(user.id).then(data => item.setItems(data.rows)) /*в случае успешного выполнения запроса на получение - */
        getCategories().then(data => item.setCategories(data))                   /*помещаем в контекст полученные данные*/
    }, [])

    async function fetchNotes() {
        setIsFetching(true)
        const data = await getItems(user.id)
        setNotes(data.rows)
        setIsFetching(false)

    }


    return (
        <Container>
            <div className="d-flex flex-column">
                <Card className=" mt-4 ">
                    <Card.Header>
                        <Row className="d-flex justify-content-between p-2">
                            <h3>Все записи </h3>
                            <ButtonGroup style={{width: "50%"}}>
                                <ItemForm/>
                                <MarkForm/>
                            </ButtonGroup>
                        </Row>
                    </Card.Header>
                    {isFetching
                        ? <Spinner animation="border" role="status"/>
                        : /*{notes.length ?
                                (*/
                                    <DiaryList/>/*notes={notes}*/
                                /*) : (
                                    <p>Нет записей</p>
                                )}*/
                    }

                </Card>
            </div>
        </Container>
    );
});

export default Diary