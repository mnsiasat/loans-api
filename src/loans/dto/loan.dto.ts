import { LoanAttributes, Status } from '../../interfaces/loan.interface'
import { Optional } from 'sequelize'
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateLoanDto implements Partial<LoanAttributes> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  applicantName: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 1000 })
  requestedAmount: number
}

export class UpdateLoanDto implements Partial<LoanAttributes> {
  @ApiProperty({ example: 'John Doe' })
  applicantName?: string

  @ApiProperty({ example: 1000 })
  requestedAmount?: number

  @ApiProperty({
    description: 'Status of the loan',
    enum: Status,
    default: Status.PENDING,
  })
  status?: Status
}
