export interface ProductWriteDto {
  englishName: string;
  arabicName: string;
  description: string;  
  unitPrice?: number;
  quantity?: number;
  image?: string;
  categoryId:string,
  vendorId:string
}


export interface ProductParameters{
  pageNumber:number
}




export interface ProductPaginationReadDto {
  totalCount: number;
  products: ProductReadDto[];
}





export interface ProductReadDto {
  id?: string,
  englishName: string,
  arabicName: string,
  description: string,
  unitPrice: number,
  quantity?: number,
  image?: string,
  category:childCategoryReadDto,
  vendor:childVendorReadDto,
  productCount?:number
  isAddToCart?:boolean,
  isEmpty:boolean,
  totalPrice:any,
  toggle:number


}
export interface childVendorReadDto{
  id?:string,
  name:string
}
export interface childCategoryReadDto{
  id?:string,
  name:string
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


export interface ProductUpdateDto {
  id?: string;
  englishName: string;
  arabicName: string;
  description: string;  
  unitPrice?: number;
  quantity?: number;
  image?: string;
  categoryId:string,
  vendorId:string
}
