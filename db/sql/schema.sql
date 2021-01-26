CREATE DATABASE questions;

CREATE TABLE [IF NOT EXISTS] question (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL FOREIGN KEY,
  created_date DATE,
  body TEXT NOT NULL ,
  name VARCHAR(60) NOT NULL,
  helpfulness INT DEFAULT 0,
  reported BOOLEAN DEFAULT false,
);

CREATE TABLE [IF NOT EXISTS] answer (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL FOREIGN KEY,
  question_id INT NOT NULL,
  created_date DATE,
  body TEXT NOT NULL,
  name VARCHAR(60) NOT NULL,
  helpfulness INT DEFAULT 0,
  FOREIGN KEY (question_id)
    REFERENCES question (id)
);

CREATE TABLE [IF NOT EXISTS] answerImage (
  id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  url,
  FOREIGN KEY (answer_id)
    REFERENCES answer (id)
);
