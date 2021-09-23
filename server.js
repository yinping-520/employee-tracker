const cTable = require("console.table");
const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log(`connected to the courses_db database.`)
);

const updateEmployee = () => {
  let employeeInfo;
  let roleInfo;
  db.query("SELECT * FROM employee", function (err, result) {
    if (err) {
      console.log(err);
    }
    employeeInfo = result.map((item) => `${item.first_name} ${item.last_name}`);
    console.log(employeeInfo);

    db.query("SELECT * FROM role", function (err, result2) {
      if (err) {
        console.log(err);
      }
      roleInfo = result2;
      console.log(roleInfo);

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which Employee do you want to update on?",
            choices: employeeInfo,
            name: "employee",
          },
          {
            type: "list",
            message: "What role do you wnat to assign to this emplyee?",
            choices: roleInfo.map((item) => item.title),
            name: "role",
          },
        ])
        .then(({ employee, role }) => {
          console.log(employee, role);
          const firstName = employee.split("")[0].toString();
          const lastName = employee.split("")[1].toString();
          const roleId = roleInfo.filter((item) => role === item.title)[0].id;

          db.query(
            `UPDATE employee SET first_name = ?, last_name = ? WHERE id = ?`,
            [firstName, lastName, roleId],
            function (err, result) {
              if (err) {
                console.log(err);
              }
              console.log(result, `${employee} has been updated`);
              init();
            }
          );
        });
    });
  });
 
};
const viewRole = () => {
  db.query(
    `SELECT 
  role.id,
  role.title AS Title,
  role.salary AS Salary,
  department.name AS department
  FROM role
  JOIN department
  ON role.department_id = department.id
  ORDER BY department.id`,
    function (err, role) {
      if (err) return console.log(err);
      console.table(role);
      init();
    }
  );
  
};
const addRole = () => {
  let departments;
  db.query("SELECT id, name FROM department", function (err, result) {
    if (err) {
      console.log(err);
    }
    departments = result;
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "roleName",
        },
        {
          type: "number",
          message: "What is the salary of the role?",
          name: "salary",
        },
        {
          type: "list",
          message: "Which department does the role belong to",
          choices: departments.filter((item) => item.name),
          name: "department",
        },
      ])
      .then(({ roleName, salary, department }) => {
        const depart_id = departments.filter(
          (item) => department === item.name
        )[0].id;

        db.query(
          `INSERT INTO role(title, salary, department_id)
  VALUES (?,?,?)`,
          [roleName, salary, depart_id],
          function (err, result) {
            if (err) {
              console.log(err);
            }
            console.log(result, "this role has been created.");
            init();
          }
        );
      });
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is his/her first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is his/her last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is his/her role?",
        choices: [
          "SYSTEM SPECIALIST",
          "ADMIN GENERALIST",
          "DATA TECHNICIAN",
          "ADMIN GENERALIST",
          "RECRUITER",
          "WEB DEVELOPER",
          "ADMIN SPECIALIST",
          "TRAINING & DEVELOP",
          "ADMINISTRATIVE MANAGEMENT",
        ],
        name: "role",
      },
    ])
    .then(({ firstName, lastName, role }) => {
      console.log(firstName, lastName, role);
      let roleId;
      db.query("SELECT id, title FROM role", function (err, result) {
        if (err) {
          console.log(err);
        }
        roleId = result.filter((item) => role === item.title)[0].id;
      });

      db.query(
        `INSERT INTO employee(first_name, last_name, role_id)
         VALUES (?, ?, ?)`,
        [firstName, lastName, roleId],
        function (err, newEmployee) {
          if (err) return console.log(err);
          console.log("added new employee to the database");
          init();
        }
      );
    });
};

const viewEmploy = () => {
  db.query(
    `SELECT employee.id, 
  employee.first_name, 
  employee.last_name, 
  role.title,role.salary , 
  department.name AS department_name
  FROM employee
  JOIN role
  ON role.id = employee.role_id
  JOIN department
  ON role.department_id = department.id
  ORDER BY employee.id`,
    function (err, employee) {
      if (err) return console.log(err);
      console.table(employee);
      init();
    }
  );
};

const viewDepartment = () => {
  db.query("SELECT * FROM department", function (err, depart) {
    if (err) return console.log(err);
    console.table(depart);
    init();
  });
};
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "department",
    })
    .then(({ department }) => {
      db.query(
        "INSERT INTO department(name) VALUES(?)",
        department,
        function (err, depart) {
          if (err) return console.log(err);
          console.log(`added ${department} to the database.`);
          init();
        }
      );
    });
};

const init = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "exit",
      ],
      name: "choice",
    })
    .then(({ choice }) => {
      console.log(choice);
      if (choice === "View All Employees") {
        viewEmploy();
      }
      if (choice === "Add Employee") {
        addEmployee();
      }
      if (choice === "Update Employee Role") {
        updateEmployee();
      }
      if (choice === "View All Roles") {
        viewRole();
      }
      if (choice === "Add Role") {
        addRole();
      }
      if (choice === "View All Departments") {
        viewDepartment();
      }
      if (choice === "Add Department") {
        addDepartment();
      }
      if (choice === "exit") {
        process.exit();
      }
    });
};

init();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
