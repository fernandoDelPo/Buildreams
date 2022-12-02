-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: buildreams
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP DATABASE IF EXISTS `buildreams`;
CREATE DATABASE `buildreams`;
USE `buildreams`

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'cementos'),(2,'herramientas'),(3,'hierro/chapas'),(4,'ladrillos'),(5,'agua/gas'),(6,'instalaciones'),(7,'aberturas');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `stock` int(11) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `categoria_id` int(10) unsigned NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(100) NOT NULL,
  `descuento` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productos_FK` (`categoria_id`),
  CONSTRAINT `productos_FK` FOREIGN KEY (`categoria_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (10,'PLASTICOR 40KG','Loma negra',1194,150,'verde oscuro',1,'El Cemento de Albañilería Plasticor es un producto que se obtiene de la molienda conjunta de clinker portland, adiciones minerales y aditivos que mejoran la plasticidad, trabajabilidad, adherencia y retención de agua, convirtiéndolo en un producto apto para diferentes obras de albañilería.','plasticor-loma-negra-40kg.jpg',0),(11,'LADRILLO HUECO 8X18X33 6AG','Buildreams',104,1500,'anaranjado',4,'Ladrillo hueco 8cm de ancho, 18cm alto, 33cm de largo','ladrillo-hueco.jpg',0),(12,'BARRA HIERRO aletado ø10mm x 12m','Acindar',2300,2300,'plateado',3,'Presenta aletas o corrugas que mejoran la adherencia con el hormigón, y poseen una gran ductilidad la cual permite que las barras se puedan cortar y doblar con mayor facilidad. Recomendado especialmente para construir elementos estructurales de hormigón armado. Se presenta en barras de ø10mm x 12m.','Barra-Hierro-10x12.jpg',0),(13,'HIDROFUGO 20GK','Sineplast',3500,345,'blanco',7,'Aditivo en pastaformulado especialmente para agregar a mezclas cementicias para realizar aislaciones hidrófugas.','hidrofugo.jpg',10),(14,'REVOQUE 2 EN 1 PROYECTABLE 3OKG','Weber',2760,546,'blanco',1,'Para La realización De revoques interiores aplicados con máquina proyectable (Duo Mix Plus E, Monojet, G4, Etc.).','Revoque2-en-1.jpg',15),(15,'YEMACO 40KG','Durlock Yeso Tradicional',4160,546,'blanco',1,'Yeso tradicional para la construcción. Ideal para realizar enluidos de paredes y cielorrasos Se aplica en forma manual y se utiliza en todo tipo de obras.','yeso.jpg',20),(16,'PASTINA LISTA GRIS PERLA 1KG','Weber',1800,123,'gris perla',7,'Pastina acrílica mono componente lista para usar. Ideal para el relleno o renovación de juntas de hasta 4mm, entre cerámicas, porcellanatos y piezas preferentemente esmaltadas. De uso interior y exterior sin riesgos de estanqueidad de agua.','pastina.jpg',10),(17,'Cemento Robusto','Loma Negra',1600,230,'verde',1,'Cemento para contrapiso','imagen-1668725165693.jpg',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `nick` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'matias','maty','arg','maty123@gmail.com','admin','default.png','maty123');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `user_product`
--

DROP TABLE IF EXISTS `user_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cliente_productos_FK` (`user_id`),
  KEY `cliente_productos_FK_1` (`product_id`),
  CONSTRAINT `cliente_productos_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `cliente_productos_FK_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_product`
--

LOCK TABLES `user_product` WRITE;
/*!40000 ALTER TABLE `user_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'buildreams'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-02 15:35:38
