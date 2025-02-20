import { Module } from '@nestjs/common'
import { LoansService } from './loans.service'
import { LoansController } from './loans.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Loan } from '../sequelize/models/loan.model'

@Module({
  controllers: [LoansController],
  providers: [LoansService],
  imports: [SequelizeModule.forFeature([Loan])],
  exports: [SequelizeModule],
})
export class LoansModule {}
