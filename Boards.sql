-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: boardDB
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Boards`
--

DROP TABLE IF EXISTS `Boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Boards` (
  `Board_id` int(11) NOT NULL AUTO_INCREMENT,
  `Board_name` varchar(50) DEFAULT NULL,
  `Board_uid` varchar(100) DEFAULT NULL,
  `Board_sid` varchar(100) DEFAULT NULL,
  `Board_title` varchar(30) DEFAULT NULL,
  `Board_ip` varchar(20) DEFAULT NULL,
  `Board_pass` varchar(100) DEFAULT NULL,
  `Board_status` varchar(15) DEFAULT NULL,
  `Session_id` varchar(100) DEFAULT NULL,
  `Board_Model` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Boards`
--

LOCK TABLES `Boards` WRITE;
/*!40000 ALTER TABLE `Boards` DISABLE KEYS */;
INSERT INTO `Boards` VALUES (1,'livingroom','123456789','ZfrLWtnnbW0RkgehAABu','Living Room',NULL,'$2b$10$rpjuTQbOaMBxHo8oUzzctuXHOTVHtzv1sMKMv8fnhslyHC/S.0AUO','Connected',NULL,'4S16A'),(2,'kitchen','123456790',NULL,'Kitchen',NULL,'$2b$10$paSDr1VCkQgajvwPbhqu/ODZa9aUjRM5YZ/qaBRaFoWAWhxRqDXLa','Not Connected','$2b$10$sW6J5yVPY41wgCsmg3QclOEWVTIZzVl4W4zkhHq5nZzqakqEDMbbu','4S16A');
/*!40000 ALTER TABLE `Boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sessions` (
  `Session_id` int(11) NOT NULL AUTO_INCREMENT,
  `Session_token` varchar(100) NOT NULL,
  `Session_remember` char(1) DEFAULT NULL,
  `Session_creation` varchar(25) DEFAULT NULL,
  `Session_expiry` varchar(25) DEFAULT NULL,
  `Board_id` int(11) NOT NULL,
  `Board_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES (28,'$2b$10$oUWWFOxcw21N6yHpIspm..FfTdbQfMaOEdfpG0zKsXay7Nt32c9EK','1','Thu Mar 14 2019 20:25:08 ',NULL,1,'livingroom'),(33,'$2b$10$GFzIhwzB4FhwU5Cg9P/BI.UXv7V5yE6IpEsf2AN9/GUtPBukXa4ca','1','Thu Mar 14 2019 21:09:34 ',NULL,1,'livingroom'),(34,'$2b$10$h8L7hDDXtv2r7aobIKfxweUExNzpv29ZTEnyHXmu7HLTBnxF6Foha','1','Thu Mar 14 2019 21:11:11 ',NULL,1,'livingroom'),(38,'$2b$10$1AdJHvfoOpROPnJnt3x9I.r7OEbRFn0r9Yt3qScgsI9sh7JO1o/rq','1','Fri Mar 15 2019 08:22:38 ',NULL,1,'livingroom'),(39,'$2b$10$hsGSJpoGI7gB8Awi7gn88uE.iBAIWYM/VmpqsEfXikBd9qXned/56','1','Fri Mar 15 2019 08:23:22 ',NULL,1,'livingroom'),(44,'$2b$10$lcZ4mmGfDLa5r5FUhKpVyOCozXw.2tkcnO03IV8TMkheUjtCWqhwa','1','Sun Mar 17 2019 15:59:41 ',NULL,1,'livingroom'),(46,'$2b$10$18lmYO3q9kvTkmMzx8uIL.eiNc2uApL0Pk9LgTZHHZf50WRGF1I0S','1','Mon Mar 18 2019 04:15:12 ',NULL,1,'livingroom'),(48,'$2b$10$g85/DXGbngSjTO0P6ob77eGNvngDmnM06PGWGNm6PiyBTrwuNz82.','1','Thu Mar 21 2019 11:22:21 ',NULL,1,'livingroom'),(49,'$2b$10$9IdCqpuQ5knIGHQtOemAtuGTSIcoy671Syk/3jWH./1cuJZcRF5iK','1','Thu Mar 21 2019 13:33:16 ',NULL,1,'livingroom'),(50,'$2b$10$InygMcmrtwWXKrNh67UCb./qQw6BL7aUNdWC8qYcUL0RaKymP./BC','1','Thu Mar 21 2019 13:33:17 ',NULL,1,'livingroom'),(51,'$2b$10$cTCKtFpxpJutnneG/gmXJ.uT3yN0YE/ryeeOnmLrwuAZT72N8rVJu','1','Thu Mar 21 2019 13:39:33 ',NULL,1,'livingroom'),(52,'$2b$10$T0PxL7FMd2LbqYZdXyItReTSxwUtVOHDLXiL/X5p0VzxsVtg9MB2C','1','Thu Mar 21 2019 13:42:27 ',NULL,1,'livingroom'),(53,'$2b$10$1DZeKdHIdnMKRcOWFZYY.ezf2xdEnE9X/FKKa0myJVb6qNuSCZuCO','1','Thu Mar 21 2019 13:49:12 ',NULL,1,'livingroom'),(54,'$2b$10$4.0Ea3NNR/UJbkydlyfnW.9cxleRPAEENLPRQbAukg9JDgmK8.PQO','1','Thu Mar 21 2019 13:51:59 ',NULL,1,'livingroom'),(55,'$2b$10$dVpETKwShRMGJ6WYrWa5aO/B2oTndocIEsxPveAJLOvsWzoEXBV7G','1','Thu Mar 21 2019 13:54:24 ',NULL,1,'livingroom'),(56,'$2b$10$TFsdci9skG63NfedQFY4I.i3uB7svDW/AMonxL9cL4AnZvvt7FDfS','1','Thu Mar 21 2019 13:58:42 ',NULL,1,'livingroom'),(57,'$2b$10$RU6i6UzSEmpObsfbf1LCqeD3Wxe6qhY.nu0zYC33EgNba86TmPYRC','1','Thu Mar 21 2019 14:10:23 ',NULL,1,'livingroom'),(58,'$2b$10$mekKuXT2U0wxMIgaFnboFeNffhuiVV8voLQm0w8OlYa1FGQO2ivXO','1','Thu Mar 21 2019 14:27:40 ',NULL,1,'livingroom'),(59,'$2b$10$foE60Xs9Vji7m4ZsZV7Ba.D18KPlPUU9U7sz8XdNovRoBLTQKdVR6','1','Thu Mar 21 2019 14:34:59 ',NULL,1,'livingroom'),(60,'$2b$10$.RaQL29Oob0V5ePgAX9CqO6ZthZ2UD..HDcW9ahwIuPORkm1O7ICa','1','Thu Mar 21 2019 14:40:24 ',NULL,1,'livingroom'),(61,'$2b$10$V491.nOyaRQmZqdPSziqpOfHJIHTBqBRhOMOpEbBlG5zaVX.F4zuy','1','Thu Mar 21 2019 18:40:29 ',NULL,1,'livingroom'),(64,'$2b$10$zzcL4mtHKYvNbXbbNl/xW.pUKZZbUTbtlHfI6.2oXLQtfEMVawP4O','1','Sun Mar 24 2019 07:59:52 ',NULL,1,'livingroom'),(66,'$2b$10$L3giiFmGQnnfZLSrBv9OxubR4PJ2TY9XkCm/9AurW9GbJ1UIxq7ai','1','Mon Mar 25 2019 00:46:31 ',NULL,1,'livingroom'),(69,'$2b$10$yj1Xw7.Uddjp3018byIZ6e9A0V7LW337i8RVZF4AavmRB03KZeJry','1','Mon Mar 25 2019 05:00:12 ',NULL,1,'livingroom'),(71,'$2b$10$36AG6nkmBwkhMAMtIgBnFepL7067NKbQR0oqm/DGyF43S9UfDVt4S','1','Mon Mar 25 2019 09:22:56 ',NULL,1,'livingroom'),(72,'$2b$10$9tc5PbN6ZR6NbcKMcWPY7e3rZVcwhBYK0svrMzDMdcF6yJO0x9BQK','1','Mon Mar 25 2019 09:34:35 ',NULL,1,'livingroom'),(73,'$2b$10$7FpPqubVZ7uvZemqD4jLDek6rphgeaDut9Fm7qtd6cAD4uyEF5s4e','1','Mon Mar 25 2019 15:15:07 ',NULL,1,'livingroom'),(75,'$2b$10$LB9XEAXLVEiHCYPGaeL.eOjCo49zYefexPExD2FhT4zRRVYd/Q9tS','1','Tue Mar 26 2019 16:58:54 ',NULL,1,'livingroom'),(77,'$2b$10$BsQKVc1.a2GJ49MxIE7eoOA2bLl/PdKO0Q4mqeNHtFFViShAclnjC','1','Wed Mar 27 2019 11:49:01 ',NULL,1,'livingroom'),(80,'$2b$10$QZd4FFZ9kyopiEY/TQUBSe3nhMLN10GUakzCkbzmL2Bq1NqpWbw5i','1','Wed Mar 27 2019 16:38:50 ',NULL,1,'livingroom'),(81,'$2b$10$T2BbgYaKlDRy.NZ08gTQPOrYqYh/0X4/cD47v3Z2sS2dud19aIxY2','1','Thu Mar 28 2019 03:28:18 ',NULL,1,'livingroom'),(82,'$2b$10$a3mTWOdFSnyXJ185jzfxW.P1rREbl9ONTBRQpYyLBQNLpUGw3w2ly','1','Thu Mar 28 2019 03:30:50 ',NULL,1,'livingroom'),(83,'$2b$10$ZzXNmzNX49yo6w8O2Ke8ROwV5aJm5C.oQkZ0pCQvkdsIPB/WZ4maq','1','Fri Mar 29 2019 11:39:21 ',NULL,1,'livingroom'),(85,'$2b$10$.REYmJapQ8SsuzWHpJLWIuC8BQcuA1fYRhzpZITI0kGQ6iNrvZoAi','1','Sat Mar 30 2019 06:17:16 ',NULL,1,'livingroom'),(86,'$2b$10$ItK5kAnEhPhpYQMv0z1pEeBaRKzKkWA03gKrO0qcLqFbQNa9epyBG','1','Sat Mar 30 2019 09:49:45 ',NULL,1,'livingroom'),(88,'$2b$10$V7Ko06lH8BlozBZqbjgMEu1jXBirLY2.eAPaRSnPSiL0jsIfJ7slW','1','Sun Mar 31 2019 04:30:58 ',NULL,1,'livingroom'),(89,'$2b$10$1UnYRiNsW7v.ktZx.m2gQeq6TJ4NHZF53Xfklgnawkt2b2JWt/r92','0','Sun Mar 31 2019 17:08:02 ',NULL,1,'livingroom'),(91,'$2b$10$Mytp9H7SlodTtkAgAiCYr.lfMXSe7lV7IOXOC5GSlhDBBUXOu6iG.','1','Sun Mar 31 2019 17:58:27 ',NULL,1,'livingroom'),(94,'$2b$10$KLmmTVjPqOWI4K7BCaFDveYgbkqQFYrMqOq8P14T4hveM1WTmv75q','1','Mon Apr 01 2019 03:47:39 ',NULL,1,'livingroom'),(105,'$2b$10$wWlaalRl2qZt4Vz5moOdDezpoMJy0wJO2yfkKWLAYsXKRkcxQJAru','1','Mon Apr 01 2019 12:14:30 ',NULL,1,'livingroom'),(106,'$2b$10$TEtqKNNpfz9ANPWBBZh7HOFihCrdgKLy6N/t11yq9qBY7h9xPG6z2','1','Mon Apr 01 2019 12:26:35 ',NULL,1,'livingroom'),(108,'$2b$10$/5tJtJGL.A8FydnNzlXkiOmTev/LZUiJckVpKfy64b6T2k.st5cZS','1','Tue Apr 02 2019 15:01:01 ',NULL,1,'livingroom'),(109,'$2b$10$XwmaErshmZTTa2/B8mdumuvBV9FjoUBke/Hod.cRHkZfHiqj9u4Te','1','Tue Apr 02 2019 15:17:04 ',NULL,1,'livingroom'),(111,'$2b$10$JcGjlUAVGK8JpNiq3DQiXebiJUEfSU/scdwbI9rKjlnit.n1xCFTC','1','Wed Apr 03 2019 15:48:08 ',NULL,1,'livingroom'),(112,'$2b$10$RuxWtpirkANR6bDDIsTsk.K1OCsSBlGmTGkocuLdMz12lx/5kxi3C','1','Thu Apr 04 2019 15:30:38 ',NULL,1,'livingroom'),(115,'$2b$10$KRTgNnP6A03SDFqii6SyeeKliiTs9CrhhQ00hYw9.GI6yof3HVBOm','1','Thu Apr 04 2019 15:59:46 ',NULL,1,'livingroom'),(117,'$2b$10$CZIeqzTB3NPJG1/1246queKdOSGk7nts4Z67QzfkzYxW290JMEFtu','1','Thu Apr 04 2019 16:14:57 ',NULL,1,'livingroom'),(119,'$2b$10$5Y6AtDgwkL.n/vsN2USPwONsbWqKqTD6fvIsSNB6kcwplEe0MkQru','1','Sun Apr 07 2019 09:34:59 ',NULL,2,'kitchen'),(120,'$2b$10$0P16l0LUaHdnZD713iF4GOqxvREkG6rOofhiWS3wGn/zTe14UCuG.','1','Wed Apr 10 2019 14:27:24 ',NULL,1,'livingroom'),(122,'$2b$10$h3XTpafuZYa7efWMSwixee1/OLnSt3HyuHbsExVkRDmBY6s/xrRrS','1','Thu Apr 11 2019 15:53:34 ',NULL,1,'livingroom'),(124,'$2b$10$uvziOQRlqS2jKukSgiDBuepBCFy6Bhocj6vCcnlxJR5GkW1Dhy7d.','1','Fri Apr 12 2019 17:19:41 ',NULL,1,'livingroom'),(125,'$2b$10$fFErQd/vGQYJHN5p.j5Rc.Jil8iHKXxuAVPl1pUDYQigeqABvFnpu','1','Sat Apr 13 2019 02:31:40 ',NULL,1,'livingroom'),(126,'$2b$10$y9wjz1DXxmYIZ5/1ZdSMru1HhxZIsEq/FK8B9pJRRE9uCrmsGRouy','1','Sun Apr 14 2019 14:16:38 ',NULL,1,'livingroom'),(127,'$2b$10$4NrewTQIdpvI1hxbN68mneMGC5EVOGSwGcaLMmEpvAZt6/19XCbWq','1','Sun Apr 14 2019 15:02:12 ',NULL,1,'livingroom'),(128,'$2b$10$NnHPhOI7CjGIXjkD7vGyJ.4jNH2j4nYMeUH5Q2qD5.P/PSLYyGI7y','1','Thu Apr 18 2019 03:21:19 ',NULL,1,'livingroom'),(129,'$2b$10$RvEpJlKVs24kApXXTK4Q1eECS3wlzFZv/MeXBdWIHefvPMImuq9nS','1','Thu Apr 18 2019 16:43:45 ',NULL,1,'livingroom'),(131,'$2b$10$uE33g1aWvBrF1wxyMyI93..kiSuCIheygO0WgKDAmXZ94tWszPrtq','1','Fri Apr 19 2019 16:24:59 ',NULL,1,'livingroom'),(132,'$2b$10$EOLJml32zvS1hvmrW9e1.OmjdRJ/RBuWUPtK6yFajCuPeDUUF/.oy','1','Sat Apr 20 2019 03:58:21 ',NULL,1,'livingroom'),(133,'$2b$10$RT7z6sTlDmKKTx8QBxbGx.nbsooo5H67wCErk0sCCB7WiWOZBiGnS','1','Sat Apr 20 2019 03:58:22 ',NULL,1,'livingroom'),(135,'$2b$10$G6vYcq.ZEU8nRLOLLJu28up.MQe34TmQn9i0NvJ3qZ09TRgyOv3yS','1','Sun Apr 21 2019 07:17:47 ',NULL,1,'livingroom'),(136,'$2b$10$Qzd/xmYZus9hHmyPaFlOjugfOZ5W3tZ1cwlbfq8e2ydW/f.ryc53C','1','Tue Apr 23 2019 08:33:46 ',NULL,1,'livingroom'),(137,'$2b$10$95qD9ltH/74/o8f6tfGKeORiKrkBqVOShGDegUT9VUt8ISAgHrBZ2','1','Tue Apr 23 2019 08:35:07 ',NULL,1,'livingroom'),(138,'$2b$10$VvetmUFhjEZ6SEYKjI8F7u29tOcxczPRAu0cYr7YXec9lJnhwYV3m','1','Fri Apr 26 2019 16:37:53 ',NULL,1,'livingroom'),(139,'$2b$10$04cGk.NrG/EFebuXQuWHJubJMJmI/bXp8IcUC.XU6zvNcabzRFe4.','1','Tue Apr 30 2019 16:15:06 ',NULL,1,'livingroom'),(140,'$2b$10$9RlZezfNpTuvyyfpEdql.OYCqY33UjUXkX.eZEBlgwOY6P6FAYL6a','1','Tue Apr 30 2019 16:15:07 ',NULL,1,'livingroom'),(141,'$2b$10$tKULSIdBSw/pM83ZUaPIjOyYWDefajIJFJM6FL5AVdeaw/FhrTCti','1','Wed May 01 2019 06:56:12 ',NULL,1,'livingroom'),(142,'$2b$10$oxquq.ZG84YLn8QGknUbBOOWcN03Sx.AvCl.hoBdto8SGj2OMGu16','1','Mon May 06 2019 09:45:04 ',NULL,1,'livingroom'),(143,'$2b$10$WBdddRAO7zz.DUKdD1/3uOT35woARWivmqOLtrZiYthMsynE0x3Cu','1','Mon May 06 2019 09:45:05 ',NULL,1,'livingroom'),(144,'$2b$10$m5pHKEvU2Xz24hGa4kbkYu6PnDWjKXn/BIaonr1h.JOFbRB/V/K7S','1','Mon May 06 2019 10:28:29 ',NULL,1,'livingroom'),(145,'$2b$10$kI29nYNTfaqiUqeMm3/R/.RtpzhuVRwSEjerCyeEDRUvCrnE7ABmu','1','Mon May 06 2019 10:28:30 ',NULL,1,'livingroom'),(146,'$2b$10$Gqd57UGH4LAC7Ho1nQWFhOdKmiLxY1SjErxGZLOKdA8u8UqSozIqi','1','Thu May 16 2019 12:39:37 ',NULL,1,'livingroom'),(147,'$2b$10$X3b7vfmCE2cRUTwOVbBGE.4RSiRz3HLNdAI1D8XoXS.OUCryFKQ9q','1','Thu May 16 2019 12:39:39 ',NULL,1,'livingroom'),(148,'$2b$10$Jy7TOprmR/my0Up97RhBB.7CWEaVEWgayo6lRDEuUduMOM356LDNa','1','Wed May 22 2019 15:54:51 ',NULL,1,'livingroom'),(149,'$2b$10$rc1wdHC1MoMdTfbwhruzMORB1IYYmBXXcdpnbcuvyL7N7ZWJCdxk6','1','Wed May 22 2019 15:54:51 ',NULL,1,'livingroom'),(151,'$2b$10$4a9LHGYMY.XRuJHmeS3wlemYCbYWVSTJBpheFgskavkOPu.EbU8Ba','1','Mon Jun 17 2019 03:24:45 ',NULL,1,'livingroom'),(152,'$2b$10$iEydaP1NTSKNzGnoXmexLuYLUT/2b4TwW/WYRt1lpuny7xqBSwadO','1','Mon Jun 17 2019 09:32:20 ',NULL,1,'livingroom'),(153,'$2b$10$gEjLRQSlZnZqnys5ZRAz5Ocs0Ze2nnkDyKiiT7DHTjMbtljbeVzC.','1','Mon Jun 17 2019 09:32:22 ',NULL,1,'livingroom'),(154,'$2b$10$2AFA.hIyYqYa3vKbSGq.NO/QRAaASimnpebe/qtmtlvAtWBHXndpe','1','Mon Jun 17 2019 14:49:06 ',NULL,1,'livingroom'),(156,'$2b$10$FQ44enlHY7/xWeKPW8di7unYLHpS2bH2.l/ePYL6ah0ktWRSiOCUG','1','Sun Jun 23 2019 09:22:57 ',NULL,1,'livingroom'),(158,'$2b$10$F/sxVW7X/MM5dYl35y38I.LQSfwIVlVIFNc4ltdbswxf9Dt.NMl6u','1','Mon Jun 24 2019 18:52:48 ',NULL,1,'livingroom'),(159,'$2b$10$ItdlD9S8AwsnDYTwjmrLxevvm9uDKm76T2j1Q4hYqCkrXJ7QL2jHq','1','Mon Jun 24 2019 19:45:06 ',NULL,1,'livingroom'),(161,'$2b$10$xopibSx7m9AERyb5hpPOGODRdApHy7CH4Lryn64Fb6hQPnkyN2aDm','1','Tue Jul 02 2019 16:27:02 ',NULL,1,'livingroom'),(162,'$2b$10$NYkoD/pgyJp8CIaI6IbDIOrPpbe99vcI8GFCiQUDlKkzh2mFvt5v6','1','Tue Jul 02 2019 16:27:03 ',NULL,1,'livingroom'),(163,'$2b$10$lWQZvsq2Zmtw4hT4B2PBQuKW35fUrnLhlDQQxt7WIjmH8bjO6Xzpi','1','Thu Jul 04 2019 16:26:01 ',NULL,1,'livingroom'),(164,'$2b$10$brVamKmH5LKZThkNHkkACucaZtkGr9SawxfWBCcCfjbnaXKRYWmUy','1','Tue Jul 09 2019 16:17:13 ',NULL,1,'livingroom'),(165,'$2b$10$nJXFWip5m6HpHgzO.bqQW.RfY089wntBNWy9ekFZxMKXNLuIlUI1S','1','Wed Jul 10 2019 08:08:58 ',NULL,1,'livingroom'),(166,'$2b$10$lSj/tz48.36/bQzXLz5wneA.iQjIS1q1sbmloPwwq.4qjgXeK/qqW','1','Thu Jul 11 2019 04:38:24 ',NULL,1,'livingroom'),(167,'$2b$10$A9yCcoTa/3OW16xC3ihiLega5b.EHOvOzBRMnMoGOvh8dVTLfwyEq','1','Thu Jul 11 2019 04:40:02 ',NULL,1,'livingroom'),(169,'$2b$10$dQhBlM7OUDtpaxzMwrqv.OpbKysHaG9uXEY39WFycBEE2fojwfUWO','1','Fri Jul 12 2019 16:21:53 ',NULL,1,'livingroom'),(170,'$2b$10$0HEESId/1I9eCIG8RQmx7e8foTaDfX5Pw4VLZBj5KVCUlWx8oQvca','1','Sun Jul 14 2019 11:02:48 ',NULL,1,'livingroom'),(171,'$2b$10$PcmO/BUU1/2XENz3xHQJs.BqPX3jfEDGB18zMlBHlJLfnb3yoOYxO','1','Sun Jul 14 2019 11:02:49 ',NULL,1,'livingroom');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sockets`
--

DROP TABLE IF EXISTS `Sockets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sockets` (
  `Socket_id` int(11) NOT NULL AUTO_INCREMENT,
  `Board_id` int(11) DEFAULT NULL,
  `Socket_No` int(11) DEFAULT NULL,
  `Socket_Name` varchar(30) DEFAULT NULL,
  `Socket_State` varchar(5) DEFAULT NULL,
  `Socket_ReqState` varchar(5) DEFAULT NULL,
  `Socket_Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Socket_id`),
  KEY `Board_id` (`Board_id`),
  CONSTRAINT `Sockets_ibfk_1` FOREIGN KEY (`Board_id`) REFERENCES `Boards` (`Board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sockets`
--

LOCK TABLES `Sockets` WRITE;
/*!40000 ALTER TABLE `Sockets` DISABLE KEYS */;
INSERT INTO `Sockets` VALUES (1,1,1,'Main Light','OFF','OFF','Updating'),(2,1,2,'Night Light','OFF','ON','Updating'),(3,1,3,'TV','OFF','ON','Updating'),(4,1,4,'Ceiling Fan','OFF','OFF','Updating'),(6,2,1,'Main Light','OFF','ON','Updating'),(7,2,2,'Mixer','OFF','ON','Updating'),(8,2,3,'Exhaust Fan','OFF','ON','Updating'),(9,2,4,'Oven','OFF','ON','Updating');
/*!40000 ALTER TABLE `Sockets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-15 16:55:19
