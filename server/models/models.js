const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const users = sequelize.define('users',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.ENUM('USER', 'ADMIN'), defaultValue: 'USER'}
}, {underscored: true})

const items = sequelize.define('items',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    a: {type: DataTypes.STRING},
    b: {type: DataTypes.STRING},
    c: {type: DataTypes.STRING},
    b1: {type: DataTypes.STRING},
    c1: {type: DataTypes.STRING},
    state_before: {type: DataTypes.INTEGER},
    state_after: {type: DataTypes.INTEGER},
    timer: {type: DataTypes.BOOLEAN, defaultValue: false}
}, {underscored: true})

const categories = sequelize.define('categories',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {underscored: true})

const materials = sequelize.define('materials',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    media: {type: DataTypes.STRING, allowNull: false},
    info: {type: DataTypes.STRING, allowNull: false},
    preview: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {underscored: true})

const customized_materials = sequelize.define('customized_materials',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    state: {type: DataTypes.STRING, defaultValue: 'NOT_ISSUED'}
}, {underscored: true})

const marks = sequelize.define('marks',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mark: {type: DataTypes.FLOAT}
}, {underscored: true})


users.hasMany(items)
items.belongsTo(users)

users.hasMany(marks)
marks.belongsTo(users)

categories.hasMany(items)
items.belongsTo(categories)

categories.hasMany(materials)
materials.belongsTo(categories)

materials.hasMany(customized_materials)
customized_materials.belongsTo(materials)

users.hasMany(customized_materials)
customized_materials.belongsTo(users)

module.exports = {
    users,
    items,
    categories,
    materials,
    customized_materials,
    marks
}