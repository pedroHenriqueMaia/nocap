import { Publication } from './publication.entity';
import { CreatePublicationInput } from './dto/create-publication.input';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PublicationService } from './publication.service';
import { Repository } from 'typeorm';
import { UpdatePublicationInput } from './dto/update-publication.input';

const arrayPublications: Publication[] = [
  new Publication({
    id: '1',
    title: 'teste1',
    message: 'testando...',
    publication_date: 123645,
    user: '7',
  }),
  new Publication({
    id: '2',
    title: 'teste2',
    message: 'testando...',
    publication_date: 123645,
    user: '10',
  }),
  new Publication({
    id: '3',
    title: 'teste3',
    message: 'testando...',
    publication_date: 123645,
    user: '1',
  }),
];

describe('PublicationsService', () => {
  let publicationService: PublicationService;
  let publicationRepository: Repository<Publication>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublicationService,
        {
          provide: getRepositoryToken(Publication),
          useValue: {
            create: jest.fn().mockReturnValue(arrayPublications[0]),
            save: jest.fn().mockResolvedValue(arrayPublications[0]),
            find: jest.fn().mockResolvedValue(arrayPublications),
            findOne: jest.fn().mockResolvedValue(arrayPublications[2]),
            update: jest.fn().mockReturnValue(arrayPublications[2]),
            // remove: jest.fn()
          },
        },
      ],
    }).compile();

    publicationService = module.get<PublicationService>(PublicationService);
    publicationRepository = module.get<Repository<Publication>>(
      getRepositoryToken(Publication),
    );
  });

  it('Sejam definidos', () => {
    expect(publicationService).toBeDefined();
    expect(publicationRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('Deve retornar uma lista de publicações', async () => {
      //act
      const result = await publicationService.findAll();

      //assert
      expect(result).toEqual(arrayPublications);
      expect(publicationRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Deve Retornar um erro', () => {
      //arrange
      jest
        .spyOn(publicationRepository, 'find')
        .mockRejectedValueOnce(new Error());

      //assert
      expect(publicationService.findAll()).rejects.toThrowError();
    });
  });

  describe('findById', () => {
    it('Deve retornar uma publicação, filtrado por id', async () => {
      //act
      const result = await publicationService.findById('3');

      //assert
      expect(result).toEqual(arrayPublications[2]);
      expect(publicationRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Deve Retornar um erro', () => {
      //arrange
      jest
        .spyOn(publicationRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      //assert
      expect(publicationService.findById('3')).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar uma nova publicação', async () => {
      //arrange
      const data: CreatePublicationInput = {
        title: 'teste3',
        message: 'testando...',
        publication_date: 123645,
        user: '1',
      };

      //act
      const result = await publicationService.create(data);

      //assert
      expect(result).toEqual(arrayPublications[0]);
      expect(publicationRepository.create).toHaveBeenCalledTimes(1);
      expect(publicationRepository.save).toHaveBeenCalledTimes(1);
    });

    it('Deve Retornar um erro', () => {
      //arrange
      const data: CreatePublicationInput = {
        title: 'teste3',
        message: 'testando...',
        publication_date: 123645,
        user: '1',
      };

      jest
        .spyOn(publicationRepository, 'save')
        .mockRejectedValueOnce(new Error());

      //assert
      expect(publicationService.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('Deve editar um novo usuario', async () => {
      //arrange
      const data: UpdatePublicationInput = {
        id: '3',
        title: 'teste3',
        message: 'testando...',
        publication_date: 123645,
        user: '1',
        like: 0,
      };

      //act
      const result = await publicationService.update(data.id, data);

      //assert
      expect(result).toEqual(arrayPublications[2]);
      expect(publicationRepository.update).toHaveBeenCalledTimes(1);
    });

    it('Deve Retornar um erro', () => {
      //arrange
      const data: CreatePublicationInput = {
        title: 'teste3',
        message: 'testando...',
        publication_date: 123645,
        user: '1',
      };

      jest
        .spyOn(publicationRepository, 'save')
        .mockRejectedValueOnce(new Error());

      //assert
      expect(publicationService.create(data)).rejects.toThrowError();
    });
  });
});
