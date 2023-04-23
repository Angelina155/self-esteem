import { observer } from 'mobx-react-lite'
import {Button, Card, Col, Nav, Row} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from "react-bootstrap/Tabs";
import React, {useContext, useEffect, useState} from "react";

import {AppContext} from "../components/AppContext";
import {getCategories, getItems} from "../http/itemAPI";

import NoteEditButtons from "./NoteEditButtons";
import CreateMark from "../components/modals/CreateMark";
import DeleteConfirmation from "../components/modals/DeleteConfirmation";
import "../styles/App.css"
import DiaryItem from "./DiaryItem";

const DiaryList = observer(({notes, deleteNote, editNote}) => {
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
                                    <DiaryItem key={note.id} note={note} deleteNote={deleteNote} editNote={editNote}/>
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