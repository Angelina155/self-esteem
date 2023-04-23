import { observer } from 'mobx-react-lite'
import {Button, Card, Col} from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";
import React, {useContext, useState} from "react";
import {AppContext} from "../components/AppContext";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CreateNote from "../components/modals/CreateNote";
import {createItem} from "../http/itemAPI";


const DiaryItem = observer(({note, deleteNote, editNote}) => {
    const { item, user } = useContext(AppContext); /*изменить на категории*/

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false)
    const [noteEditVisible, setNoteEditVisible] = useState(false)

    const categoryName = item.categories.find(cat => cat.id === note.categoryId) ? item.categories.find(cat => cat.id === note.categoryId).name : "категория не определена"

    return (
        <Tab.Pane eventKey={note.id} key={note.id}>

            <Tabs defaultActiveKey="a" className="mb-3">
                <Tab eventKey="a" title="A" style={{paddingLeft: 10}}>{note.a.length ?(note.a):(<p>Вы еще не заполнили это поле</p>)}</Tab>
                <Tab eventKey="b" title="B">{note.b.length ?(note.b):(<p>Вы еще не заполнили это поле</p>)}</Tab>
                <Tab eventKey="c" title="C">{note.c.length ?(note.c):(<p>Вы еще не заполнили это поле</p>)}</Tab>
                <Tab eventKey="b1" title="B1">{note.b1.length ?(note.b1):(<p>Вы еще не заполнили это поле</p>)}</Tab>
                <Tab eventKey="c1" title="C1">{note.c1.length ?(note.c1):(<p>Вы еще не заполнили это поле</p>)}</Tab>

            </Tabs>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{categoryName}</Card.Title>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <p>Самооценка до события: {note.state_before}</p>
                    <p>Самооценка после события: {note.state_after}</p>
                    <p>Дата создания: {note.createdAt.split("T")[0].split('-')[2]+"."+note.createdAt.split("T")[0].split('-')[1]+'.'+note.createdAt.split("T")[0].split('-')[0]}</p>
                </Card.Footer>
            </Card>

            <ButtonGroup style={{justifyContent: "end", width: "100%"}}>
                {/*<Button>Изменить</Button>*/}
                <Button
                    variant="outline-primary"
                    onClick={() => setNoteEditVisible(true)}>
                    Редактировать
                </Button>
                <CreateNote show={noteEditVisible} onHide={() => setNoteEditVisible(false)} func={editNote} initialNote={{id: note.id, title: note.title, a: note.a, b: note.b, c: note.c, b1: note.b1, c1: note.c1, state_before: note.state_before, state_after: note.state_after, categoryId: note.categoryId, categoryName: categoryName, createdAt: note.createdAt}} buttonName={"Изменить"}/>
                {/*<Button
                                                onClick={() => props.delete(note)}
                                                style={{backgroundColor: "red"}}>
                                                Удалить
                                            </Button>*/}
                <Button
                    variant="outline-primary"
                    onClick={() => setDeleteConfirmationVisible(true)}>
                    Удалить
                </Button>
                <DeleteConfirmation show={deleteConfirmationVisible} onHide={() => setDeleteConfirmationVisible(false)} deleteNote={deleteNote} note={note} />
            </ButtonGroup>
        </Tab.Pane>
    );
});

export default DiaryItem