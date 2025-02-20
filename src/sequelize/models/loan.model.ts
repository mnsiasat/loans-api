import { Sequelize, DataTypes, Model, Optional } from 'sequelize'
import { Loan, Status } from '../../interfaces/loan.interface'

export type LoanCreationAttributes = Optional<Loan, 'id'>

export class LoanModel
  extends Model<Loan, LoanCreationAttributes>
  implements Loan
{
  public id!: string
  public applicantName!: string
  public status: Status
  public requestedAmount!: number
  public createdAt: string | undefined
  public updatedAt: string | undefined

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

export const loanAttributes = {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    allowNull: false,
  },
  applicantName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestedAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['PENDING', 'APPROVED', 'REJECTED'],
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}

export default (sequelize: Sequelize): typeof LoanModel => {
  return sequelize.define('Loan', loanAttributes)
}
