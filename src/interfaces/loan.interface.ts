import { DataTypes } from 'sequelize'

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface LoanAttributes {
  id?: string
  applicantName: string
  status?: Status
  requestedAmount: number
  createdAt?: string | undefined
  updatedAt?: string | undefined
}
