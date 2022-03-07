import { Test, TestingModule } from '@nestjs/testing';
import { PublicationResolver } from './publication.resolver';
import { PublicationService } from './publication.service';

describe('PublicationResolver', () => {
  let resolver: PublicationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicationResolver, PublicationService],
    }).compile();

    resolver = module.get<PublicationResolver>(PublicationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
