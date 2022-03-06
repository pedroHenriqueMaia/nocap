import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Repository } from 'typeorm';

const arrayUsers: User[] = [
  new User({
    id: '1',
    name: 'pedro',
    email: 'pedro@gmail.com',
    password: '123456',
    bio: '',
  }),
  new User({
    id: '2',
    name: 'lucas',
    email: 'lucas@gmail.com',
    password: '123456',
  }),
  new User({
    id: '3',
    name: 'ana',
    email: 'ana@gmail.com',
    password: '123456',
  }),
];

describe('UsersService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockReturnValue(arrayUsers[0]),
            save: jest.fn().mockResolvedValue(arrayUsers[0]),
            find: jest.fn().mockResolvedValue(arrayUsers),
            findOne: jest.fn().mockResolvedValue(arrayUsers[2]),
            // update: jest.fn(),
            // remove: jest.fn()
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('Sejam definidos', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('Deve retornar uma lista de usuarios', async () => {
      //act
      const result = await userService.findAll();

      //assert
      expect(result).toEqual(arrayUsers);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Deve Retornar um erro', () => {
      //arrange
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      //assert
      expect(userService.findAll()).rejects.toThrowError();
    });
  });

  describe('findById', () => {
    it('Deve retornar um usuario, filtrado por id', async () => {
      //act
      const result = await userService.findById('3');

      //assert
      expect(result).toEqual(arrayUsers[2]);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Deve Retornar um erro', () => {
      //arrange
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

      //assert
      expect(userService.findById('3')).rejects.toThrowError();
    });
  });

  describe('findByEmail', () => {
    it('Deve retornar um usuario, filtrado por email', async () => {
      //arrange
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(arrayUsers[1]);

      //act
      const result = await userService.findByEmail('lucas@gmail.com');

      //assert
      expect(result).toEqual(arrayUsers[1]);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Deve Retornar um erro', () => {
      //arrange
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

      //assert
      expect(userService.findByEmail('lucas@gmail.com')).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar um novo usuario', async () => {
      //arrange
      const data: CreateUserInput = {
        name: 'pedro',
        email: 'pedro@gmail.com',
        password: '123456',
        bio: '',
      };

      //act
      const result = await userService.create(data);

      //assert
      expect(result).toEqual(arrayUsers[0]);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('Deve Retornar um erro', () => {
      //arrange
      const data: CreateUserInput = {
        name: 'pedro',
        email: 'pedro@gmail.com',
        password: '123456',
        bio: '',
      };

      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());

      //assert
      expect(userService.create(data)).rejects.toThrowError();
    });
  });
});
