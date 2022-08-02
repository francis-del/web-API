
-- CREATE TABLE IF NOT EXISTS expenses (
--  ExpenseID MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--  ExpenseName VARCHAR(25) NOT NULL,
--  amount INTEGER,
--  description VARCHAR(1000) NOT NULL,
-- 	category VARCHAR(150) NOT NULL,
--  period DATETIME,
--  date_created DATE,
-- 	approval VARCHAR(100) NOT NULL,
-- 	UserID  mediumint(8) unsigned,
-- 	picture_name TEXT,
-- 	FOREIGN KEY(UserID) REFERENCES accounts(id)
--  );

-- CREATE TABLE IF NOT EXISTS category(
--  CategoryID MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--  CategoryName VARCHAR(50) NOT NULL,
--  amount INTEGER);
  



-- INSERT INTO expenses(ExpenseID, ExpenseName,amount,description,category,period)
--  	VALUES(1,"Pizza", "500","Food","2022-08-07 20:34:23");
-- -- //ADd category

-- INSERT INTO category(CategoryID, CategoryName, amount)
--  VALUES(80, "Food", "50");

-- INSERT INTO category(CategoryID, CategoryName, amount)
--  VALUES(20, "University", "90");

-- INSERT INTO category(CategoryID, CategoryName, amount)
--   VALUES(30, "Book", "90");

-- INSERT INTO category(CategoryID, CategoryName, amount)
--  VALUES(40, "Travel", "30");

-- INSERT INTO category(CategoryID, CategoryName,amount)
--   VALUES(5, "Accomodation", "50");

-- INSERT INTO category(CategoryID, CategoryName, amount)
--  VALUES(60, "Lodging", "70");
