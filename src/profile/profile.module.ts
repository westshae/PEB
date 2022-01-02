import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthEntity } from 'src/auth/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity]), TypeOrmModule.forFeature([AuthEntity])],
  controllers: [ProfileController],
  providers: [ProfileService, AuthService]
})
export class ProfileModule {}