import { ProductPaginationReadDto, ProductReadDto, ProductWriteDto } from './../Models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartReadDto, ProductInCartReadDto, ProductInCartUpdateDto, ProductInCartWriteDto } from '../Models/cart.model';
import { OrderHistoryReadDto, OrderReadDto, OrderWriteDto } from '../Models/order.models';
import { CategoryReadDto } from '../Models/category.models';
import { VendorReadDto } from '../Models/vendor.models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL: string = 'http://localhost:20517/api';
  constructor(private httpClient: HttpClient) { }
  getAllProducts(productParameters:any){
    return this.httpClient.post<ProductPaginationReadDto>(this.baseURL+"/Product/sortedProduct",productParameters)
  }

  getFilteredProducts(productParameters:any,productName:string){
    return this.httpClient.post<ProductPaginationReadDto>(this.baseURL+"/Product/sortedProduct/getFilteredProducts/"+productName,productParameters)
  }



  getCartByUserId(){
    return this.httpClient.get<CartReadDto>(this.baseURL+"/Cart/CartByUserId")
  }
  AddProductToCart(productInCartWriteDto:ProductInCartWriteDto ){
     return this.httpClient.post<ProductInCartReadDto>(this.baseURL+"/ProductInCart",productInCartWriteDto)

  }

  getProductsByCartId(cartId:any){
    return this.httpClient.get<ProductInCartReadDto[]>(this.baseURL+"/ProductInCart/"+cartId)
  }

  updateQuantity(productInCartUpdateDto:ProductInCartUpdateDto,id:any){
    return this.httpClient.put<ProductInCartReadDto>(this.baseURL+"/ProductInCart/"+id,productInCartUpdateDto)
  }
  GetProductInCartIdByCartIdAndProductId(cartId:any,productId:any){
    return this.httpClient.get<any>(this.baseURL+"/ProductInCart/getProd/"+cartId+"/"+productId)
  }


  getProductById(id:any){
    return this.httpClient.get<ProductReadDto>(this.baseURL+"/Product/"+id)


  }

  getUserId(){
    return this.httpClient.get<string>(this.baseURL+"/Order/GetUserId")


  }



  deleteProductFromCart(id:any){
    return this.httpClient.delete<ProductInCartReadDto>(this.baseURL+"/ProductInCart/"+id)

  }


  CreateOrder(orderWriteDto:OrderWriteDto){
    return this.httpClient.post<OrderReadDto>(this.baseURL+"/Order",orderWriteDto)
  }

  getOrderByCartId(cartId:any){
    return this.httpClient.get<OrderReadDto>(this.baseURL+"/Order/GetOrderByCartId/"+cartId)
  }

  DeleteProductInCartByCartId(cartId:any){
    return this.httpClient.delete<ProductInCartReadDto[]>(this.baseURL+"/ProductInCart/DeleteProductsInCartByCartId/"+cartId)
  }

  DeleteOrderByCartId(cartId:any){
    return this.httpClient.delete<OrderReadDto>(this.baseURL+"/Order/DeleteOrderByCartId/"+cartId)
  }

  UpdateProductQuantity(id:any,quantity:number){
    return this.httpClient.put<ProductReadDto>(this.baseURL+"/Product/"+id+"/"+quantity,{})
  }
  getOrdersByUserId(){
    return this.httpClient.get<OrderHistoryReadDto[]>(this.baseURL+"/Order/GetOrderHistory")

  }

  getAllCategories(){
    return this.httpClient.get<CategoryReadDto[]>(this.baseURL+"/Category")

  }

  getAllVendors(){
    return this.httpClient.get<VendorReadDto[]>(this.baseURL+"/Vendor")

  }

  AddProduct(productWriteDto:FormData){
    return this.httpClient.post<ProductReadDto>(this.baseURL+"/Product",productWriteDto)

  }
  deleteProduct(id:string){
    return this.httpClient.delete<ProductReadDto>(this.baseURL+"/Product/"+id)

  }
  
}
