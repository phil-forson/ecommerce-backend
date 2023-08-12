import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartitemController } from './cartitem.controller';
import { Cartitem } from './cartitem.entity';
import { CartitemService } from './cartitem.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cartitem])],
  controllers: [CartitemController],
  providers: [CartitemService]
})
export class CartitemModule {}
