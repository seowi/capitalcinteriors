# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.25)
# Database: ocassioh_capitalcinteriors
# Generation Time: 2016-12-27 20:41:51 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table featured
# ------------------------------------------------------------

DROP TABLE IF EXISTS `featured`;

CREATE TABLE `featured` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `featured` WRITE;
/*!40000 ALTER TABLE `featured` DISABLE KEYS */;

INSERT INTO `featured` (`id`, `filename`, `order`)
VALUES
	(12,'od7g1v',3),
	(13,'od7gez',1),
	(14,'od7gff',2),
	(15,'od7gg3',4);

/*!40000 ALTER TABLE `featured` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table press
# ------------------------------------------------------------

DROP TABLE IF EXISTS `press`;

CREATE TABLE `press` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `press` WRITE;
/*!40000 ALTER TABLE `press` DISABLE KEYS */;

INSERT INTO `press` (`id`, `title`, `url`, `icon`, `order`, `deleted`)
VALUES
	(1,'Lonny','lonny','lonnyicon',1,0),
	(2,'abc','','odrujo',2,1),
	(3,'abc','','odrujo',3,1),
	(4,'House Beautiful','housebeautiful','oedev8',4,0),
	(5,'Elle Decoration','elle','oedf86',5,0),
	(6,'Architectural Digest','ad','oedfdd',6,0),
	(7,'Casa Vogue','casavogue','oedff5',7,0),
	(8,'Monocole','monocole','oedfgv',8,0),
	(9,'Dom & Interior - Russia','dominterior','oedfjq',9,0),
	(10,'Home Design - Australia','homedesign','oedfp6',10,0),
	(11,'Best Interiors - Russia','bestinteriors','oedfuw',11,0);

/*!40000 ALTER TABLE `press` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table press_images
# ------------------------------------------------------------

DROP TABLE IF EXISTS `press_images`;

CREATE TABLE `press_images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `press` int(11) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `press_images` WRITE;
/*!40000 ALTER TABLE `press_images` DISABLE KEYS */;

INSERT INTO `press_images` (`id`, `press`, `filename`, `order`)
VALUES
	(24,0,'000000',0),
	(27,2,'odrujs',1),
	(28,3,'odrujs',1),
	(32,1,'oe0fox',1),
	(33,1,'oe0fp7',2),
	(34,1,'oe0fpa',3),
	(35,1,'oe0fpi',4),
	(36,1,'oe0fq0',5),
	(37,1,'oe0fq3',6),
	(38,1,'oe0fq6',7),
	(39,1,'oe0fq9',8),
	(40,1,'oe0fqd',9),
	(41,1,'oe0fqg',10),
	(42,1,'oe0fqk',11),
	(43,1,'oe0fqn',12),
	(44,1,'oe0fqq',13),
	(45,1,'oe0fqt',14),
	(46,1,'oe0fqw',15),
	(47,1,'oe0fr0',16),
	(48,1,'oe0fr4',17),
	(49,1,'oe0fr7',18),
	(50,1,'oe0fra',19),
	(51,1,'oe0frd',20),
	(52,1,'oe0frg',21),
	(53,4,'oedeve',1),
	(54,4,'oedevj',2),
	(55,4,'oedevo',3),
	(56,4,'oedevs',4),
	(57,5,'oedf8b',1),
	(58,5,'oedf8g',2),
	(59,5,'oedf8l',3),
	(60,5,'oedf8p',4),
	(61,6,'oedfdg',1),
	(62,6,'oedfdj',2),
	(63,6,'oedfdm',3),
	(64,6,'oedfdr',4),
	(65,7,'oedff9',1),
	(66,7,'oedffd',2),
	(67,7,'oedffg',3),
	(68,7,'oedffk',4),
	(69,8,'oedfgz',1),
	(70,8,'oedfh9',2),
	(77,9,'oedfju',1),
	(78,9,'oedfjy',2),
	(79,9,'oedfk1',3),
	(80,9,'oedfk6',4),
	(81,9,'oedfka',5),
	(82,9,'oedfke',6),
	(83,10,'oedfpb',1),
	(84,10,'oedfpf',2),
	(85,10,'oedfpk',3),
	(86,10,'oedfpo',4),
	(87,10,'oedfpu',5),
	(88,10,'oedfq1',6),
	(89,11,'oedfv2',1),
	(90,11,'oedfv6',2),
	(91,11,'oedfva',3),
	(92,11,'oedfvd',4),
	(93,11,'oedfvg',5),
	(94,11,'oedfvj',6),
	(95,11,'oedfvm',7);

/*!40000 ALTER TABLE `press_images` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table projects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `desc` text,
  `tags` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;

INSERT INTO `projects` (`id`, `title`, `subtitle`, `category`, `url`, `desc`, `tags`, `order`, `deleted`)
VALUES
	(4,'Villa Sofia','Hudson, NY','House','villasofia','Blah blah','Open plan,Eat-in kitchen',3,0),
	(5,'Oliver','New York City','Apartment','oliver','Something something something','small space,open-plan',2,0),
	(6,'Anson Eleven','El Paso, TX','Restaurant','anson11','','',1,0),
	(7,'Blanco','','Apartment','blanco','something something something','',4,0),
	(8,'Acapulco','Mexico','House','acapulco','','',5,0),
	(9,'Chelsea Modern','Manhattan','Apartment','chelsea','','',6,0),
	(10,'Country Bistro','Mexico City','Restaurant','bistro','','',7,0),
	(11,'One Rutherford','NYC','Apartment','rutherford','','',8,0),
	(12,'Sotheby\'s Designer Showcase','Library','House','shothebys','','',9,0),
	(13,'Jade Signature','','In-Progress','jade','','',10,0),
	(14,'Dining Room','','In-Progress','dining','','',11,0),
	(15,'Penthouse','','In-Progress','penthouse','','',12,0);

/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table projects_images
# ------------------------------------------------------------

DROP TABLE IF EXISTS `projects_images`;

CREATE TABLE `projects_images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project` int(11) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `primary` int(11) DEFAULT '0',
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `projects_images` WRITE;
/*!40000 ALTER TABLE `projects_images` DISABLE KEYS */;

INSERT INTO `projects_images` (`id`, `project`, `filename`, `primary`, `order`)
VALUES
	(50,0,'00000',0,0),
	(61,5,'ocg3er',0,1),
	(62,5,'ocg3ew',0,2),
	(63,5,'ocg3f1',0,3),
	(64,5,'ocg3f6',1,4),
	(65,5,'ocg3fn',0,5),
	(66,5,'ocg3fb',0,6),
	(67,5,'ocg3fh',0,7),
	(76,6,'ochoqa',0,1),
	(77,6,'ochor7',1,2),
	(78,6,'ochoqh',0,3),
	(79,6,'ochoql',0,4),
	(80,6,'ochoqp',0,5),
	(81,6,'ochoqx',0,6),
	(82,6,'ochoqu',0,7),
	(83,6,'ochor2',0,8),
	(90,8,'oesomd',1,1),
	(91,8,'oesont',0,2),
	(92,8,'oesonx',0,3),
	(93,8,'oesoo1',0,4),
	(94,8,'oesoo5',0,5),
	(95,8,'oesoo8',0,6),
	(96,8,'oesoog',0,7),
	(97,9,'of4v3q',1,1),
	(98,9,'of4v3w',0,2),
	(99,9,'of4v46',0,3),
	(100,9,'of4v4b',0,4),
	(101,10,'of4v6a',1,1),
	(102,10,'of4v6e',0,2),
	(103,10,'of4v6i',0,3),
	(104,10,'of4v6l',0,4),
	(105,10,'of4v6q',0,5),
	(106,11,'of4v8w',1,1),
	(107,11,'of4v9a',0,2),
	(112,12,'of4vdb',0,1),
	(113,12,'of4vdi',1,2),
	(114,12,'of4vdp',0,3),
	(115,12,'of4ve2',0,4),
	(116,4,'of7n1w',1,1),
	(117,4,'of7n25',0,2),
	(118,4,'of7n29',0,3),
	(119,4,'of7n2e',0,4),
	(120,4,'of7n2j',0,5),
	(121,7,'of7na6',0,1),
	(122,7,'of7naj',0,2),
	(123,7,'of7nao',1,3),
	(125,13,'of7oi4',1,1),
	(126,14,'of7pfn',1,1),
	(127,15,'of7pwi',1,1),
	(128,15,'of7pwn',0,2),
	(129,15,'of7pws',0,3),
	(130,15,'of7px5',0,4);

/*!40000 ALTER TABLE `projects_images` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
