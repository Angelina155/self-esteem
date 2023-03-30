import { observer } from 'mobx-react-lite'
import {Button, Dropdown, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, {useContext, useEffect, useState} from "react";

import {AppContext} from "../components/AppContext";
import {createItem, getCategories, getItems} from "../http/itemAPI";
import ItemFormField from "./ItemFormField";
import MarkSlider from "./MarkSlider";


const ItemForm = observer(() => {
    const { item, user } = useContext(AppContext)



/*объединение состояний и колбэков для всех полей*/
    const [title, setTitle] = useState(''), [a, setA] = useState(''), [b, setB] = useState(''), [c, setC] = useState(''), [b1, setB1] = useState(''), [c1, setC1] = useState(''), [stateBefore, setStateBefore] = useState(0), [stateAfter, setStateAfter] = useState(0),  [category, setCategory] = useState('Выберите категорию'),
        addTitle = (title) => {
            setTitle(title)
        }, addA = (a) => {
            setA(a)
        }, addB = (b) => {
            setB(b)
        }, addC = (c) => {
            setC(c)
        }, addB1 = (b1) => {
            setB1(b1)
        }, addC1 = (c1) => {
            setC1(c1)
        }, addItem = () => {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('a', a)
            formData.append('b', b)
            formData.append('c', c)
            formData.append('b1', b1)
            formData.append('c1', c1)
            formData.append('state_before', `${stateBefore}`)
            formData.append('state_after', `${stateAfter}`)
            formData.append('categoryId', item.selectedCategory.id)
            formData.append('userId', user.id)
            createItem(formData).then(handleClose())

        }, [show, setShow] = useState(false), handleClose = () => setShow(false), handleShow = () => setShow(true);

    const changeCategory = (category) => {
        console.log(category)
        setCategory(category.name)
        item.setSelectedCategory(category)
    }
    const addStateBefore = (stateBefore) => setStateBefore(stateBefore);
    const addStateAfter = (stateAfter) => setStateAfter(stateAfter);

    return (
        <div>
            <Button
                variant="outline-primary"
                onClick={handleShow}>
                Добавить новую запись
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавьте новую запись</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: "100%"}}>
                    <Form className="d-flex flex-column" style={{width: "100%"}}>
                        <ItemFormField value={title} func={addTitle} placeholder="Введите заголовок"/>
                        <ItemFormField value={a} func={addA} placeholder="Что случилось?"/>
                        <ItemFormField value={b} func={addB} placeholder="Как Вы отреагировали?"/>
                        <ItemFormField value={c} func={addC} placeholder="Что привело именно к такой реакции?"/>
                        <ItemFormField value={b1} func={addB1} placeholder="Как бы Вы хотели отреагировать на ситуацию?"/>
                        <ItemFormField value={c1} func={addC1} placeholder="Что нужно сделать, чтобы получить желаемую реакцию?"/>
                        <Dropdown
                            className="mt-3"
                            style={{width: "100%"}}>
                            <Dropdown.Toggle>{category}</Dropdown.Toggle>
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
                                <Form.Label style={{textAlign: "center"}}>Уровень самооценки до события</Form.Label>
                                <MarkSlider value={stateBefore} func={addStateBefore}/>
                            </div>
                            <div style={{width: "45%"}}>
                                <Form.Label style={{textAlign: "center"}}>Уровень самооценки после события</Form.Label>
                                <MarkSlider value={stateAfter} func={addStateAfter}/>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addItem}>Добавить</Button>
                    <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default ItemForm