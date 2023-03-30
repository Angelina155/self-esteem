import { makeAutoObservable } from "mobx";

class ItemsStore {
    constructor() {
        this._categories = []
        this._items = []
        this._marks = []
        this._constMarks=[-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        makeAutoObservable(this)
    }

    setCategories(categories) {
        console.log(categories)
        this._categories = categories
    }

    setItems(items) {
        console.log(items)
        this._items = items
    }

    setMarks(marks) {
        console.log(marks)
        this._marks = marks
    }

    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    setSelectedMark(mark) {
        this._selectedMark= mark
    }

    get categories() {
        return this._categories
    }

    get items() {
        return this._items
    }

    get marks() {
        return this._marks
    }

    get constMarks() {
        return this._constMarks
    }

    get selectedCategory() {
        return this._selectedCategory
    }

    get selectedMark() {
        return this._selectedMark
    }
}

export default ItemsStore