import { Publication } from './publication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationResolver } from './publication.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Publication])],
  providers: [PublicationResolver, PublicationService],
  exports: [PublicationService],
})
export class PublicationModule {}
