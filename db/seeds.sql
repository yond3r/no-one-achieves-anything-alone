USE tracker_db;

INSERT INTO departments (name)
VALUES
('Finance')--Chris, Ben-- 
('Parks and Recreation')--Ron, Leslie, April--
('Security')--Andy--
('Health')--April--
('Administrative')-- Tom, Jerry, Donna--

INSERT INTO roles (title, salary, department_id)
VALUES
('City Manager', 70000, 1), --Chris--
('Assistant City Manager', 60000, 2), --Ben--
('Director' 50000, 3), --Ron--
('Deputy Director', 40000, 4), --Leslie--
('Administrator', 30000, 5), --Tom--
('Office Manager', 30000, 6), --Jerry--
('Permits Security', 40000, 7), --Donna--
('Assistant', 30000 , 8), --April--
('Security Guard', 30000, 9), --Andy--
('Public Relations of Health Department', 50000, 10); --Ann--

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Chris', 'Traeger', 1, 690),
('Ben', 'Wyatt', 2, 590)
('Ron', 'Swanson', 3, 444),
('Leslie', 'Knope', 4, 559),
('Tom', 'Haverford', 5, 230),
('Jerry', 'Gergich', 6, 000),
('Donna', 'Meagle', 7, 999),
('April', 'Ludgate', 8, 001),
('Andy', 'Dwyer', 9, 221),
('Ann', 'Perkins', 10, 005);