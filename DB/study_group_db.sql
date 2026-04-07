CREATE DATABASE study_group_db;
USE study_group_db;

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    program_of_study VARCHAR(100),
    year_of_study VARCHAR(20),
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE StudyGroup (
    id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(100) NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    description TEXT,
    meeting_location VARCHAR(255),
    leader_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (leader_id) REFERENCES User(id) ON DELETE SET NULL
);

CREATE TABLE GroupMember (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    group_id INT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES StudyGroup(id) ON DELETE CASCADE
);

CREATE TABLE StudySession (
    id INT PRIMARY KEY AUTO_INCREMENT,
    group_id INT,
    session_date DATE NOT NULL,
    session_time TIME NOT NULL,
    location_or_link VARCHAR(255),
    description TEXT,
    created_by INT,
    FOREIGN KEY (group_id) REFERENCES StudyGroup(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES User(id)
);

CREATE TABLE GroupPost (
    id INT PRIMARY KEY AUTO_INCREMENT,
    group_id INT,
    user_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES StudyGroup(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User(id)
);