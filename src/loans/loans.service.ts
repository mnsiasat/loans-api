import { Injectable } from '@nestjs/common'
import { CreateLoanDto, UpdateLoanDto } from './dto/loan.dto'
import { Loan } from '../sequelize/models/loan.model'

@Injectable()
export class LoansService {
  async create(createLoanDto: CreateLoanDto) {
    return await Loan.create(createLoanDto)
  }

  async findAll() {
    return await Loan.findAll()
  }

  async findById(id: string) {
    return await Loan.findByPk(id)
  }

  async update(existing: Loan, updateLoanDto: UpdateLoanDto) {
    return existing.update(updateLoanDto)
  }

  remove(existing: Loan) {
    existing.destroy()
  }
}
