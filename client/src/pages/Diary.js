import {Row, Container, Spinner} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from "react-bootstrap/Card";
import { observer } from 'mobx-react-lite'
import React, {useContext, useEffect, useState} from "react";

import { AppContext } from '../components/AppContext';
import ItemForm from "./ItemForm";
import MarkForm from "./MarkForm";
import DiaryList from "./DiaryList";
import {getCategories, getItems, deleteItem} from "../http/itemAPI";

const Diary = observer(() => {
    const { item, user } = useContext(AppContext);
    const [notes, setNotes] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        fetchNotes()
        getCategories().then(data => item.setCategories(data))    /*в случае успешного выполнения запроса на получение - */
                                                                    /*помещаем в контекст полученные данные*/
    }, [])

    async function fetchNotes() {
        setIsFetching(true)
        const data = await getItems(user.id)
        setNotes(data.rows)
        setIsFetching(false)
    }

    const createNote = (newNote) => {
        setNotes([...notes, newNote])
    }

    const deleteNote = (note) => {
        deleteItem(user.id, note.id).then(data => setNotes(notes.filter(n => n.id !== note.id)), () => alert("ошибка удаления. Обновите страницу и попбробуйте снова"))
    }

    return (
        <Container>
            <div className="d-flex flex-column">
                <Card className=" mt-4 ">
                    <Card.Header>
                        <Row className="d-flex justify-content-between p-2">
                            <h3>Все записи </h3>
                            <ButtonGroup style={{width: "50%"}}>
                                <ItemForm create={createNote}/>
                                <MarkForm/>
                            </ButtonGroup>
                        </Row>
                    </Card.Header>
                    {isFetching
                        ? <Spinner animation="border" role="status"/>
                        : <DiaryList notes={notes} delete={deleteNote}/>
                    }

                </Card>
            </div>
        </Container>
    );
});

export default Diary