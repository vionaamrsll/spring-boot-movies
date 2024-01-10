# Host: localhost  (Version 5.5.5-10.4.28-MariaDB)
# Date: 2024-01-10 09:33:18
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "auth"
#

DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "auth"
#

INSERT INTO `auth` VALUES ('admin','admin123',1),('user','user123',0);

#
# Structure for table "movies"
#

DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `schedule` datetime NOT NULL,
  `rating` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "movies"
#

INSERT INTO `movies` VALUES (1,'film1','desc1','2024-01-06 10:56:23','9.4');

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "users"
#

INSERT INTO `users` VALUES ('admin','new','082176547728','viona@gmail.com'),('user','senli','082198769982','senli@gmail.com');
