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
  
  //cartId:string

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

// export interface Order {
//    id?:string,
//   orderNumber: string,
//   orderStatus: number,
//   orderCreatedDate: Date
// }

// export enum OrderStatus{

//   PendingReview = 1,
//   Accepted,
//   Canceled,
// }

// export interface OrderReadDTO{

//   id?:string,
//   orderNumber: string,
//   orderStatus: number,
//   orderCreatedDate: Date,
//   productOrders?:[{
//     product?:Product,
//     productCount?:number

//   }]

//   totalPrice?: number,
//   // statusSelect?: ObjectStataus []

// }


// export interface ObjectStataus{
//   enumName?:string,
//   enumValue?:number,
//   isSelected?:boolean

// }