import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      uri: process.env.DATABASE_URL,
      models: [],
    }),
    LoanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
