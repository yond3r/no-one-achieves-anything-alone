USE tracker_db;

INSERT INTO departments (name)
VALUES
('Finance'),
('Parks and Recreation'),
('Security'),
('Health'),
('Administrative');

INSERT INTO roles (title, salary, department_id)
VALUES
('City Manager', 70000, 1),
('Assistant City Manager', 60000, 2),
('Director', 50000, 3),
('Deputy Director', 40000, 4),
('Administrator', 30000, 5),
('Office Manager', 30000, 6),
('Permits Security', 40000, 7), 
('Assistant', 30000 , 8),
('Security Guard', 30000, 9),
('Public Relations of Health Department', 50000, 10);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Chris', 'Traeger', 1, 690),
('Ben', 'Wyatt', 2, 590),
('Ron', 'Swanson', 3, 444),
('Leslie', 'Knope', 4, 559),
('Tom', 'Haverford', 5, 230),
('Jerry', 'Gergich', 6, 000),
('Donna', 'Meagle', 7, 999),
('April', 'Ludgate', 8, 001),
('Andy', 'Dwyer', 9, 221),
('Ann', 'Perkins', 10, 005);