import { Test, TestingModule } from '@nestjs/testing';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { CreatePublication } from './dto/create.publication';
import { HttpException } from '@nestjs/common';

describe('PublicationsController', () => {
  let controller: PublicationsController;
  let service: PublicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicationsController],
      providers: [PublicationsService],
    }).compile();

    controller = module.get<PublicationsController>(PublicationsController);
    service = module.get<PublicationsService>(PublicationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new publication', async () => {
      const createPublicationDto: CreatePublication = {
        mediaId: 1,
        postId: 2,
        date: new Date(),
      };

      const mockCreatedPublication = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createPublicationDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockCreatedPublication);

      const result = await controller.create(createPublicationDto);

      expect(result).toEqual({
        message: 'Publication created',
        publication: mockCreatedPublication,
      });
      expect(service.create).toHaveBeenCalledWith(createPublicationDto);
    });

    it('should throw HttpException on error', async () => {
      const createPublicationDto: CreatePublication = {
        mediaId: 1,
        postId: 2,
        date: new Date(),
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Creation error'));

      await expect(controller.create(createPublicationDto)).rejects.toThrowError(HttpException);
    });
  });
});
