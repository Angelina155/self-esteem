import { observer } from 'mobx-react-lite'
import {Button, Dropdown, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, {useContext, useEffect, useState} from "react";

import {AppContext} from "../components/AppContext";

import {createItem, getCategories, getItems} from "../http/itemAPI";

import RangeSlider from "react-bootstrap-range-slider";
import '../styles/App.css'
import ItemFormField from "./ItemFormField";
import MarkSlider from "./MarkSlider";



const ItemForm = observer(({create}) => {
    const { item, user } = useContext(AppContext)
    const [note, setNote] = useState({title: '', a: '', b: '', c: '', b1: '', c1: '', state_before: 0, state_after: 0, categoryId: 0})
    const [catName, setCatName] = useState("Выберите категорию")
    const [show, setShow] = useState(false), handleClose = () => setShow(false), handleShow = () => setShow(true);

    const changeCategory = (selectedCategory) => {

        setCatName(selectedCategory.name)
        /*setNote({...note, categoryName: selectedCategory.name})*/
        setNote({...note, categoryId: selectedCategory.id})
        console.log(selectedCategory.name, catName, note.categoryId)
        /*setCategory(category.name)*/
        item.setSelectedCategory(selectedCategory)

    }
    /*const addStateBefore = (stateBefore) => setStateBefore(stateBefore);*/
    /*const addStateAfter = (stateAfter) => setStateAfter(stateAfter);*/


    const addNewNote = (e) => {
        e.preventDefault()
        const newNote = {
            ...note, id: Date.now(), createdAt: new Date().toLocaleString().replace(',', 'T').replaceAll('.', '-')
        }
        create(newNote)

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

        createItem(formData).then(handleClose())
    }

    return (
        <div>
            {/*<Button
                variant="outline-primary"
                onClick={handleShow}>
                Добавить новую запись
            </Button>*/}
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавьте новую запись</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: "100%"}}>
                    <Form className="d-flex flex-column" style={{width: "100%"}}>
                        <ItemFormField value={title} func={(e) => setNote({...note, title: e.target.value})} placeholder="Введите заголовок"/>
                        <ItemFormField value={a} func={(e) => setNote({...note, a: e.target.value})} placeholder="Что случилось?"/>
                        <ItemFormField value={b} func={(e) => setNote({...note, b: e.target.value})} placeholder="Как Вы отреагировали?"/>
                        <ItemFormField value={c} func={(e) => setNote({...note, c: e.target.value})} placeholder="Что привело именно к такой реакции?"/>
                        <ItemFormField value={b1} func={(e) => setNote({...note, b1: e.target.value})} placeholder="Как бы Вы хотели отреагировать на ситуацию?"/>
                        <ItemFormField value={c1} func={(e) => setNote({...note, c1: e.target.value})} placeholder="Что нужно сделать, чтобы получить желаемую реакцию?"/>
                        {/*<Form.Control
                            value={note.title}
                            onChange={e => setNote({...note, title: e.target.value})}
                            placeholder={"Введите заголовок"}/>
                        <Form.Control
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
                                {/*<RangeSlider
                                    value={note.state_before}
                                    onChange={e => setNote({...note, state_before: Number(e.target.value)})}
                                    min={-10} max={10}
                                />*/}
                            </div>
                            <div style={{width: "45%"}}>
                                <Form.Label style={{marginTop: "10px", textAlign: "center"}}>Уровень самооценки после события</Form.Label>
                                <MarkSlider value={stateAfter} func={(e) => setNote({...note, state_after: Number(e.target.value)})}/>
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
                    <Button variant="secondary" onClick={addNewNote}>Добавить</Button>
                    {/*<Button variant="primary" onClick={addItem}>Добавить</Button>*/}
                    <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default ItemForm