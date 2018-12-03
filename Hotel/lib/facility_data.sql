CREATE TABLE `Facility` 
(
	`facility_id` int AUTO_INCREMENT,
	`floor` int,
	`type` varchar(255),
	`main_staff_id` int,
	`sub_staff_id` int,
	-- PRIMARY KEY(`facility_id`),
	-- FOREIGN KEY(`main_staff_id`) REFERENCES `Employee`(`employee_id`),
	-- FOREIGN KEY(`sub_staff_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Use` 
(
	`facility_id` int,
	`room_id` int,
	`date` date,
	`start_time` datetime,
	`end_time` datetime,
	-- PRIMARY KEY(`facility_id`, `room_id`, `date`),
	-- FOREIGN KEY(`room_id`) REFERENCES `Room`(`room_id`),
	-- FOREIGN KEY(`facility_id`) REFERENCES `Facility`(`facility_id`)
);

CREATE TABLE `Fix` 
(
	`fix_id` int,
	`facility_id` int,
	`employee_id` int,
	`fixed_time` datetime,
	-- PRIMARY KEY(`fix_id`),
	-- FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`),
	-- FOREIGN KEY(`facility_id`) REFERENCES `Facility`(`facility_id`)
);

insert into 'Facility' values(2000001,3,'fire extinguisher',3000001,3000002);
insert into 'Facility' values(2000002,2,'emergency light',3000003,3000004);
insert into 'Facility' values(2000003,1,'light',3000005,3000006);

insert into 'Use' values(2000001,304,'2018-03-19','2018-03-19 13:10:05','2018-03-19 15:57:35');
insert into 'Use' values(2000002,405,'2018-06-18','2018-06-18 15:23:39','2018-06-18 17:43:25');
insert into 'Use' values(2000003,102,'2018-11-18','2018-11-18 10:11:12','2018-11-18 15:14:32');

insert into 'Fix' values(4000001,2000001,5000001,'2017-12-09 16:30:43');
insert into 'Fix' values(4000002,2000002,5000002,'2018-11-05 10:30:33');
insert into 'Fix' values(4000003,2000003,5000003,'2018-12-03 08:30:43');