import React from 'react';
import {CloseButton, Col, Row} from "react-bootstrap";
import MarkSlider from "./MarkSlider";

const MethodOneField = ({mark, addMarkValue, title}) => {
    return (
        <Row style={{width: "80%", margin: "auto"}}>
            <Col style={{textAlign: "center", fontWeight: "bold"}}>{title}</Col>
            <Col><MarkSlider value={mark} func={addMarkValue} min={1} max={13} step={1}/></Col>
            {/*<Col><CloseButton/></Col>*/}
        </Row>
    );
};

export default MethodOneField;