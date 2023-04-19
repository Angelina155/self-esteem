import { observer } from 'mobx-react-lite'
import {Button, Card, Col, Nav, Row} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from "react-bootstrap/Tabs";
import React, {useContext, useEffect, useState} from "react";

import {AppContext} from "../components/AppContext";
import {getCategories, getItems} from "../http/itemAPI";

import NoteEditButtons from "./NoteEditButtons";

const DiaryList = observer((props) => {
    const notes = props.notes
    console.log(notes)
    const { item } = useContext(AppContext); /*изменить на категории*/

    return (
        <Tab.Container className="p-4" id="left-tabs-example" defaultActiveKey="first">
            {notes.length ?
                (
                    <Row className="mt-3 p-4">
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                {notes.map(note =>
                                    <Nav.Item  style={{cursor: 'pointer'}} key={note.id}>
                                        <Nav.Link eventKey={note.id}>{note.title.length ?(note.title):("Без названия")}</Nav.Link>
                                    </Nav.Item>
                                )}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                {notes.map(note =>
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

                                        <div style={{justifyContent: "end", width: "100%"}}>
                                            <Button>Изменить</Button>
                                            <Button
                                                onClick={() => props.delete(note)}
                                                style={{backgroundColor: "red"}}>
                                                Удалить
                                            </Button>
                                        </div>
                                    </Tab.Pane>
                                )}
                            </Tab.Content>
                        </Col>
                    </Row>
                ) : (<p>Нет записей</p>)
            }

        </Tab.Container>
    );
});
export default DiaryList