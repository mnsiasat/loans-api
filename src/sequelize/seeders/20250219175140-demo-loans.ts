'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const loans = [
      {
        applicantName: 'John Doe',
        requestedAmount: 50000,
        status: 'APPROVED',
      },
      {
        applicantName: 'Cleo Hunt',
        requestedAmount: 25000.85,
        status: 'APPROVED',
      },
      {
        applicantName: 'Scot Pacheco',
        requestedAmount: 1000000,
        status: 'PENDING',
      },
      {
        applicantName: 'Emmanuel Simpson',
        requestedAmount: 2000000,
        status: 'REJECTED',
      },
    ]

    await queryInterface.bulkInsert('loans', loans)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('loans', null, {})
  },
}
