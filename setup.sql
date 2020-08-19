/*
--Braden McCoy
--8/20/2019
--CSE154AE
--This is the setup file for the giraffe db
*/


CREATE DATABASE IF NOT EXISTS giraffedb;

USE giraffedb;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS feedback;

CREATE TABLE products(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  spot_density VARCHAR(255) NOT NULL,
  neck_length VARCHAR(255) NOT NULL,
  stock int NOT NULL
);

INSERT INTO products(name, price, description, spot_density, neck_length, stock)
VALUES ("Genesis Giraffe", "1 Boundless", "The first.", "Supreme", "1.8m", 1),
       ("Tall Giraffe", "12 Rupees", "Very tall Giraffe, like super tall.", "Good", "1.8km", 5),
       ("Water Giraffe", "$23.95",
        "Everybody needs a Water Giraffe! May be fast or slow depending on who owns it.",
        "Average", "1.7m", 30),
       ("Gyorn", "Like two handfuls of crunchy snacks", "Eats only the M&M's from trail mix.",
        "Great", "1.8m", 421),
       ("Jebediah", "9 yoinks", "Has very soft ears, requests scritches often.", "Low", "1.9m", 19),
       ("Plush Giraffe", "Eternal hugs and kisses",
        "Speaks to you, but only when nobody else is around", "Great", "10cm", 50),
       ("Hungry Giraffe", "An absurd amount of hay", "monches", "Good", "1.8m", 27),
       ("Good boy Giraffe", "1 lifetime of happiness", "is very good boy", "Low", "1.7m", 1),
       ("Cranky Giraffe", "A good smile", "Likes the Sunday comics.", "Good", "1.9m", 200),
       ("Regal Giraffe", "20 munny", "Has good posture", "Good", "1.8m", 50),
       ("Triple Threat", "3 Giraffes of money", "There are three of them.", "Good * 3", "6.4m", 9),
       ("Sky Giraffe", "Your favorite user story", "He lives in the above.", "Ascendant", "1.6m",
         4),
       ("Photogenic Giraffe", "A good camera", "Takes pictures very well", "Picture Perfect",
         "1.9m", 26),
       ("Cool Giraffe", "A low budget music video starring himself", "Doesn't look at explosions",
         "Excellent", "1.8m", 15),
       ("Nosy Giraffe", "A good mystery novel", "Gets along well with grandmas", "Good", "1.8m",
         34);

CREATE TABLE reviews(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  product VARCHAR(255) NOT NULL,
  review VARCHAR(500) NOT NULL
  );

INSERT INTO reviews(name, product, review)
  VALUES ("Alex Jones", "Jebediah",
          "GIRAFFES ARE NOT REAL FOLKS I SEEN IT! THEY ARE GOVERNMENT DRONES OUT TO STEAL YOUR
           CHILDRENS' BELIEFS! DON'T LISTEN TO THESE LIVES AND DON'T BRING ONE INTO YOUR HOME!"),
         ("HackerGiraffe", "Genesis Giraffe", "Subscribe to Pewdiepie!"),
         ("Joe Jonas", "Hungry Giraffe", "Very good yes does eat many but also is good monch yes");

CREATE TABLE feedback(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  feedback_text VARCHAR(500) NOT NULL
  );

INSERT INTO feedback(name, feedback_text)
  VALUES ("Alex Jones", "Unfortunately I couldn't edit my earlier review but I have discovered
           through thorough research that Giraffes are indeed real. Thank you."),
         ("Hackerman", "Gee darn I wanted to get the super top secrect Giraffe [REDACTED] but the
           security is just too tight! I'm..... not in."),
         ("Nick Jonas", "I hope my brothers don't find out about this site.");
