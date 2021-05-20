import { Sequelize } from 'sequelize';

const connection = new Sequelize('rank_insta', 'gitpod', 'Theryston10', {
  host: 'localhost',
  dialect: 'mysql'
})

export { connection }