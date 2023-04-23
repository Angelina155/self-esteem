import { observer } from 'mobx-react-lite'
import {Button, Dropdown, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, {useContext, useEffect, useState} from "react";
import RangeSlider from "react-bootstrap-range-slider";

import {AppContext} from "../../components/AppContext";
import {createItem} from "../../http/itemAPI";
import '../../styles/App.css'
import ItemFormField from "../../pages/ItemFormField";
import MarkSlider from "../../pages/MarkSlider";

const CreateNote = ({show, onHide, func, initialNote, buttonName}) => {
    const { item, user } = useContext(AppContext)
    const [note, setNote] = useState(initialNote/*{title: initialNote.title, a: initialNote.a, b: initialNote.b, c: initialNote.c, b1: initialNote.b1, c1: initialNote.c1, state_before: initialNote.state_before, state_after: initialNote.state_after, categoryId: initialNote.categoryId}*/)
    const [catName, setCatName] = useState(initialNote.categoryName)

    /*const [show, setShow] = useState(false), handleClose = () => setShow(false), handleShow = () => setShow(true);*/

    const changeCategory = (selectedCategory) => {

        setCatName(selectedCategory.name)
        /*setNote({...note, categoryName: selectedCategory.name})*/
        setNote({...note, categoryId: selectedCategory.id})
        console.log(selectedCategory.name, catName, note.categoryId)
        /*setCategory(category.name)*/
        item.setSelectedCategory(selectedCategory)
    }

    const addNewNote = (e) => {
        e.preventDefault()
        console.log(note.id)
        /*const newNote = {
            ...note, id: Date.now(), createdAt: new Date().toLocaleString().replace(',', 'T').replaceAll('.', '-')
        }*/
        func(note)
        onHide()
    }

    return (
        <div>
            {/*<Button
                variant="outline-primary"
                onClick={handleShow}>
                Добавить новую запись
            </Button>*/}
            <Modal show={show} onHide={onHide} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавьте новую запись</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: "100%"}}>
                    <Form className="d-flex flex-column" style={{width: "100%"}}>
                        {/*<Form.Control
                            value={note.title}
                            onChange={e => setNote({...note, title: e.target.value})}
                            placeholder={"Введите заголовок"}/>*/}
                        <ItemFormField value={note.title} func={(field) => setNote({...note, title: field})} placeholder="Введите заголовок"/>
                        <ItemFormField value={note.a} func={(field) => setNote({...note, a: field})} placeholder="Что случилось?"/>
                        <ItemFormField value={note.b} func={(field) => setNote({...note, b: field})} placeholder="Как Вы отреагировали?"/>
                        <ItemFormField value={note.c} func={(field) => setNote({...note, c: field})} placeholder="Что привело именно к такой реакции?"/>
                        <ItemFormField value={note.b1} func={(field) => setNote({...note, b1: field})} placeholder="Как бы Вы хотели отреагировать на ситуацию?"/>
                        <ItemFormField value={note.c1} func={(field) => setNote({...note, c1: field})} placeholder="Что нужно сделать, чтобы получить желаемую реакцию?"/>
                        {/*<Form.Control
                            value={note.a}
                            onChange={e => setNote({...note, a: e.target.value})}
                            placeholder={"Что случилось?"}/>
                        <Form.Control
                            value={note.b}
                            onChange={e => setNote({...note, b: e.target.value})}
                            placeholder={"Как Вы отреагировали?"}/>
                        <Form.Control
                            value={note.c}
                            onChange={e => setNote({...note, c: e.target.value})}
                            placeholder={"Что привело именно к такой реакции?"}/>
                        <Form.Control
                            value={note.b1}
                            onChange={e => setNote({...note, b1: e.target.value})}
                            placeholder={"Как бы Вы хотели отреагировать на ситуацию?"}/>
                        <Form.Control
                            value={note.c1}
                            onChange={e => setNote({...note, c1: e.target.value})}
                            placeholder={"Что нужно сделать, чтобы получить желаемую реакцию?"}/>*/}

                        {/**/}
                        <Dropdown>
                            <Dropdown.Toggle>{catName}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {item.categories.map(category =>
                                    <Dropdown.Item
                                        onClick={e => changeCategory(category)}
                                        key={category.id}>
                                        {category.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="d-flex flex-row mt-3" style={{justifyContent: "space-around", width: "100%"}}>
                            <div style={{width: "45%"}}>
                                <Form.Label style={{marginTop: "10px", textAlign: "center"}}>Уровень самооценки до события</Form.Label>
                                <MarkSlider value={note.state_before} func={(field) => setNote({...note, state_before: field})}/>
                                {/*<RangeSlider
                                    value={note.state_before}
                                    onChange={e => setNote({...note, state_before: Number(e.target.value)})}
                                    min={-10} max={10}
                                />*/}
                            </div>
                            <div style={{width: "45%"}}>
                                <Form.Label style={{marginTop: "10px", textAlign: "center"}}>Уровень самооценки после события</Form.Label>
                                <MarkSlider value={note.state_after} func={(field) => setNote({...note, state_after: field})}/>
                                {/*<MarkSlider value={stateAfter} func={addStateAfter}/>*/}
                                {/*<RangeSlider
                                    value={note.state_after}
                                    onChange={e => setNote({...note, state_after: Number(e.target.value)})}
                                    min={-10} max={10}
                                />*/}
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addNewNote}>{buttonName}</Button>
                    {/*<Button variant="primary" onClick={addItem}>Добавить</Button>*/}
                    <Button variant="secondary" onClick={onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateNote;