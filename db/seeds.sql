INSERT INTO department (name)
VALUES ("SYSTEM SERVICE"),
       ("MINING & TRAINING"),
       ("DATA CENTER OPERATION"),
       ("GENERAL COUNSEL OPERATION"),
       ("HUMAN RESOURCE OPERATION"),
       ("NET WORK ENGINEER"),
       ("RISK MANAGEMENT");
       

INSERT INTO role(title, salary, department_id)
VALUES ("SYSTEM SPECIALIST", 81818.39, 1),
       ("ADMIN GENERALIST", 39977.45, 2),
       ("DATA TECHNICIAN", 45052.72, 3),
       ("ADMIN GENERALIST", 38208.67, 4),
       ("RECRUITER", 50575.87, 5),
       ("WEB DEVELOPER", 98790.98, 6),
       ("ADMIN SPECIALIST", 80000.99, 2),
       ("TRAINING & DEVELOP", 80000.09, 2),
       ("ADMINISTRATIVE MANAGEMENT", 112528.21, 7);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("MARK", "ANDERSON", 1, NULL),
       ("MALYN", "ANDERSON", 2, NULL ),
       ("ALLAN", "ANDERSON JR", 3, NULL ),
       ("LAUREL", "ANDREWS", 4, NULL ),
       ("TIMOTHY", "ARM", 5, NULL),
       ("SHAWN", "ARMSTRONG", 6, NULL ),
       ("RENE", "AZZARA", 7, NULL ),
       ("MICHAEL", "AZZAERA", 8, NULL ),
       ("JULIE", "BAECHER", 9, NULL );
        
