export interface Product {
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


export interface ProductParameters{
  pageNumber:number
}

export interface ProductGroupingOutputReadDto {
  categoryId: string;
  categoryName: string;
  products: ProductReadDto[];
}
export interface ProductPaginationReadDto {
  totalCount: number;
  products: ProductGroupingOutputReadDto[];
}

export interface ProductReadDto {
  id?: string,
  englishName: string;
  arabicName: string;  
  description: string;  
  unitPrice: number;
  quantity?: number;
  image?: string,
  category:childCategoryReadDto,
  vendor:childVendorReadDto,
  productCount?:number
  isAddToCart?:boolean;
  totalPrice:any


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