import { Test, TestingModule } from '@nestjs/testing'
import { v4 as uuidv4 } from 'uuid'
import { LoansController } from './loans.controller'
import { LoansService } from './loans.service'
import { CreateLoanDto, UpdateLoanDto } from './dto/loan.dto'
import { Loan } from '../sequelize/models/loan.model'
import { Status } from '../interfaces/loan.interface'
import { BadRequestException, NotFoundException } from '@nestjs/common'

describe('LoansController', () => {

  jest.setTimeout(10000);

  let controller: LoansController

  const mockLoanService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  const mockLoan = {
    id: uuidv4().toString(),
    applicantName: 'Chadwick Boseman',
    requestedAmount: 12000,
    status: Status.PENDING,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoansController],
      providers: [{
        provide: LoansService,
        useValue: mockLoanService,
      }],
    }).compile()

    controller = module.get<LoansController>(LoansController)
  })

  afterEach(()=>{
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('create => should create a new loan application', async () => {
    const createLoanDto = {
      applicantName: 'Chadwick Boseman',
      requestedAmount: 12000,
    } as CreateLoanDto

    jest.spyOn(mockLoanService, 'create').mockReturnValue(mockLoan)

    const result = await controller.create(createLoanDto)

    expect(mockLoanService.create).toBeCalled()
    expect(mockLoanService.create).toBeCalledWith(createLoanDto)

    expect(result).toEqual(mockLoan)
  })

  it('findAll => should return an array of loan', async () => {
    const loans = [mockLoan]
    jest.spyOn(mockLoanService, 'findAll').mockReturnValue(loans)

    const result = await controller.findAll()

    expect(result).toEqual(loans)
    expect(mockLoanService.findAll).toBeCalled()
  })

  it('findById => should find a loan application by ID', async () => {
    const id = uuidv4()

    jest.spyOn(mockLoanService, 'findById').mockReturnValue(mockLoan)

    const result = await controller.findById(id)

    expect(result).toEqual(mockLoan)
    expect(mockLoanService.findById).toBeCalled()
    expect(mockLoanService.findById).toBeCalledWith(id)
  })

  it('update => should find a loan application by ID and update its data', async () => {
    const id = uuidv4()
    const updateLoanDto = {
      applicantName: 'XXX',
    } as UpdateLoanDto

    jest.spyOn(mockLoanService, 'findById').mockReturnValue(mockLoan)

    const result = await controller.update(id, updateLoanDto)
    expect(mockLoanService.update).toBeCalled()
    expect(mockLoanService.update).toBeCalledWith(mockLoan, updateLoanDto)
  })

  it('update => should throw BadRequest when loan with given ID does not exist, existing loan will not be updated ', async () => {
    const id = uuidv4()
    const updateLoanDto = {
      status: Status.APPROVED,
    } as UpdateLoanDto
    await expect(controller.update(id, updateLoanDto)).rejects.toThrow(NotFoundException)
    expect(mockLoanService.findById).toBeCalledWith(id)
    expect(mockLoanService.update).toBeCalledTimes(0)
  })

  it('update => should throw BadRequest when requestedAmount is not a positive value, existing loan will not be updated ', async () => {
    const id = uuidv4()
    const updateLoanDto = {
      requestedAmount: -5000,
    } as UpdateLoanDto

    await expect(controller.update(id, updateLoanDto)).rejects.toThrow(BadRequestException)
    expect(mockLoanService.findById).toBeCalledTimes(0)
    expect(mockLoanService.update).toBeCalledTimes(0)
  })

  it('remove => should find and remove a loan application by ID', async () => {
    const id = uuidv4()

    jest.spyOn(mockLoanService, 'findById').mockReturnValue(mockLoan)

    await controller.remove(id)

    expect(mockLoanService.findById).toBeCalledWith(id)
    expect(mockLoanService.remove).toBeCalled()
    expect(mockLoanService.remove).toBeCalledWith(mockLoan)
  })

  it('remove => should throw NotFoundException when loan application with given ID does not exist', async () => {
    const id = uuidv4()

    await expect(controller.remove(id)).rejects.toThrow(NotFoundException)

    expect(mockLoanService.findById).toBeCalledWith(id)
    expect(mockLoanService.remove).toBeCalledTimes(0)
  })

})
