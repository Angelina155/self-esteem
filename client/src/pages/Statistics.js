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
import {getCategories, getItems, getMarks} from "../http/itemAPI";
import Stability from "./Stability";
import LevelPlot from "./LevelPlot";
import DiaryList from "./DiaryList";


const Statistics = observer(() => {
    const { item, user } = useContext(AppContext);
    const [marks, setMarks] = useState([])
    const [isFetching, setIsFetching] = useState(false)


    useEffect(() => {
        fetchMarks()
    }, [])

    async function fetchMarks() {
        setIsFetching(true)
        const data = await getMarks(user.id)
        setMarks(data.rows)
        setIsFetching(false)
    }

    return (
        <Container>
            {isFetching
                ? <Spinner animation="border" role="status"/>
                : marks.length > 1 ? (
                        <div>
                            <Stability marks={marks.map(p => p.mark)}/>
                            <LevelPlot marks = {marks}/>
                        </div>
                    ) : (
                        <h3>Для отслеживания прогресса необходимо пройти диагностику хотя бы два раза</h3>
                    )
            }
        </Container>
    );
});

export default Statistics
