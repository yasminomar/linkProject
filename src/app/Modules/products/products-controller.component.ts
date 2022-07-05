import { Component, OnInit } from '@angular/core';
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
    image: new FormControl('', [
      Validators.required
    ]),
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
    private router: Router,
    private auth: AuthService,
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
        this.productsReadDto=products.products.flatMap(p=>p.products);
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
    this.productService.getAllCategories().subscribe({
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
  AddProduct(){
    const { value, valid, dirty } = this.ProductForm;
    if (!valid || !dirty) return;
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
          
          alert(err.error);
        },
      });
    }
    // else {
    //   let ProductUpdate: ProductReadDto = {
    //     englishName:product.englishName,
    //     arabicName:product.arabicName,
    //     unitPrice:product.unitPrice,
    //     quantity:product.quantity,
    //     categoryId:product.category.id,
    //     vendorId:product.vendor.id
    //   };
    //   this.contactService
    //     .editContact(this.contactToEdit.contactId, contactUpdate)
    //     .subscribe({
    //       next: (response) => {
    //         if (!this.AddOrEditForm.value.image) {
    //           response.image = this.DefaultImage;
    //           const indexToEdit = this.contacts.findIndex(
    //             (c) => c.contactId === response.contactId
    //           );
    //           this.contacts.splice(indexToEdit, 1, response);

    //           this.contactToEdit = null;
    //           this.AddOrEditForm.reset();
    //           this.ngxSmartModalService.getModal('contactrModal').close();
    //           return;
    //         }

    //         this.onUpload(response.contactId!).subscribe((res) => {
    //           console.log(res);
    //           response.image = res.dbPath;
    //           const indexToEdit = this.contacts.findIndex(
    //             (c) => c.contactId === response.contactId
    //           );
    //           this.contacts.splice(indexToEdit, 1, response);

    //           this.contactToEdit = null;
    //           this.AddOrEditForm.reset();
    //           this.ngxSmartModalService.getModal('contactrModal').close();
    //         });
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       },
    //     });
    // }

    

  }

  openProductCreation(){
    this.ProductForm.reset();
    this.ngxSmartModalService.getModal('openProductCreationModal').open();
    
  }

  editProduct(event:any,product:ProductReadDto){
    event.stopPropagation();
    this.productToEdit=product;
    this.ProductForm.patchValue({
      englishName:product.englishName,
      arabicName:product.arabicName,
      unitPrice:product.unitPrice,
      quantity:product.quantity,
      categoryId:product.category.id,
      vendorId:product.vendor.id

    })

    this.ngxSmartModalService.getModal('openProductCreationModal').open();
  }

















  deleteProduct(event:any,id:string){
    event.stopPropagation();
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












}
