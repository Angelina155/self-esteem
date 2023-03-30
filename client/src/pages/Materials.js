import {Container, Row, Col, Card, Button, ListGroup} from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import {logout} from "../http/userAPI";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../components/AppContext";
import {fetchAllCustomizedMaterials, fetchAllMaterials, fetchOneMaterial} from "../http/materialAPI";
import {forEach} from "react-bootstrap/ElementChildren";
import MaterialsList from "../components/Materials/MaterialsList";
import MaterialsItem from "../components/Materials/MaterialsItem";
import FetchCustomizedMaterials from "../components/HOC/FetchCustomizedMaterials";
import CustomMaterialsList from "../components/Materials/CustomMaterialsList";


const Materials = observer(() => {

        const { user } = useContext(AppContext)
        const { store } = useContext(AppContext)
        const { custom } = useContext(AppContext)
        const [fetching, setFetching] = useState(false)


        useEffect(() => {
            fetchAllMaterials(user.id).then(r => store.materials = r)
            fetchAllCustomizedMaterials(user.id).then(r => store.customized_materials = r)
        }, [])

        const handleFetch = (event) => {
            fetchAllCustomizedMaterials(user.id).then(r => store.customized_materials = r)
            console.log(store.customized_materials.map(item => item.materialId))
            const arr = store.customized_materials.map(item => item.materialId)
            custom.materials  = []
            arr.forEach(item => fetchOneMaterial(item).then(r => custom.materials.push(r)).finally(() => setFetching(true)))
        }

        const handleFetchAll = (event) => {
            fetchAllMaterials(user.id).then(r => store.materials = r).finally(() => setFetching(false))
            console.log(store.materials.map(item =>
                item.id
            ))
        }

        return (
            <Container>
                <Row className="mt-2">
                    <Col md={3}>

                            <ListGroup className="p-4 mt-4 ">
                                <ListGroup.Item  action href="#all" onClick={handleFetchAll} style={{cursor: 'pointer'}}>Все материалы</ListGroup.Item>
                                <ListGroup.Item  action href="#customized" onClick={handleFetch} style={{cursor: 'pointer'}}>Умная лента</ListGroup.Item>
                            </ListGroup>

                    </Col>
                    <Col md={9}>
                            {fetching?(<CustomMaterialsList />):(<MaterialsList />)}
                    </Col>
                </Row>
            </Container>
        )
    })


export default Materials

/*
{custom? (
                                <MaterialsList data = {custom}/>
                            ) :(
                                <MaterialsList data = {store.materials}/>
                            )}
 */