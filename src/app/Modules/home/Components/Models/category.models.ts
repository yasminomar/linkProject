// import { LoginUserNormalData } from "src/app/Modules/auth/Models/user.model";
// import { ProductReadDto } from "./product.model";


export interface CategoryWriteDto {
  name:string,
  parentCategoryId:string
}


export interface CategoryReadDto {
  id: string,
  name: string 
  parentCategory:ChildParentCategoryReadDto 
}


export interface ChildParentCategoryReadDto {
  id: string,
  name: string
}


export interface parentcategoryReadDto {
  id: string,
  name: string
}




export interface ParentCategoryReadDto {
  id: string,
  name: string
}
// export interface OrderHistoryReadDto {
//   products: ProductReadDto[],
//   shippmentAddress: string,
//   paymentMethod:string,
//   totalPrice:number,
//   UserId:string
// }







// export interface ProductInCartUpdateDto {
//   id: string|undefined;
//   cartId: string|undefined;
//   productId: string|undefined;
//   quantity?:number,
// }

// // export interface Order {
// //    id?:string,
// //   orderNumber: string,
// //   orderStatus: number,
// //   orderCreatedDate: Date
// // }

// // export enum OrderStatus{

// //   PendingReview = 1,
// //   Accepted,
// //   Canceled,
// // }

// // export interface OrderReadDTO{

// //   id?:string,
// //   orderNumber: string,
// //   orderStatus: number,
// //   orderCreatedDate: Date,
// //   productOrders?:[{
// //     product?:Product,
// //     productCount?:number

// //   }]

// //   totalPrice?: number,
// //   // statusSelect?: ObjectStataus []

// // }


// // export interface ObjectStataus{
// //   enumName?:string,
// //   enumValue?:number,
// //   isSelected?:boolean

// // }