import { Publication } from './publication.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePublicationInput } from './dto/create-publication.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePublicationInput } from './dto/update-publication.input';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  async create(newPublication: CreatePublicationInput) {
    const publication = await this.publicationRepository.create(newPublication);
    await this.publicationRepository.save(publication);
    return publication;
  }

  async findAll(): Promise<Publication[]> {
    return await this.publicationRepository.find();
  }

  async findById(id: string) {
    const publication = await this.publicationRepository.findOne(id);
    if (!publication) {
      throw new HttpException(
        'Publicação não encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }
    return publication;
  }

  async findByEmail(email: string): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({
      where: { email: email },
    });
    if (!publication) {
      throw new HttpException(
        'Publicação não encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }
    return publication;
  }

  async update(id: string, updatePublicationInput?: UpdatePublicationInput) {
    const publication = await this.findById(id);
    if (!publication) {
      throw new HttpException(
        'Publicação não encontrado, falhou ao realizar a atualização.',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.publicationRepository.update(id, {
      ...updatePublicationInput,
    });
  }

  async liked(idPublication: string) {
    const publication = await this.findById(idPublication);
    if (publication) {
      const teste = await this.publicationRepository
        .createQueryBuilder()
        .update('publication')
        .set({
          like: publication.like + 1,
        })
        .where('id = :id', { id: publication['id'] })
        .execute();
      if (teste) {
        return 'yep';
      } else {
        return 'nop';
      }
    }

    return '';
  }
  async unliked(idPublication: string) {
    const publication = await this.findById(idPublication);
    if (publication) {
      const teste = await this.publicationRepository
        .createQueryBuilder()
        .update('publication')
        .set({
          like: publication.like - 1,
        })
        .where('id = :id', { id: publication['id'] })
        .execute();
      if (teste) {
        return 'yep';
      } else {
        return 'nop';
      }
    }

    return '';
  }

  // async remove(id: string): Promise<string> {
  //   const deletePublication = await this.publicationRepository.delete(id);
  //   if (!deletePublication.affected) {
  //     throw new HttpException('Publicação não encontrado, falhou ao realizar a deleção.', HttpStatus.NOT_FOUND);
  //   }
  //   return id;
  // }
}
