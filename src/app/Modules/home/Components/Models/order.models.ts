import { ChildCartReadDto } from "./cart.model"
import { ProductReadDto } from "./product.model"

export interface OrderReadDto {
  cart: ChildCartReadDto,
  shipmentAddress: string,
  paymentMethod:string
}

export interface OrderWriteDto {
  cartId: string|undefined,
  ShipmentAddress: string,
  paymentMethod:string
}

export interface OrderHistoryReadDto {
  id: string|undefined,
  products: ProductReadDto[],
  shippmentAddress: string,
  paymentMethod:string,
  totalPrice:number,
  UserId:string
}