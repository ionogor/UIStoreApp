export type Product = {
  description: string;
  photoPath: string;
  price: number;
  stock: number;
  title: string;
  catalogName: string;
  Quantity: number;
  id: number;
};

export type ProductsParams = {
  id: string;
};

type cartProps = {
  cartItems: Product[];
  addToCard: () => void;
  deleteToCard: () => void;
};

export type RegisterFormType = {
  name: string;
  password: string;
  phoneNumber: string;
  email: string;
  confirmPassword: string;
  isAdmin: false;
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

export type Catalogs = {
  pages: number;
  currentPage: number;
  productListDtos: Product[];
};

export type EditProduct = {
  title: string;
  description: string;
  price: number;
  stock: number;
};
