-- MySQL dump 10.13  Distrib 5.5.32, for Linux (x86_64)
--
-- Host: localhost    Database: textfacedb
-- ------------------------------------------------------
-- Server version	5.5.32-cll-lve

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
-- Table structure for table `faces`
--

DROP TABLE IF EXISTS `faces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faces` (
  `id` int(11) NOT NULL,
  `face` text,
  `uses` int(11) DEFAULT NULL,
  `name` text,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faces`
--

LOCK TABLES `faces` WRITE;
/*!40000 ALTER TABLE `faces` DISABLE KEYS */;
INSERT INTO `faces` VALUES (0,'ヽ༼ຈل͜ຈ༽ﾉ',7000,'Raise your dongers!','Raise your dongers!'),(1,'¯\\_(ツ)_/¯',14394,'sup-son','sup son? / shrug'),(2,'(╯°□°）╯︵ ┻━┻',3052,'table-flip','Table Flip'),(3,'ಠ_ಠ',8203,'look-of-disapproval',' Look of Disapproval'),(4,'ಥ_ಥ',2345,'y-u-do-dis','y u do dis'),(5,'⊙▃⊙',1141,NULL,NULL),(6,'╚(ಠ_ಠ)=┐',779,NULL,NULL),(7,'┌( ಠ_ಠ)┘',1528,NULL,NULL),(8,'◉_◉',983,NULL,NULL),(9,'[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]',2083,'5-dollars','5 dollars'),(10,':\')',254,NULL,NULL),(11,'(͡° ͜ʖ ͡°)',1965,'le-lenny-face','le lenny face'),(12,'¯(°_o)/¯',1139,NULL,NULL),(13,'┬──┬ ノ( ゜-゜ノ)',1196,'putting-table-down','Calmly putting table down'),(14,'(/) (°,,°) (/)',604,'zoidberg','Crab/Zoidberg'),(15,'>_>',255,NULL,NULL),(16,'<_<',254,NULL,NULL),(17,'ب_ب',717,NULL,NULL),(18,'(^̮^)',264,NULL,NULL),(19,'ʘ‿ʘ',1170,NULL,NULL),(20,'ಠ⌣ಠ',14263,NULL,NULL),(21,'ಠ‿ಠ',427,NULL,NULL),(22,'(ʘ‿ʘ)',557,NULL,NULL),(23,'(ಠ_ಠ)',1061,NULL,NULL),(24,'(ಠ⌣ಠ)',614,NULL,NULL),(25,'(ಠ‿ಠ)',378,NULL,NULL),(26,'♥‿♥',1604,'love-heart-eyes','Love Heart Eyes'),(27,'◔̯◔',658,NULL,NULL),(28,'٩◔̯◔۶',544,NULL,NULL),(29,'⊙﹏⊙',1003,NULL,NULL),(30,'Ƹ̵̡Ӝ̵̨̄Ʒ',922,NULL,NULL),(31,'(¬_¬)',337,'shifty-face','Shifty Face'),(32,'(；一_一)',551,NULL,NULL),(33,'(･.◤)',301,NULL,NULL),(34,'◕‿↼',1037,NULL,NULL),(35,'(¬‿¬)',798,NULL,NULL),(36,'(づ￣ ³￣)づ',2294,'kissy-face','Kissy Face'),(37,'(ಥ_ಥ)',6509,NULL,NULL),(38,'(ಥ﹏ಥ)',868,NULL,NULL),(39,'ლ(ಠ益ಠლ)',2909,'but-at-what-cost','BUT AT WHAT COST? / Y U NO'),(40,'ʕ•ᴥ•ʔ',6089,NULL,NULL),(41,'°Д°',544,NULL,NULL),(42,'﴾͡๏̯͡๏﴿ O\'RLY?',3133,'orly','ORLY'),(43,'(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',3006,NULL,NULL),(44,'(ᵔᴥᵔ)',2192,'bear-face','Bear'),(45,'(•ω•)',810,NULL,NULL),(46,'☜(⌒▽⌒)☞',1027,NULL,NULL),(47,'〆(・∀・＠)',393,NULL,NULL),(48,'◔ ⌣ ◔',389,NULL,NULL),(49,'ლ(´ڡ`ლ)',1280,NULL,NULL),(50,'ლ,ᔑ•ﺪ͟͠•ᔐ.ლ',1085,NULL,NULL),(51,'ᕙ(⇀‸↼‶)ᕗ',2232,NULL,NULL),(52,'๏̯͡๏﴿',545,NULL,NULL),(53,'ಠ~ಠ',463,NULL,NULL),(54,'ಠoಠ',364,NULL,NULL),(55,'ರ_ರ',400,NULL,NULL),(56,'ಠ╭╮ಠ',2643,NULL,NULL),(57,'☼.☼',399,NULL,NULL),(58,'(づ｡◕‿‿◕｡)づ',4673,NULL,NULL),(59,'ᄽὁȍ ̪ őὀᄿ',1057,NULL,NULL),(60,'▄︻̷̿┻̿═━一',1559,'gun','Gun'),(61,'◕‿◕',486,NULL,NULL),(62,'｡◕‿◕｡',488,NULL,NULL),(63,'｡◕‿‿◕｡',686,NULL,NULL),(64,'^̮^',255,NULL,NULL),(65,'(◕‿◕)',507,NULL,NULL),(66,'(｡◕‿◕｡)',986,NULL,NULL),(67,'(｡◕‿‿◕｡)',1603,NULL,NULL),(68,'┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻',2122,'double-table-flip','Double Table Flip'),(69,'(ノಠ益ಠ)ノ彡┻━┻',2244,NULL,NULL),(70,'（╯°□°）╯︵( .o.) ',1614,'flipping-person','Flipping Person'),(71,'┬─┬﻿ ︵ /(.□. ）',884,'table-flips-me','Table flips you!'),(74,'̿ ̿ ̿\'̿\'̵͇̿̿з=(•_•)=ε/̵͇̿̿/\'̿\'̿ ̿',2667,NULL,NULL),(75,'⌐╦╦═─',726,NULL,NULL),(76,'(´・ω・)っ由',633,NULL,NULL),(77,'͡° ͜ʖ ͡°',2191,NULL,NULL),(78,'( ﾟヮﾟ)',507,NULL,NULL),(79,'(•_•) ( •_•)>⌐■-■ (⌐■_■)',2347,'csi-deal-with-it','CSI opening YEAHHHHH / Deal with it'),(80,'┬─┬ノ( º _ ºノ)',686,'calm-table','Calmly putting table down'),(81,'( ͡° ͜ʖ ͡°)',10189,NULL,NULL),(83,'(─‿‿─)',557,NULL,NULL),(84,' (•◡•) /',1835,NULL,NULL),(85,'≧☉_☉≦',351,NULL,NULL),(86,'☉_☉',572,NULL,NULL),(87,'(ง\'̀-\'́)ง',2854,NULL,NULL),(88,'=U',254,NULL,NULL),(89,'(~_^)',255,NULL,NULL),(90,'(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)',4602,NULL,NULL),(91,'(ʘᗩʘ\')',719,NULL,NULL),(92,'(⊙ω⊙)',537,NULL,NULL),(93,'(╯°□°)╯︵ ʞooqǝɔɐɟ',3388,'flipping-facebook','Flipping Facebook'),(94,'ヾ(⌐■_■)ノ♪',1819,'gangnam-style-face','Gangnam Style'),(95,'| (• ◡•)| (❍ᴥ❍ʋ)',2927,'finn-and-jake-adventure-time','Finn and Jake from Adventure Time!'),(96,'┬┴┬┴┤(･_├┬┴┬┴',2676,'hiding-behind-wall','Hiding behind wall'),(97,'(ó ì_í)=óò=(ì_í ò)',531,NULL,NULL),(98,'(°ロ°)☝',1320,NULL,NULL),(99,'¬_¬',333,NULL,NULL),(100,'(☞ﾟ∀ﾟ)☞',2300,NULL,NULL),(101,'(._.) ( l: ) ( .-. ) ( :l ) (._.)',2025,NULL,NULL),(102,'(  ⚆ _ ⚆ )',465,NULL,NULL),(103,'(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ)',1692,NULL,NULL),(104,'(´・ω・`)',920,'denko','Denko'),(105,'ಠ_ಥ',755,NULL,NULL),(106,'⚆ _ ⚆',897,NULL,NULL),(420,'༼ つ ◕_◕ ༽つ ',7000,'Give DIRETIDE','Volvo plz give DIRETIDE');
/*!40000 ALTER TABLE `faces` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-02-28  8:15:08
