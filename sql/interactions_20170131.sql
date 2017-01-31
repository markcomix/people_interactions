-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: globant_interaction
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `application_actions`
--

DROP TABLE IF EXISTS `application_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_actions` (
  `aa_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `aa_name` varchar(45) DEFAULT NULL,
  `aa_weight` int(11) DEFAULT '0',
  `aa_app_id` int(11) NOT NULL,
  PRIMARY KEY (`aa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_actions`
--

LOCK TABLES `application_actions` WRITE;
/*!40000 ALTER TABLE `application_actions` DISABLE KEYS */;
INSERT INTO `application_actions` VALUES (2,'COMMENT',3,1),(3,'LIKE',2,1),(4,'COMMENT',5,2),(5,'LIKE',4,2),(6,'GIVE_FEEDBACK',5,3),(7,'GIVE_STAR',5,4),(8,'COMMENT',5,4),(9,'LIKE',5,4),(10,'GIVE_STAR',3,5),(11,'COMMENT',3,5);
/*!40000 ALTER TABLE `application_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `app_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `app_name` varchar(45) DEFAULT NULL,
  `app_community_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,'STARMEUP',1),(2,'MEETAGS',1),(3,'FEEDBACK',1),(4,'SMU_DAVIVIENDA',2),(5,'SMU_SANTANDER',3);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interaction_logs`
--

DROP TABLE IF EXISTS `interaction_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interaction_logs` (
  `il_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `il_user_from_id` varchar(140) NOT NULL,
  `il_user_to_id` varchar(140) NOT NULL,
  `il_creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `il_app_id` int(11) NOT NULL,
  `il_app_action_id` int(11) NOT NULL,
  PRIMARY KEY (`il_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interaction_logs`
--

LOCK TABLES `interaction_logs` WRITE;
/*!40000 ALTER TABLE `interaction_logs` DISABLE KEYS */;
INSERT INTO `interaction_logs` VALUES (1,'javier.loucim@globant.com','marcos.buricchi@globant.com','2017-01-31 12:00:26',1,1),(2,'javier.loucim@globant.com','marcos.buricchi@globant.com','2017-01-31 12:00:26',1,3),(3,'marcos.buricchi@globant.com','javier.loucim@globant.com','2017-01-31 12:00:26',1,3),(4,'ignacio.pena@globant.com','marcos.buricchi@globant.com','2017-01-31 12:00:26',1,3),(5,'marcos.buricchi@globant.com','javier.loucim@globant.com','2017-01-31 12:00:26',2,5),(6,'ignacio.pena@globant.com','javier.loucim@globant.com','2017-01-31 12:00:26',2,5),(7,'ignacio.pena@globant.com','javier.loucim@globant.com','2017-01-31 12:00:26',2,4);
/*!40000 ALTER TABLE `interaction_logs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-31 12:17:31
