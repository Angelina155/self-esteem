import React, {useContext, useState} from 'react';
import {AppContext} from "../AppContext";
import {createMark} from "../../http/itemAPI";
import {Button, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import MarkSlider from "../../pages/MarkSlider";

const CreateMark = ({show, onHide}) => {
    const { user } = useContext(AppContext);
    const [mark, setMark ] = useState(0);
    const addMarkValue = (mark) => setMark(mark);
    const addMark = () => {
        const formData = new FormData()
        formData.append('mark', `${mark}`)
        formData.append('userId', user.id)
        createMark(formData).then(onHide())
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавьте новую оценку</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: "100%"}}>
                    <Form className="d-flex flex-column" style={{width: "100%"}}>
                        <MarkSlider value={mark} func={addMarkValue}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addMark}>Добавить</Button>
                    <Button variant="secondary" onClick={onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateMark;