import Sequelize from 'sequelize';
import { connection } from './connection'

const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    instagram_token: {
        type: Sequelize.STRING,
        allowNull: true
    },
    buy: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

User.sync({
    force: false
})

export { User }