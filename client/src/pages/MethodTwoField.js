import React from 'react';
import {Col, Row} from "react-bootstrap";
import MarkSlider from "./MarkSlider";

const MethodTwoField = ({mark, goal, addMarkValue, addGoalValue, title}) => {
    return (
        <div>
            <p style={{textAlign: "center", fontWeight: "bold"}}>{title}</p>
            <Row>
                <Col>
                    <div style={{textAlign: "center"}}>Уровень развития качетва</div>
                    <Col><MarkSlider value={mark} func={addMarkValue} min={0} max={100} step={0.5}/></Col>
                </Col>
                <Col>
                    <div style={{textAlign: "center"}}>Уровень приитязаний</div>
                    <Col><MarkSlider value={goal} func={addGoalValue} min={0} max={100} step={0.5}/></Col>
                </Col>
            </Row>
        </div>
    );
};

export default MethodTwoField;