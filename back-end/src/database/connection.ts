import { Sequelize } from 'sequelize';

const connection = new Sequelize('rank_insta', 'root', 'Theryston10', {
  host: 'localhost',
  dialect: 'mysql'
})

export { connection }