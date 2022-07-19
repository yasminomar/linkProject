import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { CategoryReadDto } from '../home/Components/Models/category.models';
import { ProductParameters, ProductReadDto, ProductWriteDto } from '../home/Components/Models/product.model';
import { VendorReadDto } from '../home/Components/Models/vendor.models';
import { ProductsService } from '../home/Components/ProductService/Products.service';

@Component({
  selector: 'app-products-controller',
  templateUrl: './products-controller.component.html',
  styleUrls: ['./products-controller.component.css']
})
export class ProductsControllerComponent implements OnInit {
  ProductForm: FormGroup = new FormGroup({
    englishName: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[A-Za-z ]+$/
      ),
    ]),
    arabicName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\u0621-\u064A\u0660-\u0669 ]+$/),
    ]),
    image: new FormControl(),
    quantity: new FormControl('', [
      Validators.required,
      Validators.max(10000),
      Validators.min(1)
    ]),
    unitPrice: new FormControl('', [
      Validators.required,
      Validators.max(10000),
      Validators.min(1)
    ]),
    categoryId: new FormControl('', [
      Validators.required,
    ]),
    vendorId: new FormControl('', [
      Validators.required,
    ]),
  });

  totalCount=1;
  currentPage=1;
  ServerBase = environment.ServerBase;
  productWriteDto:ProductWriteDto|null=null;
  productsReadDto: ProductReadDto[] = [];
  productToEdit:ProductReadDto|null=null;
  categoryReadDto:CategoryReadDto[]=[];
  vendorReadDto:VendorReadDto[]=[];
  constructor(
    private productService: ProductsService,
    private ngxSmartModalService: NgxSmartModalService

  ) {}

  ngOnInit(): void {
    this.GetProducts(1);
    this.GetCategories();
    this.GetVendors();
  }

  GetProducts(page:number){
    var productParameters:ProductParameters={pageNumber:page};
    this.productService.getAllProducts(productParameters).subscribe({
      next: (products) => {
        this.productsReadDto=products.products;
        this.totalCount=products.totalCount;
        this.currentPage=page;
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }

  GetCategories(){
    this.productService.getAllCategoriesToShow().subscribe({
      next: (categories) => {
        this.categoryReadDto=categories;
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }

  GetVendors(){
    this.productService.getAllVendors().subscribe({
      next: (vendors) => {
        this.vendorReadDto=vendors;
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }

  AddOrEditProduct(){
    var input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const { value, valid, dirty } = this.ProductForm;
    if (!valid || !dirty||!this.validateImage()) return;
    if(!this.productToEdit){
      var formData=new FormData(document.querySelector('form')!);
      this.productService.AddProduct(formData).subscribe({
        next: (product) => {
          alert("Product Added Sucecss");
          this.productsReadDto.push(product);
          this.ProductForm.reset();
          this.ngxSmartModalService.getModal('openProductCreationModal').close();
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
    else {
      var formData=new FormData(document.querySelector('form')!);
      formData.append("id",this.productToEdit?.id??"")
      this.productService.editProduct(this.productToEdit.id!, formData).subscribe({
        next: (product) => {
            const indexToEdit = this.productsReadDto.findIndex((p) => p.id === product.id)
            this.productsReadDto.splice(indexToEdit, 1, product);
            this.productToEdit = null;
            this.ProductForm.reset();
            this.ngxSmartModalService.getModal('openProductCreationModal').close();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openProductCreation(){
    this.ProductForm.reset();
    this.ngxSmartModalService.getModal('openProductCreationModal').open();
    
  }

  editProduct(event:any,product:ProductReadDto){
    this.productService.getImage(this.ServerBase+product.image).subscribe({
      next:(file)=>{
        this.ngxSmartModalService.getModal('openProductCreationModal').open();
        this.productToEdit=product;
        var input = document.querySelector('input[type="file"]') as HTMLInputElement;
        var data = new DataTransfer();
        data.items.add(file);
        input!.files = data.files;        
        this.ProductForm.patchValue({
          englishName:product.englishName,
          arabicName:product.arabicName,
          unitPrice:product.unitPrice,
          quantity:product.quantity,
          categoryId:product.category.id,
          vendorId:product.vendor.id,      
        })
      },
    })
  }

  deleteProduct(event:any,id:string){
    if (confirm('Are you sure you want to delete this Product?!')) {
      this.productService.deleteProduct(id).subscribe({
        next: (product) => {
          this.productsReadDto = this.productsReadDto.filter((p) => p.id !== id);
        },
        error: (err) => {
          alert(err.error);
        },
      });
    }
  }

  validateImage(){
    var input = document.querySelector('input[type="file"]') as HTMLInputElement|null;
    return input?.files?.length
 }
}
