import { observer } from 'mobx-react-lite'
import {Button, Card, Col} from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";
import React, {useContext, useState} from "react";
import {AppContext} from "../components/AppContext";
import ButtonGroup from "react-bootstrap/ButtonGroup";


const DiaryItem = observer(({note, deleteNote}) => {
    const { item } = useContext(AppContext); /*изменить на категории*/

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false)

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
                    <Card.Title>{item.categories.find(cat => cat.id === note.categoryId) ? item.categories.find(cat => cat.id === note.categoryId).name : "категория не определена"}</Card.Title>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <p>Самооценка до события: {note.state_before}</p>
                    <p>Самооценка после события: {note.state_after}</p>
                    <p>Дата создания: {note.createdAt.split("T")[0].split('-')[2]+"."+note.createdAt.split("T")[0].split('-')[1]+'.'+note.createdAt.split("T")[0].split('-')[0]}</p>
                </Card.Footer>
            </Card>

            <ButtonGroup style={{justifyContent: "end", width: "100%"}}>
                <Button>Изменить</Button>
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
                <DeleteConfirmation show={deleteConfirmationVisible} onHide={() => setDeleteConfirmationVisible(false)} deleteNote={deleteNote} note={note}/>
            </ButtonGroup>
        </Tab.Pane>
    );
});

export default DiaryItem