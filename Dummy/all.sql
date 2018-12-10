-- insert into Department VALUES("경영", 4);
-- insert into Department VALUES("기획", 2);
-- insert into Department VALUES("응대", 9);
-- insert into Department VALUES("청소", 5);
-- insert into Department VALUES("식당", 5);
-- insert into Department VALUES("프론트", 10);

-- INSERT INTO `Option_Kind`(`option_name`, `option_price_per_num`) VALUES ("흡연 가능",0);
-- INSERT INTO `Option_Kind`(`option_name`, `option_price_per_num`) VALUES ("오션 뷰 객실",10000);
-- INSERT INTO `Option_Kind`(`option_name`, `option_price_per_num`) VALUES ("조식 뷔페",10000);
-- INSERT INTO `Option_Kind`(`option_name`, `option_price_per_num`) VALUES ("수영장 이용",20000);
-- INSERT INTO `Option_Kind`(`option_name`, `option_price_per_num`) VALUES ("석식 뷔페",30000);

-- insert into Employee(`name`, `department`, `address`, `email`, `gender`, `mobile_number`, `salary`, `responsible`)
--  VALUES("김민우","경영","안산시 한대앞로","testA@naver.com","남자","01011112222",2300000,101);
-- insert into Employee(`name`, `department`, `address`, `email`, `gender`, `mobile_number`, `salary`, `responsible`)
--  VALUES("김재현","응대", "용인시 보정로","testB@naver.com","남자","01044445555",1800000,102);
-- insert into Employee(`name`, `department`, `address`, `email`, `gender`, `mobile_number`, `salary`, `responsible`)
--  VALUES("노준호","기획", "수원시 팔달로","testC@naver.com","남자","01077779999",2500000,103);
-- insert into Employee(`name`, `department`, `address`, `email`, `gender`, `mobile_number`, `salary`, `responsible`)
--  VALUES("백승헌","프론트","고양시 일산서구","testD@naver.com","남자","01012342222",2300000,101);
-- insert into Employee(`name`, `department`, `address`, `email`, `gender`, `mobile_number`, `salary`, `responsible`)
--  VALUES("이평원","청소", "의정부시 시민로","testE@naver.com","남자","01044441234",1800000,102);
-- insert into Employee(`name`, `department`, `address`, `email`, `gender`, `mobile_number`, `salary`, `responsible`)
--  VALUES("최서준","프론트", "남양주시 경춘로","testF@naver.com","남자","01056789999",2500000,103);
-- insert into Employee(`name`, `department`, `address`, `email`, `gender`, `mobile_number`, `salary`, `responsible`)
--  VALUES("홍승현","경영","안양시 시민대로","testG@naver.com","여자","01011115678",2300000,101);

-- INSERT INTO `Room` VALUES (101,'싱글',150000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (102,'싱글',150000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (103,'싱글',150000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (104,'싱글',150000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (105,'싱글',150000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (201,'더블',250000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (202,'더블',250000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (203,'더블',250000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (204,'더블',250000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (205,'더블',250000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (301,'디럭스',350000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (302,'디럭스',350000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (303,'디럭스',350000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (304,'디럭스',350000,null,null,null,null,true,true);
-- INSERT INTO `Room` VALUES (305,'디럭스',350000,null,null,null,null,true,true);

-- insert into `Facility`(`name`,`floor`,`type`,`main_staff_id`,`sub_staff_id`) values('소화기',3,null,1,2);
-- insert into `Facility`(`name`,`floor`,`type`,`main_staff_id`,`sub_staff_id`) values('비상등',2,null,1,2);
-- insert into `Facility`(`name`,`floor`,`type`,`main_staff_id`,`sub_staff_id`) values('조명등',1,null,2,3);

-- insert into `Fix`(`facility_id`,`employee_id`,`fixed_time`) values(1,3,'2017-12-09 16:30:43');
-- insert into `Fix`(`facility_id`,`employee_id`,`fixed_time`) values(2,2,'2018-11-05 10:30:33');
-- insert into `Fix`(`facility_id`,`employee_id`,`fixed_time`) values(3,1,'2018-12-03 08:30:43');

-- INSERT INTO `Claim`(room_id, customer_call, department, deadline) VALUES(104, '청소','청소', NOW());
-- INSERT INTO `Claim`(room_id, customer_call, department, deadline) VALUES(203, '음식주문:오므라이스','식당', NOW());
INSERT INTO `Claim`(room_id, customer_call, department, deadline) VALUES(302, '음식주문:샴페인', '식당', '2018-12-09 12:00')
