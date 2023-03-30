import { AppContext } from "../AppContext"
import { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import {fetchAllCustomizedMaterials, fetchOneMaterial} from "../../http/materialAPI";

const FetchCustomizedMaterials = (props) => {
    const { custom } = useContext(AppContext)
    const { store } = useContext(AppContext)
    const { user } = useContext(AppContext)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        console.log(store.customized_materials.map(item => item.materialId))
        const arr = store.customized_materials.map(item => item.materialId)
        custom.materials  = []
        arr.forEach(item => fetchOneMaterial(item).then(r => custom.materials.push(r)).finally(
            () => setFetching(false)
        ))
    }, [])

    if (fetching) {
        return <Spinner animation="border" variant="light" />
    }

    return props.children
}

export default FetchCustomizedMaterials