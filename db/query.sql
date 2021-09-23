SELECT 
role.id,
role.title AS Title,
role.salary AS Salary,
department.name AS department
FROM role
JOIN department
ON role.department_id = department.id
ORDER BY department.id;



