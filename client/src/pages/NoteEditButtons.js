import React from 'react';
import {Button} from "react-bootstrap";

const NoteEditButtons = () => {
    return (
        <div>
            <Button>Изменить</Button>
            <Button style={{backgroundColor: "yellow"}}>Удалить</Button>
        </div>
    );
};

export default NoteEditButtons;