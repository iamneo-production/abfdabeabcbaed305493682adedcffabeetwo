import { render, fireEvent,screen,within} from '@testing-library/react';
import App from '../App';
import Table from "../components/Table"; // Import your Table component here
test('renders_learn_react_link', () => {
  render(<App />);
});
test("log_in_with_incorrect_credentials", async () => {
  const { getByLabelText, getByText, queryByLabelText } = render(<App />);

  const emailInput = getByLabelText("Email");
  const passwordInput = getByLabelText("Password");
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  // Use a more specific query to find the login button
  const loginButton = getByText("Login", { selector: "input[type='submit']" });

  fireEvent.change(emailInput, { target: { value: "admin123@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "admin123" } });
  fireEvent.click(loginButton);

  // Wait for two seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Check for the "Employee Management" text
  const employeeManagementText = getByText("Admin Login");
  expect(employeeManagementText).toBeInTheDocument();
});
test("it_should_successfully_log_in_with_correct_credentials", async () => {
  const { getByLabelText, getByText, queryByLabelText } = render(<App />);

  const emailInput = getByLabelText("Email");
  const passwordInput = getByLabelText("Password");

  // Use a more specific query to find the login button
  const loginButton = getByText("Login", { selector: "input[type='submit']" });

  fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "admin" } });
  fireEvent.click(loginButton);

  // Wait for two seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Check for the "Employee Management" text
  const employeeManagementText = getByText("Employee Management");
  expect(employeeManagementText).toBeInTheDocument();
});

test("display_grid_data", () => {
  const employeesData = [
    {
      id: 1,
      firstName: "Susan",
      lastName: "Jordon",
      email: "susan@example.com",
      salary: "95000",
      date: "2019-04-11",
    },
    {
      id: 2,
      firstName: "Adrienne",
      lastName: "Doak",
      email: "adrienne@example.com",
      salary: "80000",
      date: "2019-04-17",
    },
    {
      id: 3,
      firstName: "Rolf",
      lastName: "Hegdal",
      email: "rolf@example.com",
      salary: "79000",
      date: "2019-05-01",
    },
    {
      id: 4,
      firstName: "Kent",
      lastName: "Rosner",
      email: "kent@example.com",
      salary: "56000",
      date: "2019-05-03",
    },
    {
      id: 5,
      firstName: "Arsenio",
      lastName: "Grant",
      email: "arsenio@example.com",
      salary: "65000",
      date: "2019-06-13",
    },
    {
      id: 6,
      firstName: "Laurena",
      lastName: "Lurie",
      email: "laurena@example.com",
      salary: "120000",
      date: "2019-07-30",
    },
    {
      id: 7,
      firstName: "George",
      lastName: "Tallman",
      email: "george@example.com",
      salary: "90000",
      date: "2019-08-15",
    },
    {
      id: 8,
      firstName: "Jesica",
      lastName: "Watlington",
      email: "jesica@example.com",
      salary: "60000",
      date: "2019-10-10",
    },
    {
      id: 9,
      firstName: "Matthew",
      lastName: "Warren",
      email: "matthew@example.com",
      salary: "71000",
      date: "2019-10-15",
    },
    {
      id: 10,
      firstName: "Lyndsey",
      lastName: "Follette",
      email: "lyndsey@example.com",
      salary: "110000",
      date: "2020-01-15",
    },
  ]
  const mockHandleEdit = jest.fn();
  const mockHandleDelete = jest.fn();

  render(
    <Table
      employees={employeesData}
      handleEdit={mockHandleEdit}
      handleDelete={mockHandleDelete}
    />
  );

  // Check if all 10 records are displayed
  const rows = screen.getAllByRole("row");
  expect(rows.length).toBe(11); // Including the header row, there should be 11 rows
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: null,
  });

  // Check if each record has the expected content and buttons
  employeesData.forEach((employee, index) => {
    const cells = within(rows[index + 1]).getAllByRole("cell"); // Skip the header row
    expect(cells[0]).toHaveTextContent((index + 1).toString()); // Check the row number
    expect(cells[1]).toHaveTextContent(employee.firstName);
    expect(cells[2]).toHaveTextContent(employee.lastName);
    expect(cells[3]).toHaveTextContent(employee.email);
    expect(cells[4]).toHaveTextContent(formatter.format(employee.salary));
    expect(cells[5]).toHaveTextContent(employee.date);

    // Check for edit and delete buttons
    const editButton = within(cells[6]).getByRole("button", { name: "Edit" });
    const deleteButton = within(cells[7]).getByRole("button", {
      name: "Delete",
    });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    // Simulate a click on edit and delete buttons (if needed)
    fireEvent.click(editButton);
    fireEvent.click(deleteButton);

    // Check if the respective handlers were called
    expect(mockHandleEdit).toHaveBeenCalledWith(employee.id);
    expect(mockHandleDelete).toHaveBeenCalledWith(employee.id);
  });
});

test("cancel_update", async () => {
  const { getByLabelText, getByText, getAllByText,queryByText } = render(<App />);
  // Check for the "Employee Management" text
  const employeeManagementText = getByText("Employee Management");
  expect(employeeManagementText).toBeInTheDocument();
  const beforeUpdate = screen.getByText("Susan");

  expect(beforeUpdate).toBeInTheDocument();
  const editButtons = getAllByText("Edit");

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(editButtons[0]); // Index 0 represents the first button

  // Check if the Edit component is displayed
  const editForm = screen.getByText("Edit Employee");
  expect(editForm).toBeInTheDocument();
  const editForm1 = screen.getByText("First Name");
  expect(editForm1).toBeInTheDocument();

  const firstNameInput = screen.getByLabelText("First Name");
  const lastNameInput = screen.getByLabelText("Last Name");
  const emailInput = screen.getByLabelText("Email");
  const salaryInput = screen.getByLabelText("Salary ($)");
  const dateInput = screen.getByLabelText("Date");

  // Alter the existing values in the input fields
  fireEvent.change(firstNameInput, { target: { value: "NewFirstName" } });
  fireEvent.change(lastNameInput, { target: { value: "NewLastName" } });
  fireEvent.change(emailInput, { target: { value: "newemail@example.com" } });
  fireEvent.change(salaryInput, { target: { value: "75000" } });
  fireEvent.change(dateInput, { target: { value: "2022-01-15" } });

  // Submit the form (You can adapt this based on your form submission logic)
  // For example, if you have a "Submit" button, you can simulate a click on it.
  const updatebutton = getAllByText("Cancel");
console.log("updatebutton",updatebutton)
  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(updatebutton[1]);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Check if the old values are no longer present and the new values are displayed in the table
  const updatedFirstNameCell = screen.queryByText("NewFirstName");
  const updatedLastNameCell = screen.queryByText("NewLastName");
  const updatedEmailCell = screen.queryByText("newemail@example.com");
  const updatedSalaryCell = screen.queryByText("$75,000");
  const updatedDateCell = screen.queryByText("2022-01-15");

  expect(updatedFirstNameCell).not.toBeInTheDocument();
  expect(updatedLastNameCell).not.toBeInTheDocument();
  expect(updatedEmailCell).not.toBeInTheDocument();
  expect(updatedSalaryCell).not.toBeInTheDocument();
  expect(updatedDateCell).not.toBeInTheDocument();
  const afterUpdate = screen.queryByText("Susan");

  expect(afterUpdate).toBeInTheDocument();
})
test("update", async () => {
  const { getByLabelText, getByText, getAllByText,queryByText } = render(<App />);
  // Check for the "Employee Management" text
  const employeeManagementText = getByText("Employee Management");
  expect(employeeManagementText).toBeInTheDocument();
  const beforeUpdate = screen.getByText("Susan");

  expect(beforeUpdate).toBeInTheDocument();
  const editButtons = getAllByText("Edit");

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(editButtons[0]); // Index 0 represents the first button

  // Check if the Edit component is displayed
  const editForm = screen.getByText("Edit Employee");
  expect(editForm).toBeInTheDocument();
  const editForm1 = screen.getByText("First Name");
  expect(editForm1).toBeInTheDocument();

  const firstNameInput = screen.getByLabelText("First Name");
  const lastNameInput = screen.getByLabelText("Last Name");
  const emailInput = screen.getByLabelText("Email");
  const salaryInput = screen.getByLabelText("Salary ($)");
  const dateInput = screen.getByLabelText("Date");

  // Alter the existing values in the input fields
  fireEvent.change(firstNameInput, { target: { value: "NewFirstName" } });
  fireEvent.change(lastNameInput, { target: { value: "NewLastName" } });
  fireEvent.change(emailInput, { target: { value: "newemail@example.com" } });
  fireEvent.change(salaryInput, { target: { value: "75000" } });
  fireEvent.change(dateInput, { target: { value: "2022-01-15" } });

  // Submit the form (You can adapt this based on your form submission logic)
  // For example, if you have a "Submit" button, you can simulate a click on it.
  const updatebutton = getByText("Update");

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(updatebutton);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Check if the old values are no longer present and the new values are displayed in the table
  const updatedFirstNameCell = screen.getByText("NewFirstName");
  const updatedLastNameCell = screen.getByText("NewLastName");
  const updatedEmailCell = screen.getByText("newemail@example.com");
  const updatedSalaryCell = screen.getByText("$75,000");
  const updatedDateCell = screen.getByText("2022-01-15");

  expect(updatedFirstNameCell).toBeInTheDocument();
  expect(updatedLastNameCell).toBeInTheDocument();
  expect(updatedEmailCell).toBeInTheDocument();
  expect(updatedSalaryCell).toBeInTheDocument();
  expect(updatedDateCell).toBeInTheDocument();
  const afterUpdate = screen.queryByText("Susan");

  expect(afterUpdate).not.toBeInTheDocument();
})
test("cancel_delete", async () => {
  const { getByLabelText, getByText, getAllByText,queryByText } = render(<App />);
  // Check for the "Employee Management" text
  const employeeManagementText = getByText("Employee Management");
  expect(employeeManagementText).toBeInTheDocument();
  
  const beforedelete = screen.queryByText("NewFirstName");

  expect(beforedelete).toBeInTheDocument();
  const editButtons = getAllByText("Delete");

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(editButtons[0]); // Index 0 represents the first button
  const alert = getByText("Are you sure?");
  expect(alert).toBeInTheDocument();

  const confirmdelete = getByText("No, cancel!");
  expect(confirmdelete).toBeInTheDocument();

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(confirmdelete);
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const afterUpdate = screen.queryByText("NewFirstName");

  expect(afterUpdate).toBeInTheDocument();
})
test("delete", async () => {
  const { getByLabelText, getByText, getAllByText,queryByText } = render(<App />);
  // Check for the "Employee Management" text
  const employeeManagementText = getByText("Employee Management");
  expect(employeeManagementText).toBeInTheDocument();
  
  const beforedelete = screen.queryByText("NewFirstName");

  expect(beforedelete).toBeInTheDocument();
  const editButtons = getAllByText("Delete");

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(editButtons[0]); // Index 0 represents the first button
  const alert = getByText("Are you sure?");
  expect(alert).toBeInTheDocument();

  const confirmdelete = getByText("Yes, delete it!");
  expect(confirmdelete).toBeInTheDocument();

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(confirmdelete);
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const afterUpdate = screen.queryByText("NewFirstName");

  expect(afterUpdate).not.toBeInTheDocument();
})

test("cancel_logout", async () => {
  const { getByLabelText, getByText, getAllByText,queryByText } = render(<App />);
  // Check for the "Employee Management" text
  const employeeManagementText = getByText("Employee Management");
  expect(employeeManagementText).toBeInTheDocument();
  
  const editButtons = getByText("Logout");

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(editButtons); // Index 0 represents the first button
  const alert = getByText("Logging Out");
  expect(alert).toBeInTheDocument();

  const confirmdelete = getByText("Cancel");
  expect(confirmdelete).toBeInTheDocument();

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(confirmdelete);
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const afterUpdate = screen.queryByText("Admin Login");
  expect(afterUpdate).not.toBeInTheDocument();
  expect(employeeManagementText).toBeInTheDocument();
})
test("logout", async () => {
  const { getByLabelText, getByText, getAllByText,queryByText } = render(<App />);
  // Check for the "Employee Management" text
  const employeeManagementText = getByText("Employee Management");
  expect(employeeManagementText).toBeInTheDocument();
  
  const editButtons = getByText("Logout");

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(editButtons); // Index 0 represents the first button
  const alert = getByText("Logging Out");
  expect(alert).toBeInTheDocument();

  const confirmdelete = getByText("Yes");
  expect(confirmdelete).toBeInTheDocument();

  // Simulate a click on the "Edit" button for a specific employee (e.g., the first employee)
  fireEvent.click(confirmdelete);
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const afterUpdate = screen.queryByText("Admin Login");

  expect(afterUpdate).toBeInTheDocument();

  const emailInput = getByLabelText("Email");
  const passwordInput = getByLabelText("Password");
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
})