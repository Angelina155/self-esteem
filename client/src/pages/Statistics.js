import {Card, Container, Spinner} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ListGroup } from "react-bootstrap";
import Plot from 'react-plotly.js';
import {autosize} from "plotly.js/src/plots/layout_attributes";
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from '../components/AppContext';
import {getMarks} from "../http/itemAPI";


const Statistics = observer(() => {
    const { item, user } = useContext(AppContext);
    useEffect(() => {
        getMarks(user.id).then(data => item.setMarks(data.rows))

    }, [])

    if(!item.marks.length) {
        return <Spinner animation="border" variant="light" />
    }

    const CalculateRMS = (arr) => Math.sqrt(
        arr
            .map( val => (val * val))
            .reduce((acum, val) => acum + val)
        /arr.length
    )
    const arr = []
    console.log(item.marks.map(x => arr.push(x.mark)))
    const rms = CalculateRMS(arr)
    console.log(rms)
    let stability
    switch (true) {
        case (rms > 8):
            stability = "Очень низкий"
            break;
        case (rms > 6):
            stability = "Низкий"
            break;
        case (rms > 3.5):
            stability = "Средний"
            break;
        case (rms > 1.5):
            stability = "Высокий"
            break;
        default:
            stability = "Очень высокий"
            break;
    }



    return (
        <Container>
            {item.marks.length ? (
                <>
                    <h3>Уровень стабильности самооценки: {stability}</h3>
                    <Plot
                        data={[
                            {

                                x: item.marks.map(p => p.createdAt),
                                y: item.marks.map(p => p.mark),
                                type: 'scatter',
                                mode: 'line',
                                marker: {color: 'coral'},
                            },
                        ]}
                        layout={ {autosize, height: 600} }
                    />
                </>


            ) : (
                <p>Нет записей</p>
            )}
        </Container>
    );
});

export default Statistics
