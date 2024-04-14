use master;
go
drop database if exists wallet;
go
create database wallet;
go
use wallet;
create table accounts(
id int primary key identity(1,1) not null,
username varchar(25) not null,
owner_name varchar(25) not null,
surname varchar(25) not null,
id_num varchar(30) not null,
balance decimal(6,2) null
);
create table incomes(
id int primary key identity(1,1) not null,
income_type bit not null, -- 0 = neocekivani, 1= ocekivani
accountid int
);
create table expenses(
id int primary key identity(1,1) not null,
expense_date date not null,
expense_sum decimal(6,2),
expense_shared decimal(6,2),
);
create table group_expenses(
id int primary key identity(1,1) not null,
accountidd int,
expenseid int
);
alter table incomes add foreign key (accountid) references accounts(id);
alter table group_expenses add foreign key (accountidd) references accounts(id);
alter table group_expenses add foreign key (expenseid) references expenses(id);
insert into accounts(username, owner_name, surname, id_num, balance) values
('Jrebolj','Josip','Rebolj','123456789',860.33),
('Spoznic','Slaven','Poznić','12346859',999.99),
('Kkraljik','Karla','Kraljik','123457089',1620.33),
('Dsabljic','Dino','Sabljić','123456909',460.33),
('Lcrljic','Luka','Crljić','1234512389',960.33),
('Mbaliban','Mario','Baliban','123487789',2500.33),
('Bfekete','Branimir','Fekete','1234123589',8150.33),
('Dtolic','Dajana','Tolić','1234632189',8668.33),
('Itolic','Ivan','Tolić','123423189',8630.33),
('Tkucic','Tomislav','Kučić','123231789',60.33),
('Zbaric','Zdenko','Barić','1234567639',8614.33),
('Mzulj','Mihael','Žulj','123459989',563.33),
('Imarosevic','Ivan','Marošević','1234589789',896.33),
('Gkovacic','Goran','Kovačić','1223456789',1246.33),
('Njakopec','Nataša','Jakopec','1235536789',1234.33),
('Gfranjic','Goran','Franjić','1234234789',961.33),
('Ajuric','Ana','Jurić','123457789',5862.33),
('Evejsilovic','Emina','Vejsilović','125256789',4155.33);
insert into incomes (income_type, accountid) values
(1,1),
(0,2),
(0,3),
(1,4);
insert into expenses (expense_date, expense_sum, expense_shared) values
(getdate(),20.00,null),
(getdate(),700.00,350.00),
(getdate(),960.60,null);


ALTER TABLE expenses ALTER COLUMN expense_sum decimal(18,2);
ALTER TABLE expenses ALTER COLUMN expense_shared decimal(18,2);
ALTER TABLE accounts ALTER COLUMN balance decimal(18,2);