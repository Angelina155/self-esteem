import { observer } from 'mobx-react-lite'
import {Button, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useContext, useState } from "react";

import { createMark } from "../http/itemAPI";

import { AppContext } from "../components/AppContext";
import MarkSlider from "./MarkSlider";

const MarkForm = observer(() => {
    const { user } = useContext(AppContext);
    const [mark, setMark ] = useState(0);
    const [showM, setShowM] = useState(false);
    const handleCloseM = () => setShowM(false);
    const handleShowM = () => setShowM(true);
    const addMarkValue = (mark) => setMark(mark);
    const addMark = () => {
        const formData = new FormData()
        formData.append('mark', `${mark}`)
        formData.append('userId', user.id)
        createMark(formData).then(handleCloseM())
    }

    return (
        <div>
            <Button
                variant="outline-secondary"
                onClick={handleShowM}>
                Добавить новую оценку
            </Button>

            <Modal show={showM} onHide={handleCloseM} animation={false}>
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
                    <Button variant="secondary" onClick={handleCloseM}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
});

export default MarkForm