import React from 'react'
import UserStore from '../store/UserStore.js'
import MaterialStore from "../store/MaterialStore";
import ItemsStore from "../store/ItemsStore";
import CustomStore from "../store/CustomStore";


const AppContext = React.createContext()

// контекст, который будем передавать
const context = {
    user: new UserStore(),
    store: new MaterialStore(),
    item: new ItemsStore(),
    custom: new CustomStore()

}

const AppContextProvider = (props) => {
    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    );
}

export {AppContext, AppContextProvider}