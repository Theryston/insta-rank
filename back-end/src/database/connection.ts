import { Sequelize } from 'sequelize';

const connection = new Sequelize('rank_insta', 'gitpod', '@Senhagenerica1', {
  host: 'localhost',
  dialect: 'mysql'
})

export { connection }