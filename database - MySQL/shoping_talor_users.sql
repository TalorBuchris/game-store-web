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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `userName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(45) DEFAULT '"USER"',
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (32,'טל דבורה','שושן','טל דבורה','tt@gmail.com','$2a$15$xHi2.g3I9LMVidO7bAc1G.pn6d5mD.4.8vLbH9WDgud4ea3UCWczi','USER','0555454652','נחליאל נופך 7'),(36,NULL,NULL,'שירלי ישר','talor@gmail.com','$2a$15$eNKHHaPnECFxsfPQLzId5eEZfrI2YlON7cjRDaehw82YnlMnhWGKq','USER',NULL,NULL),(38,'טלאור','בוכריץ','טלאור','talor@gmail.com','$2a$15$tyrQiiKldfE.FKKfw.d8guhxpCWEYXt/U7ydipCCyMtRBQUiPLhmu','ADMIN','0556781831','בירינבוים 35'),(39,NULL,NULL,'טלאור בוכריץ','talor@gmail.com','$2a$15$hIxf8rt8PUFy.65/LRJ.n.ntR/kIiAEx0CJYqGkeN.f8G29zWEf9K','ADMIN',NULL,NULL),(40,NULL,NULL,'טל','talor@gmail.com','$2a$15$J0UZ14O0cMNugv8FYTfLpeic3ALJcHHBYcqtTFx0Hs/DMkCcIZq.a','USER',NULL,NULL),(41,NULL,NULL,'טלטל','talor@gmail.com','$2a$15$1Yh5UECQbvD0H.wfeZcz3.udrA271/cynfSXaSmSBGpjqM0E/gH6y','USER',NULL,NULL),(42,NULL,NULL,'מוריה','talor@gmail.com','$2a$15$ticqbaqNNc01WpLAKCJIg.Jw8mmHZDQKcJJrgG5gcxeTkK91ImnRW','USER',NULL,NULL),(43,NULL,NULL,'דבורה','tt@gmail.com','$2a$15$Y9SIN.LZ7lRdQmDZTvDn5.CZHGgj/k4n6AmE7EQWIGqWbYtZe2Bw2','USER',NULL,NULL),(44,NULL,NULL,'jjj','tt@gmail.com','$2a$15$EI7dMAzV9prY2A6NTWTjLexodlL9sIcEoztV3BouJkwyHIrHM/9/y','USER',NULL,NULL),(45,NULL,NULL,';;;','tt@gmail.com','$2a$15$3dRikVSLtRYStb07sf4J0uaASxpBub5qpMUEOeOt8dcI1c463XPJq','USER',NULL,NULL),(46,NULL,NULL,';h','tt@gmail.com','$2a$15$GaQydK6BfLven97kl7LcTuU.AdkAgHVATNT8l5X.OdiacA3f3wfKG','USER',NULL,NULL),(47,NULL,NULL,'aaaa','tt@gmail.com','$2a$15$Zajd1NDtxpvFqj4.lMyy2uUfsYacuC08q1uW8rsx82a4UT1AqcXB6','USER',NULL,NULL),(48,NULL,NULL,'bbbbb','tt@gmail.com','$2a$15$tIOxxE7/nTMSw1d53VHDB.erMxdtHv1n.mRZ5.1EIxUKGFXmjiEOC','USER',NULL,NULL),(49,NULL,NULL,'fgff','Moria123@gmail.com','$2a$15$PFxjerT2kU1BtftG/uosj.oTRNsraxfMiKEUwG4OK/M4dkPFa4A2q','USER',NULL,NULL),(50,NULL,NULL,'סיון','talor@gmail.com','$2a$15$iyFm1dYx3QsOYr3tBxZX/.S5rYhaIU8ieayDsjQ8Gt3pD1Sez.zhi','USER',NULL,NULL),(63,'טלאור','בוכריץ','xxxxx','talor@gmail.com','$2a$15$4MmxDlUL6junCOGylXeeHepBXcaMBV.bbWnSx40eksA7RFEVhmUC6','USER','0556781831','בירינבוים'),(64,'','בוכריץ','aaaa','talorbuc@gmail.com','$2a$15$kz4Um6wzkI724K11MAL1ouH0tx.rD7FRXRTif7xeN2uKN83YP.U.i','USER','','Los-Angelese'),(65,'סיון סס','מימון','yyyyy','talor@gmail.com','$2a$15$h2iGQUT3ditE42BdLiGlousSF89lxXaK/H7WZsSWQ.4VB..3rm18u','USER','0556781831','זמרת 70');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
