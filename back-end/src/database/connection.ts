import { Sequelize } from 'sequelize';

const connection = new Sequelize('rank_insta', 'prod', 'Senhagenerica1', {
  host: 'mysql743.umbler.com',
  // port: 41890,
  dialect: 'mysql'
})

export { connection };