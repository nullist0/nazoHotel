CREATE TABLE `Facility` 
(
	`facility_id` int AUTO_INCREMENT,
	`floor` int,
	`type` varchar(255),
	`main_staff_id` int,
	`sub_staff_id` int,
	PRIMARY KEY(`facility_id`),
	FOREIGN KEY(`main_staff_id`) REFERENCES `Employee`(`employee_id`),
	FOREIGN KEY(`sub_staff_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Use` 
(
	`facility_id` int,
	`room_id` int,
	`date` date,
	`start_time` datetime,
	`end_time` datetime,
	PRIMARY KEY(`facility_id`, `room_id`, `date`),
	FOREIGN KEY(`room_id`) REFERENCES `Room`(`room_id`),
	FOREIGN KEY(`facility_id`) REFERENCES `Facility`(`facility_id`)
);

CREATE TABLE `Fix` 
(
	`fix_id` int,
	`facility_id` int,
	`employee_id` int,
	`fixed_time` datetime,
	PRIMARY KEY(`fix_id`),
	FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`),
	FOREIGN KEY(`facility_id`) REFERENCES `Facility`(`facility_id`)
);