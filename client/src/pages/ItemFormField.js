import { observer } from 'mobx-react-lite'
import {  Form} from "react-bootstrap";
import React from "react";


const ItemFormField = observer((attributes) => {

    return (
        <Form.Control
            value={attributes.value}
            onChange={e => attributes.func(e.target.value)}
            className="mt-3"
            placeholder={attributes.placeholder}
            style={{width: "100%"}}/>
    );
});

export default ItemFormField