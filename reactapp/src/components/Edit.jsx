/**Write your code here */
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee.id;

  const { handleSubmit, register, setValue, formState } = useForm({
    defaultValues: {
      firstName: selectedEmployee.firstName,
      lastName: selectedEmployee.lastName,
      email: selectedEmployee.email,
      salary: selectedEmployee.salary,
      date: selectedEmployee.date,
    },
  });

  const handleUpdate = (data) => {
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.salary ||
      !data.date
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const updatedEmployee = {
      id,
      ...data,
    };

    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? updatedEmployee : employee
    );

    localStorage.setItem("employees_data", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${updatedEmployee.firstName} ${updatedEmployee.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleSubmit(handleUpdate)}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          {...register("firstName", { required: true })}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          {...register("lastName", { required: true })}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          {...register("email", { required: true })}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          {...register("salary", { required: true })}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          {...register("date", { required: true })}
        />
        <div style={{ marginTop: "30px" }}>
          <input
            type="submit"
            value="Update"
            disabled={formState.isSubmitting}
          />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
