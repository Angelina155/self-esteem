import { observer } from 'mobx-react-lite'
import {Card, Col, Nav, Row} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from "react-bootstrap/Tabs";
import React, {useContext, useEffect, useState} from "react";

import {AppContext} from "../components/AppContext";
import {getCategories, getItems} from "../http/itemAPI";

const DiaryList = observer(() => {

    const { item } = useContext(AppContext);
    /*const [notes, setNotes] = useState([...item.items])
    console.log(notes.length)*/


    return (
        <Tab.Container className="p-4" id="left-tabs-example" defaultActiveKey="first">
            <Row className="mt-3 p-4">
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                    {item.items.map(it =>
                        <Nav.Item  style={{cursor: 'pointer'}} key={it.id}>
                            <Nav.Link eventKey={it.id}>{it.title.length ?(it.title):("Без названия")}</Nav.Link>
                        </Nav.Item>
                    )}
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                    {item.items.map(it =>
                        <Tab.Pane eventKey={it.id} key={it.id}>

                            <Tabs defaultActiveKey="a" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="a" title="A" style={{paddingLeft: 10}}>{it.a.length ?(it.a):(<p>Вы еще не заполнили это поле</p>)}</Tab>
                                <Tab eventKey="b" title="B">{it.b.length ?(it.b):(<p>Вы еще не заполнили это поле</p>)}</Tab>
                                <Tab eventKey="c" title="C">{it.c.length ?(it.c):(<p>Вы еще не заполнили это поле</p>)}</Tab>
                                <Tab eventKey="b1" title="B1">{it.b1.length ?(it.b1):(<p>Вы еще не заполнили это поле</p>)}</Tab>
                                <Tab eventKey="c1" title="C1">{it.c1.length ?(it.c1):(<p>Вы еще не заполнили это поле</p>)}</Tab>
                            </Tabs>
                            <Card className="text-center">
                                <Card.Body>
                                    <Card.Title>{item.categories.find(cat => cat.id === it.categoryId) ? item.categories.find(cat => cat.id === it.categoryId).name : "категория не определена"}</Card.Title>
                                    </Card.Body>
                                <Card.Footer className="text-muted">
                                    <p>Самооценка до события: {it.state_before}</p>
                                    <p>Самооценка после события: {it.state_after}</p>
                                    <p>Дата создания: {it.createdAt.split("T")[0].split('-')[2]+"."+it.createdAt.split("T")[0].split('-')[1]+'.'+it.createdAt.split("T")[0].split('-')[0]}</p>
                                </Card.Footer>
                            </Card>
                        </Tab.Pane>
                    )}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
});
export default DiaryList