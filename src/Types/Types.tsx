export type Product = {
  description: string;
  photoPath: string;
  price: number;
  stock: number;
  title: string;
  catalogName: string;
  Quantity: number;
  id: number;
  Total: number;
};

export type ProductsParams = {
  id: string;
};

export type cartProps = {
  cartItems: Product[];
  addToCard: (value: Product) => void;
  deleteToCard: (valur: Product) => void;
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

export type ConversionRate = {
  time_last_update_utc: Date;
  time_next_update_utc: Date;
  conversionRate: Rate;
};

export type Rate = {
  code: string;
  value: number;
};
