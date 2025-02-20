'use strict'

import { DataTypes } from 'sequelize'
import { loanAttributes } from '../models/loan.model'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    )
    await queryInterface.createTable('loans', loanAttributes)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('loans')
  },
}
