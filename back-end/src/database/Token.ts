import Sequelize from 'sequelize';
import { connection } from './connection'
import { User } from "./User"

const Token = connection.define('tokens', {
    token: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Token.belongsTo(User)

Token.sync({
    force: false
})

export { Token }