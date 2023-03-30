import {Container, Row, Col, Button, Image, Spinner, Card} from 'react-bootstrap'
import {useContext, useEffect, useState} from 'react'

import { useParams } from 'react-router-dom'
import {fetchOneMaterial} from "../http/materialAPI";
import {AppContext} from "../components/AppContext";
import {getOneCategory} from "../http/itemAPI";


const OneMaterial = () => {
    const { id } = useParams()
    const { item } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const [category, setCategory] = useState(null)

    useEffect(() => {
        fetchOneMaterial(id).then(data => setProduct(data))
        //getOneCategory(product.categoryId).then(data => setCategory(data))
    }, [id])

    if (!product) {
        return <Spinner animation="border" />
    }

    if (!category) {
        getOneCategory(product.categoryId).then(data => setCategory(data))
        return <Spinner animation="border" />
    }

    return (
        <Container className="p-4 mt-4 ">
            <Card style={{width: '100%'}}>
                <Card.Img height={300} variant="top" src={'http://localhost:5010/' + product.preview} />
                <Card.Body style={{height: '100%', overflow: 'hidden'}}>
                    <h1>{product.title}</h1>
                    <h5>Категория: {category.name}</h5>
                    <p>{product.info}</p>
                    <p>Ссылка: {product.link}</p>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default OneMaterial