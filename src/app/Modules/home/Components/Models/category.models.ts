export interface CategoryWriteDto {
  name:string,
  parentCategoryId:string
}

export interface CategoryReadDto {
  id: string,
  name: string 
  parentCategory:ChildParentCategoryReadDto 
}

export interface CategoryParameters{
  pageNumber:number
}

export interface CategoryPaginationReadDto {
  totalCount: number;
  categories: CategoryReadDto[];
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
