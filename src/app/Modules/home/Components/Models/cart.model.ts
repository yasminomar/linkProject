import { LoginUserNormalData } from "src/app/Modules/auth/Models/user.model";
import { ProductReadDto } from "./product.model";

export interface CartReadDto {
  id: string;
  products:ProductInCartReadDto[],
  ApplicationUser:LoginUserNormalData
}

export interface ChildCartReadDto {
  id: string|undefined
}

export interface ProductInCartReadDto {
  cart: ChildCartReadDto,
  quantity:number,
  product:ProductReadDto,
}

export interface ProductInCartWriteDto {
  cartId: string|undefined;
  productId: string|undefined;
  quantity?:number,
}

export interface ProductInCartUpdateDto {
  id: string|undefined;
  cartId: string|undefined;
  productId: string|undefined;
  quantity?:number,
}
