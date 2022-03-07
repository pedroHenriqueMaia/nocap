import { GqlAuthGuard } from '../auth/auth.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PublicationService } from './publication.service';
import { Publication } from './publication.entity';
import { CreatePublicationInput } from './dto/create-publication.input';
import { UseGuards } from '@nestjs/common';
import { UpdatePublicationInput } from './dto/update-publication.input';

@Resolver(() => Publication)
export class PublicationResolver {
  constructor(private readonly PublicationsService: PublicationService) {}

  @Mutation(() => Publication)
  createPublication(
    @Args('createPublicationInput')
    createPublicationInput: CreatePublicationInput,
  ) {
    return this.PublicationsService.create(createPublicationInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Publication], { name: 'Publications' })
  findAll() {
    return this.PublicationsService.findAll();
  }

  @Query(() => Publication, { name: 'PublicationById' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.PublicationsService.findById(id);
  }

  @Query(() => Publication, { name: 'PublicationByEmail' })
  findByEmail(@Args('email', { type: () => String }) email: string) {
    return this.PublicationsService.findByEmail(email);
  }

  @Mutation(() => Publication)
  updatePublication(
    @Args('updatePublicationInput')
    updatePublicationInput: UpdatePublicationInput,
  ) {
    return this.PublicationsService.update(
      updatePublicationInput.id,
      updatePublicationInput,
    );
  }

  @Mutation(() => String)
  async liked(@Args('id', { type: () => String }) id: string) {
    return await this.PublicationsService.liked(id);
  }

  // @Mutation(() => Publication)
  // removePublication(@Args('id', { type: () => String }) id: string) {
  //   return this.PublicationsService.remove(id);
  // }
}
