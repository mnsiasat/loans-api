import { Sequelize, DataTypes, Optional } from 'sequelize'
import { LoanAttributes, Status } from '../../interfaces/loan.interface'
import { CreateLoanDto } from '../../loans/dto/loan.dto'
import { Column, DataType, Table, Model } from 'sequelize-typescript'

@Table({ tableName: 'loans', timestamps: true })
export class Loan extends Model<LoanAttributes | CreateLoanDto> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    allowNull: false,
  })
  id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  applicantName: string

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  })
  requestedAmount: number

  @Column({
    type: DataType.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    allowNull: false,
    defaultValue: 'PENDING',
  })
  status: 'PENDING' | 'APPROVED' | 'REJECTED'

  @Column({
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  })
  createdAt: string

  @Column({
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  })
  updatedAt: string
}
