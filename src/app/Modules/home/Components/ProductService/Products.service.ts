import { ProductPaginationReadDto, ProductReadDto } from './../Models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/product.model';
import { CartReadDto, ProductInCartReadDto, ProductInCartUpdateDto, ProductInCartWriteDto } from '../Models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL: string = 'http://localhost:20517/api';
  constructor(private httpClient: HttpClient) { }
  getAllProducts(productParameters:any){
    return this.httpClient.post<ProductPaginationReadDto>(this.baseURL+"/Product/sortedProduct",productParameters)
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


  deleteProductFromCart(id:any){
    return this.httpClient.delete<ProductInCartReadDto>(this.baseURL+"/ProductInCart/"+id)

  }
}
