import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name cannot be empty.")
    .min(3, "Name must have at least 3 chars."),
  phone: yup
    .string()
    .required("Phone cannot be empty")
    .min(9, "Min 9 characters"),
  email: yup
    .string()
    .required("Email cannot be empty.")
    .email("Invalid email."),
  password: yup
    .string()
    .required("Password cannot be empty.")
    .min(8, "Minim length password 8 characters")
    .max(15, "Maxim 15 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
  ////terms: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});
export default schema;
