import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
  Put,
} from '@nestjs/common'
import { LoansService } from './loans.service'
import { CreateLoanDto, UpdateLoanDto } from './dto/loan.dto'
import { validate as uuidValidate } from 'uuid'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

@Controller('loans')
@UsePipes(new ValidationPipe())
@ApiTags('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Loan created successfully.' })
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto)
  }

  @Get()
  findAll() {
    return this.loansService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.getAndValidateResult(id)
  }

  private async getAndValidateResult(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException(`Invalid ID: ${id}`)
    }
    const loan = await this.loansService.findById(id)
    if (!loan) {
      throw new NotFoundException(`Loan with id ${id} not found`)
    }
    return loan
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    if (updateLoanDto.requestedAmount && updateLoanDto.requestedAmount < 0) {
      throw new BadRequestException(
        `Invalid requestedAmount: ${updateLoanDto.requestedAmount}`,
      )
    }
    const existingLoan = await this.getAndValidateResult(id)
    return this.loansService.update(existingLoan, updateLoanDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const existingLoan = await this.getAndValidateResult(id)
    this.loansService.remove(existingLoan)
  }
}
