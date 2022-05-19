import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import schema from "./RegisterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterFormType } from "../../Types/Types";
import { Navigate } from "react-router-dom";
const theme = createTheme();

const Register = () => {
  const [navigate, setNavigate] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: RegisterFormType) => {
    console.log("Hello");
    const url = "http://localhost:7080/login/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          address: {
            addressLocation: values.address,
            city: values.city,
            zipCode: values.zipCode,
            country: values.country,
          },
          user: {
            login: values.name,
            password: values.password,
            phoneNumber: values.phoneNumber,
            type: true,
            email: values.email,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = (await response).json();
      console.log("Succes:", JSON.stringify(json));
    } catch (error) {
      console.error("Error:", error);
    }
    setNavigate(!navigate);
  };

  if (navigate) {
    return <Navigate to="/sign" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Sign up
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  {...register("name", {})}
                />
                {errors.name && (
                  <Typography style={{ color: "#F95252" }}>
                    * {errors.name.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register("email", {})}
                />
                {errors.email && (
                  <Typography style={{ color: "#F95252" }}>
                    * {errors.email.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  {...register("phoneNumber", {})}
                />
                {errors.phoneNumber && (
                  <Typography style={{ color: "#F95252" }}>
                    * {errors.phoneNumber.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address"
                  {...register("address", {})}
                />
                {errors.address && (
                  <Typography style={{ color: "#F95252" }}>
                    * {errors.address.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="city"
                  label="City "
                  {...register("city", {})}
                />
                {errors.city && (
                  <Typography style={{ color: "#F95252" }}>
                    * {errors.city.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="zipCode"
                  label="ZIP Code"
                  {...register("zipCode", {})}
                />
                {errors.zipCode && (
                  <Typography style={{ color: "#F95252" }}>
                    * {errors.zipCode.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  {...register("country", {})}
                />
                {errors.country && (
                  <Typography style={{ color: "#F95252" }}>
                    * {errors.country.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  id="password1"
                  type="password"
                  {...register("password", {})}
                />
                {errors.password && (
                  <Typography style={{ color: "#F95252" }}>
                    * {errors.password.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm password"
                  id="password2"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <Typography style={{ color: "#F95252" }}>
                    * {errors.confirmPassword.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </form>
  );
};

export default Register;
