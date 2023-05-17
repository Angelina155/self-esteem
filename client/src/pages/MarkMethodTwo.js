import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import MarkSlider from "./MarkSlider";
import MethodTwoField from "./MethodTwoField";
import MethodOneField from "./MethodOneField";

const MarkMethodTwo = ({navFunc, addResultMark, initMarks, addNewMarks, initGoals, addNewGoals}) => {
    const [marks, setMarks] = useState({intellect: initMarks.intellect, character: initMarks.character, authority: initMarks.authority, skillful: initMarks.skillful, appearance: initMarks.appearance, confidence: initMarks.confidence})
    const [goals, setGoals] = useState({intellect: initGoals.intellect, character: initGoals.character, authority: initGoals.authority, skillful: initGoals.skillful, appearance: initGoals.appearance, confidence: initGoals.confidence})

    const prev = () => {
        navFunc()
        addNewMarks(marks)
        addNewGoals(goals)

        /*addMark(Object.values(marks).reduce((a, b) => a+b, 0) / 6)*/
        /*console.log(marks)*/
        /*addMarkValue(mark)*/
        /*addMarkValue(marks.reduce((a, b) => a + b, 0) / marks.length)
        console.log(marks.reduce((a, b) => a + b, 0) / marks.length)*/
    }

    const send = () => {
        addNewMarks(marks)
        addNewGoals(goals)
        console.log(marks)
        addResultMark(marks)
    }

    return (
        <Container>
            <div>
                <p style={{marginBottom: "4px"}}>Вам представлено шесть качеств.  Для каждого качества представленно две шкалы - уровень разивития этого качества от 0 до 100.</p>
                <p style={{marginBottom: "4px"}}>На шкале "Уровень развития качества" отметьте, как вы оцениваете развитие у себя этого качества.</p>
                <p style={{marginBottom: "20px"}}>На шкале "Уровень притязаний" отметьте, при каком уровне развития этого качества Вы были бы удовлетворены собой или почувствовали гордость за себя.</p>
            </div>
            <MethodTwoField mark={marks.intellect} goal={goals.intellect} addMarkValue={(mark) => setMarks({...marks, intellect: mark})} addGoalValue={(goal) => setGoals({...goals, intellect: goal})} title={"Ум, способности"}/>
            <MethodTwoField mark={marks.character} goal={goals.character} addMarkValue={(mark) => setMarks({...marks, character: mark})}  addGoalValue={(goal) => setGoals({...goals, character: goal})} title={"Характер"}/>
            <MethodTwoField mark={marks.authority} goal={goals.authority} addMarkValue={(mark) => setMarks({...marks, authority: mark})} addGoalValue={(goal) => setGoals({...goals, authority: goal})} title={"Авторитет у сверстников"}/>
            <MethodTwoField mark={marks.skillful} goal={goals.skillful} addMarkValue={(mark) => setMarks({...marks, skillful: mark})} addGoalValue={(goal) => setGoals({...goals, skillful: goal})} title={"Умение многое делать своими руками, золотые руки"}/>
            <MethodTwoField mark={marks.appearance} goal={goals.appearance} addMarkValue={(mark) => setMarks({...marks, appearance: mark})} addGoalValue={(goal) => setGoals({...goals, appearance: goal})} title={"Внешность"}/>
            <MethodTwoField mark={marks.confidence} goal={goals.confidence} addMarkValue={(mark) => setMarks({...marks, confidence: mark})} addGoalValue={(goal) => setGoals({...goals, confidence: goal})} title={"Уверенность в себе"}/>

            <Button onClick={prev}>Назад</Button>
            <Button style={{float: "right"}} variant="primary" onClick={send} >Готово</Button>
        </Container>
    );
};

export default MarkMethodTwo;