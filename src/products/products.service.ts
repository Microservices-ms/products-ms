import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.product.count({ where: { available: true } });
    const lastPage = await Math.ceil(totalPages / limit);
    console.log(page);
    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit || 0,
        take: limit,
        where: {
          available: true,
        },
      }),
      meta: {
        total: totalPages,
        page,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: {
        id,
        available: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    // Se hace esto para no mandar el id en la data
    const { id: __, ...data } = updateProductDto;

    //TODO: Condicionar a que no se mande a llamar nada si el body viene vacío '{}'
    try {
      await this.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    return this.product.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    return this.product.delete({
      where: { id },
    });
  }

  async softDelete(id: number) {
    try {
      await this.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    const product = await this.product.update({
      where: { id },
      data: {
        available: false,
      },
    });

    return product;
  }
}
