ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';
CREATE DATABASE IF NOT EXISTS devTeam;
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT,
  taskName VARCHAR(255) NOT NULL,
  taskDescription TEXT,
  status VARCHAR(50),
  userTaskCreator VARCHAR(255),
  startDate DATE,
  endDate DATE NULL
);