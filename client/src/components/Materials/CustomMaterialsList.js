import { useContext } from 'react'
import { Row } from 'react-bootstrap'
import MaterialsItem from './MaterialsItem'
import {AppContext} from "../AppContext";
import {observer} from "mobx-react-lite";

const CustomMaterialsList = observer(() => {

    const { custom } = useContext(AppContext)

    return (
        <Row className="d-flex p-4 mt-4">
            {custom.materials.map(item =>
                <MaterialsItem key={item.id} data={item}/>
            )}
        </Row>
    );
})

export default CustomMaterialsList