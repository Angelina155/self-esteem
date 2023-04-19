import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";

const DeleteConfirmation = ({show, onHide, deleteNote, note}) => {
    const removeNote = () => {
        console.log("delete")
        deleteNote(note)
        onHide()
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить запись {note.title}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={removeNote}>Удалить</Button>
                    <Button variant="secondary" onClick={onHide}>Отмена</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteConfirmation;