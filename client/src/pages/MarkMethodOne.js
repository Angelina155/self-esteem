import React, {useState} from 'react';
import {Button, Card, CloseButton, Col, Container, Row} from "react-bootstrap";
import MarkSlider from "./MarkSlider";
import MethodOneField from "./MethodOneField";


const MarkMethodOne = ({navFunc, initMarks, addNewMarks}) => {
    /*const [marks, setMarks] = useState([0, 0, 0, 0, 0])*/
    const [marks, setMarks] = useState({parents: initMarks.parents, friends: initMarks.friends, myself: initMarks.myself, classmates: initMarks.classmates, professors: initMarks.professors})

    {/*const changeMark = (index, mark) => {
        const temp = marks
        temp.splice(index, 1, mark)
        setMarks(temp)
        console.log(marks)
    }*/}

    const next = () => {
        navFunc()
        addNewMarks(marks)
        console.log(marks)
        /*addMark(Object.values(marks).reduce((a, b) => a+b, 0) / 5)*/
        /*console.log(marks)*/
        /*addMarkValue(mark)*/
        /*addMarkValue(marks.reduce((a, b) => a + b, 0) / marks.length)
        console.log(marks.reduce((a, b) => a + b, 0) / marks.length)*/
    }
    return (
        <Container>
            <div>
                <p style={{marginBottom: "4px"}}>Представьте, что существует лестница из тринадцати ступеней. Где первая ступень - низшая, а тринадцатая - высшая.</p>
                <p style={{marginBottom: "4px"}}>Ниже приведен список лиц, предполжите, на какую ступень каждое из них поставило бы Вас.</p>
                <p style={{marginBottom: "20px"}}>Если какие-то из строк не являются для Вас актуальными, просто оставьте номер ступени равным нулю.</p>
            </div>
            <MethodOneField mark={marks.parents} addMarkValue={(mark) => setMarks({...marks, parents: mark})} title={"Родители"}/>
            <MethodOneField mark={marks.friends} addMarkValue={(mark) => setMarks({...marks, friends: mark})} title={"Друзья"}/>
            <MethodOneField mark={marks.myself} addMarkValue={(mark) => setMarks({...marks, myself: mark})} title={"Я"}/>
            <MethodOneField mark={marks.classmates} addMarkValue={(mark) => setMarks({...marks, classmates: mark})} title={"Одногруппники"}/>
            <MethodOneField mark={marks.professors} addMarkValue={(mark) => setMarks({...marks, professors: mark})} title={"Преподаватели"}/>
            {/*<MethodOneField mark={marks} index={0} addMarkValue={(mark) => changeMark(0, mark)} title={"Друзья"}/>
            <MethodOneField mark={marks} index={1} addMarkValue={(mark) => changeMark(1, mark)} title={"Я"}/>
            <MethodOneField mark={marks} index={2} addMarkValue={(mark) => changeMark(2, mark)} title={"Одногруппники"}/>*/}
            <Button style={{float: "right"}} onClick={next}>Далее</Button>
        </Container>
    );
};

export default MarkMethodOne;