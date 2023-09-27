/* Write your code here */
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Login = ({ setIsAuthenticated }) => {
  const adminEmail = "admin@example.com";
  const adminPassword = "admin";

  const { handleSubmit, register, setError, formState } = useForm();

  const handleLogin = (data) => {
    if (data.email === adminEmail && data.password === adminPassword) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem("is_authenticated", true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: "success",
            title: "Successfully logged in!",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      setError("password", {
        type: "manual",
        message: "Incorrect email or password.",
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleSubmit(handleLogin)}>
        <h1>Admin Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          {...register("email", { required: true })}
        />
        <span>{formState.errors.email && "Email is required"}</span>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          {...register("password", { required: true })}
        />
        <span>{formState.errors.password && "Password is required"}</span>
        <input
          style={{ marginTop: "12px" }}
          type="submit"
          value="Login"
          disabled={formState.isSubmitting}
        />
      </form>
    </div>
  );
};

export default Login;
