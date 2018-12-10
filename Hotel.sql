CREATE TABLE `Department` 
(
	`name` varchar(255),
	`population` int,
	PRIMARY KEY(`name`)
);

CREATE TABLE `Customer` 
(
	`customer_id` int AUTO_INCREMENT,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`gender` varchar(255),
	`birthday` date,
	`mobile_number` int,
	`city` varchar(255),
	`street` varchar(255),
	`zip` int,
	`email` varchar(255),
	`membership` int,
	PRIMARY KEY(`customer_id`)
);

CREATE TABLE `Option_Kind` 
(
	`option_name` varchar(255),
	`option_price_per_num` int,
	PRIMARY KEY(`option_name`)
);

CREATE TABLE `Employee` 
(
	`employee_id` int AUTO_INCREMENT,
	`name` varchar(255),
	`department` varchar(255),
	`address` varchar(255),
	`email` varchar(255),
	`gender` varchar(255),
	`mobile_number` varchar(13),
	`start_work` date,
	`salary` int,
	`responsible` int,
	PRIMARY KEY(`employee_id`),
	FOREIGN KEY(`department`) REFERENCES `Department`(`name`)
);

CREATE TABLE `Room` 
(
	`room_id` int,
	`room_type` varchar(255),
	`room_price` int,
	`view` varchar(255),
	`equipment` varchar(255),
	`main_staff_id` int,
	`sub_staff_id`int,
    `is_checkout` boolean,
    `is_clean` boolean,
	PRIMARY KEY(`room_id`),
	FOREIGN KEY(`main_staff_id`) REFERENCES `Employee`(`employee_id`),
	FOREIGN KEY(`sub_staff_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Facility` 
(
	`facility_id` int AUTO_INCREMENT,
	`name` varchar(255),
	`floor` int,
	`type` varchar(255),
	`main_staff_id` int,
	`sub_staff_id` int,
	PRIMARY KEY(`facility_id`),
	FOREIGN KEY(`main_staff_id`) REFERENCES `Employee`(`employee_id`),
	FOREIGN KEY(`sub_staff_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Claim` 
(
	`claim_id` int AUTO_INCREMENT,
	`room_id` int,
	`customer_call` varchar(255),
	`department` varchar(255),
	`deadline` datetime,
	PRIMARY KEY(`claim_id`),
	FOREIGN KEY(`room_id`) REFERENCES `Room`(`room_id`)
);

CREATE TABLE `Vacation` 
(
	`employee_id` int,
	`start_date` date,
	`end_date` date,
	`type` varchar(255),
	PRIMARY KEY(`employee_id`, `start_date`),
	FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Time_table` 
(
	`employee_id` int,
	`date` date,
	`enter_time` time,
	`leave_time` time,
	PRIMARY KEY(`employee_id`, `date`),
	FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Book` 
(
	`book_id` int AUTO_INCREMENT,
	`room_id` int,
	`customer_id` int,
	`check_in` date,
	`check_out` date,
	`book_price` int,
	`option_price` int,
	`total_price` int,
	`people_num` int,
	PRIMARY KEY(`book_id`),
	FOREIGN KEY(`room_id`) REFERENCES `Room`(`room_id`),
	FOREIGN KEY(`customer_id`) REFERENCES `Customer`(`customer_id`)
);

CREATE TABLE `Option` 
(
	`book_id` int,
	`option_name` varchar(255),
	`apply_num` int,
	PRIMARY KEY(`book_id`,`option_name`),
	FOREIGN KEY(`book_id`) REFERENCES `Book`(`book_id`) ON DELETE CASCADE,
	FOREIGN KEY(`option_name`) REFERENCES `Option_Kind`(`option_name`)
);

CREATE TABLE `Take` 
(
	`claim_id` int,
	`employee_id` int,
	`finish_time` datetime,
	PRIMARY KEY(`claim_id`, `employee_id`),
	FOREIGN KEY(`claim_id`) REFERENCES `Claim`(`claim_id`) ON DELETE CASCADE,
	FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`)
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
	`fix_id` int AUTO_INCREMENT,
	`facility_id` int,
	`employee_id` int,
	`fixed_time` datetime,
	PRIMARY KEY(`fix_id`),
	FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`),
	FOREIGN KEY(`facility_id`) REFERENCES `Facility`(`facility_id`)
);

