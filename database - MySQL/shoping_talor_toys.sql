-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: shoping_talor
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `toys`
--

DROP TABLE IF EXISTS `toys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `toys` (
  `toyId` int NOT NULL AUTO_INCREMENT,
  `toyName` varchar(45) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `dateOfManufacture` date DEFAULT NULL,
  `imgUrl` varchar(500) DEFAULT NULL,
  `active` tinyint DEFAULT '1',
  PRIMARY KEY (`toyId`),
  KEY `categoryId_idx` (`categoryId`),
  CONSTRAINT `categoryId` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `toys`
--

LOCK TABLES `toys` WRITE;
/*!40000 ALTER TABLE `toys` DISABLE KEYS */;
INSERT INTO `toys` VALUES (1,'פאזל אותיות',34,'24 חלקים',1,'2025-03-01','pazzel2.jfif',0),(5,'שחמט',20,'משחק איכותי מאוד',2,'2025-03-26','chess.jfif',1),(6,'בימבה ג\'וק',80,'מתאימה לגילאי 2-7',3,'2025-03-28','bimba.jfif',1),(7,'לגו',80,'מאות חלקים בגדלים שונים',7,'2004-04-15','lego.jfif',1),(8,'מנקלה',25,'גילאי 9-99',2,'2025-03-28','mankale.jfif',1),(9,'מגלשה ונדנדות לחצר',950,'נשאר במשך שנים, יציב מאוד',3,'2025-03-28','homeInOut.jfif',1),(11,'בית עם מגלשה לחצר',300,'משחק שילדים מאוד אוהבים',3,NULL,'smallHome.jfif',1),(12,'חבל קפיצה',15,'באורך שני מטרים',3,NULL,'rope.jfif',1),(13,'תלת אופן לנשיאת ילדים',50,'מאוד נוח לשימוש גם לאורך זמן',7,NULL,'childBike.jfif',1),(14,'תלת אופן',60,'בצבעי כחול שחור וורוד',3,NULL,'bike.jfif',1),(15,'פליימוביל קטן',19,'ילד פצוע',7,NULL,'playmobilSmall1.jfif',1),(23,'פליימוביל מכבי אש',139,'באורך שני מטרים',5,NULL,'firePlaymobil.jfif',1),(24,'פליימוביל משפחה',150,'באורך שני מטרים',2,'2000-05-00','playmobilHome.jfif',1),(25,'פאזל עולם הרגשות שלי',70,'מפתח את רגשות הילד בצורה נכונה',5,NULL,'pazzel.jfif',1),(32,'פאזל תחבורה',54,'70 חלקים',1,NULL,'pazzel3.jfif',1),(77,'קורקינט',120,'לילדים מעל גיל 9',3,'2025-03-19','logo.png',0),(78,'קורקינט',120,'לילדים מעל גיל 9',3,'2025-03-19','logo.png',0),(79,'קורקינט',120,'לילדים מעל גיל 9',3,'2025-03-02','logo.png',0),(80,'hgjgj',12,'bvgfv',2,'2222-05-10','pazzel2.jfif',0);
/*!40000 ALTER TABLE `toys` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-27 13:09:57
