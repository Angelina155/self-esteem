import { makeAutoObservable } from 'mobx'

class MaterialStore {
    _materials = []
    _customized_materials = []



    constructor() {
        makeAutoObservable(this)
    }

    get materials() {
        return this._materials
    }



    get customized_materials() {
        return this._customized_materials
    }


    set materials(materials) {
        this._materials = materials
    }

    set customized_materials(customized_materials) {
        this._customized_materials = customized_materials
    }

}

export default MaterialStore