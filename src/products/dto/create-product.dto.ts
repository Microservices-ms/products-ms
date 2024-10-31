import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  // Esto es lo que el controlador está esperando que le llegue como parámetro
  @IsString()
  name: string;

  @IsNumber({
    maxDecimalPlaces: 4,
  })
  @Min(0)
  // @IsPositive() -> de 1 hacia arriba
  @Type(() => Number) /// -> Transforma a número lo que se envía y si no lo puede hacer lanza un error
  price: number;

  // description: string;
  // stock: number;
  // image: string;
}
