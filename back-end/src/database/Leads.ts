import Sequelize from 'sequelize';
import { connection } from './connection'

const Leads = connection.define('leads', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Leads.sync({
    force: false
})

export { Leads }