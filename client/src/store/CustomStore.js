import { makeAutoObservable } from 'mobx'

class CustomStore {
    _materials = []



    constructor() {
        makeAutoObservable(this)
    }

    get materials() {
        return this._materials
    }


    set materials(materials) {
        this._materials = materials
    }




}

export default CustomStore