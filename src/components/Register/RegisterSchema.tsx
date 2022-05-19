import * as yup from "yup";

let schema = yup.object().shape({
  name: yup.string().required().min(3, "Name cannot be emty"),
  phoneNumber: yup
    .string()
    .required("Phone cannot be empty")
    .min(9, "Min 9 characters"),
  address: yup.string().required("Address cannot be emty"),
  city: yup.string().required("City cannot be emty"),
  zipCode: yup.string().required("Zip code cannot be emty"),
  country: yup.string().required("City cannot be emty"),
  password: yup
    .string()
    .required("Password cannot be empty.")
    .min(8, "Minim length password 8 characters")
    .max(15, "Maxim 15 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});
export default schema;
