import {Card, Col, Spinner} from 'react-bootstrap'
import {useNavigate} from "react-router";
import {useState} from "react";
import {getOneCategory} from "../../http/itemAPI";

const MaterialsItem = ({data}) => {
    const navigate = useNavigate()
    const [category, setCategory] = useState(null)
    if (!category) {
        getOneCategory(data.categoryId).then(r => setCategory(r))
        return <Spinner animation="border" />
    }

    return (
        <Col xl={4} lg={5} sm={4} className="mt-3" onClick={() => navigate(`/materials/${data.id}`)}>
            <Card className="bg-secondary text-white" style={{width: '100%', cursor: 'pointer'}}>
                <Card.Img variant="top" src={'http://localhost:5010/' + data.preview} />
                <Card.ImgOverlay>
                    <Card.Title >{data.title}</Card.Title>
                </Card.ImgOverlay>
                <Card.Body style={{height: 100, overflow: 'hidden'}}>
                    <p>{category.name}</p>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MaterialsItem