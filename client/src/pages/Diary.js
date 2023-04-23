import {Row, Container, Spinner, Button} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from "react-bootstrap/Card";
import { observer } from 'mobx-react-lite'
import React, {useContext, useEffect, useState} from "react";

import { AppContext } from '../components/AppContext';
import DiaryList from "./DiaryList";
import {getCategories, getItems, deleteItem, createItem, updateItem} from "../http/itemAPI";
import CreateNote from "../components/modals/CreateNote";
import CreateMark from "../components/modals/CreateMark";

const Diary = observer(() => {
    const { item, user } = useContext(AppContext);
    const [notes, setNotes] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [noteCreationVisible, setNoteCreationVisible] = useState(false)
    const [markCreationVisible, setMarkCreationVisible] = useState(false)

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

    const createBody = (newNote) => {
        const formData = new FormData()
        formData.append('title', newNote.title)
        formData.append('a', newNote.a)
        formData.append('b', newNote.b)
        formData.append('c', newNote.c)
        formData.append('b1', newNote.b1)
        formData.append('c1', newNote.c1)
        formData.append('state_before', `${newNote.state_before}`)
        formData.append('state_after', `${newNote.state_after}`)
        formData.append('categoryId', item.selectedCategory.id)
        formData.append('userId', user.id)

        return formData
    }

    const createNote = (newNote) => {
        createItem(createBody(newNote)).then(() => setNotes([...notes, newNote]), () => alert("Ошибка добавления записи!"))
    }

    const deleteNote = (note) => {
        deleteItem(note.id).then(() => setNotes(notes.filter(n => n.id !== note.id)), () => alert("Ошибка удаления! Обновите страницу и попбробуйте снова"))
    }

    const editNote = (editedNote) => {
       updateItem(editedNote.id, createBody(editedNote)).then(() => setNotes(notes.map(n => n.id === editedNote.id ? editedNote : n)), () => alert("Ошибка добавления записи!"))

        console.log(editedNote)
    }

    return (
        <Container>
            <div className="d-flex flex-column">
                <Card className=" mt-4 ">
                    <Card.Header>
                        <Row className="d-flex justify-content-between p-2">
                            <h3>Все записи </h3>
                            <ButtonGroup style={{width: "50%"}}>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => setNoteCreationVisible(true)}>
                                    Добавить новую запись
                                </Button>
                                <CreateNote show={noteCreationVisible} onHide={() => setNoteCreationVisible(false)} func={createNote} initialNote={{id: 0, title: "", a: "", b: "", c: "", b1: "", c1: "", state_before: 0, state_after: 0, categoryId: 0, categoryName: "Выберите категорию", createdAt: new Date().toLocaleString().replace(',', 'T').replaceAll('.', '-')}} buttonName={"Добавить"}/>
                                {/*<ItemForm create={createNote}/>*/}
                                <Button
                                    variant="outline-primary"
                                    onClick={() => setMarkCreationVisible(true)}>
                                    Определить уровень самооценки
                                </Button>
                                <CreateMark show={markCreationVisible} onHide={() => setMarkCreationVisible(false)}/>
                                {/*<MarkForm/>*/}
                            </ButtonGroup>
                        </Row>
                    </Card.Header>
                    {isFetching
                        ? <Spinner animation="border" role="status"/>
                        : <DiaryList notes={notes} deleteNote={deleteNote} editNote={editNote}/>
                    }

                </Card>
            </div>
        </Container>
    );
});

export default Diary