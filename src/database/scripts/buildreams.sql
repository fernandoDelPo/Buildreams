CREATE DATABASE  IF NOT EXISTS `buildreams` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `buildreams`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: buildreams
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Herramientas\n '),(2,'Cementos/Cal'),(3,'Aberturas'),(4,'Hierros/Chapas'),(5,'Ladrillos'),(6,'Agua/Gas'),(7,'Instalaciones'),(8,'Pinturas');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `stock` int NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `enOferta` tinyint DEFAULT NULL,
  `categoria_id` int unsigned NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `descuento` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productos_FK` (`categoria_id`),
  CONSTRAINT `productos_FK` FOREIGN KEY (`categoria_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'PLASTICOR 40KG','Loma Negra',2100,1000,'Otros',0,2,'El Cemento de Albañilería Plasticor es un producto que se obtiene de la molienda conjunta de clinker portland, adiciones minerales y aditivos que mejoran la plasticidad, trabajabilidad, adherencia y retención de agua, convirtiéndolo en un producto apto para diferentes obras de albañilería.','imagen-1670512271469.jpg',0),(2,'LADRILLO HUECO 8X18X33 6AG','Buildreams',230,10000,'Naranja',0,5,'Ladrillo hueco 8cm de ancho, 18cm alto, 33cm de largo','imagen-1670449413666.jpg',0),(3,'BARRA HIERRO aletado ø10mm x 12m','Acindar',2200,1000,'Acero',0,4,'Presenta aletas o corrugas que mejoran la adherencia con el hormigón, y poseen una gran ductilidad la cual permite que las barras se puedan cortar y doblar con mayor facilidad. Recomendado especialmente para construir elementos estructurales de hormigón armado. Se presenta en barras de ø10mm x 12m.','imagen-1670450316333.jpg',0),(4,'HIDROFUGO 20GK','Sinteplast',2500,230,'Blanco',1,2,'Aditivo en pastaformulado especialmente para agregar a mezclas cementicias para realizar aislaciones hidrófugas.','imagen-1670450728448.jpg',5),(5,'REVOQUE 2 EN 1 PROYECTABLE 3OKG','Weber',3100,400,'Gris Oscuro',1,2,'Para La realización De revoques interiores aplicados con máquina proyectable (Duo Mix Plus E, Monojet, G4, Etc.).','imagen-1670450823155.jpg',10),(6,'YEMACO 40KG','\"Durlock',4500,200,'Blanco',1,2,'Yeso tradicional para la construcción. Ideal para realizar enluidos de paredes y cielorrasos Se aplica en forma manual y se utiliza en todo tipo de obras.','imagen-1670450932502.jpg',35),(7,'PASTINA LISTA GRIS PERLA 1KG','Weber',3500,200,'Gris Oscuro',0,2,'Pastina acrílica mono componente lista para usar. Ideal para el relleno o renovación de juntas de hasta 4mm, entre cerámicas, porcellanatos y piezas preferentemente esmaltadas. De uso interior y exterior sin riesgos de estanqueidad de agua.','imagen-1670451112658.jpg',0),(8,'Kit D Instalación Para Baño 20mm Combo Termofusión Amanco','Amanco',9099,50,'Verde',0,7,'Kit instalación baño completo en termofusión de 20 agua fría y caliente INCLUYE: 2 TUBOS HEMBRA de 20 x 3/8 1 TUBO MACHO de 20 x 1/2 6 CODOS CON ROSCA de 20 x 1/2 2 LLAVES DE PASO CROMADA 20 10 CODOS de 20 3 CURVAS SOBRE PASO de 20 5 CUPLAS de 20 5 TEE de 20','imagen-1670512391257.jpg',0),(9,'Kit Sigas 25mm Termofusión ','Sigas',23000,50,'Amarillo',1,7,'Kit De Instalación Sigas 25mm Termofusión 425 Domiciliario','imagen-1670512699857.jpg',15),(10,'Caño Tubo 32mm','Tubofusión',2500,200,'Verde',1,6,'Caño termofusion agua fría y caliente 32 mm. x 4 METROS PN20','imagen-1670512440991.jpg',15),(11,'Caño Tubo Sigas ','Sigas',9500,200,'Amarillo',1,6,'Caño Tubo Sigas Termofusion 50 Mm X 4 Mts Ga','imagen-1670512740417.jpg',5),(12,'Termofusora Acqua System 800w','Aquasystem',32000,50,'Verde',0,1,'TERMOFUSOR 800W ACQUA SYSTEM BOQUILLAS 20-25-32 TORNILLOS DE FIJACIÓN Y LLAVE ALLEN SOPORTE DE TERMOFUSORA MALETÍN METÁLICO','imagen-1670452313567.jpg',0),(13,'Martillo Rotopercutor Bosch Gbh 2-26 ','Bosch',43000,50,'Azul',0,1,'Martillo Rotopercutor Bosch GBH 2-26 DRE 2 anos de Garantia Martillo rotopercutor electroneumatico. Avance de perforacion superior en la clase de martillos de 2 kg.','imagen-1670512859793.jpg',0),(14,'Trompo Mezcladora Cemento Tompito Hormigonero 1hp 130l','Ansa / Fassi',132000,10,'Verde',0,1,'Trompo Mezcladora Cemento Trompito Hormigonero 1hp 130l  Capacidad: 130lts. Motor: 1HP. Rueda: Goma maciza. Color: Las fotografías son ilustrativas el color viene de fábrica no es a elección.','imagen-1670512980060.jpg',0),(15,'Mezclador De Pintura Cemento Yeso Enduido 1300w Salkor','Salkor',2600,40,'Otros',1,1,'Ventajas: 2 Velocidades mecánicas: Mayor aprovechamiento de la potencia. Mango con soft grip: Comodidad de uso. Versátil: Permite trabajar con cementos, adhesivos de revestimientos, hormigones leves y pinturas.  Datos técnicos: Potencia: 1300W. Voltaje: 220V.','imagen-1670512903591.jpg',10),(16,'Pintura Casablanca Exterior Interior X 20 Lts','Casablanca',12500,50,'Blanco',1,8,'Casablanca PRO Látex Exterior Interior es un recubrimiento látex acrílico de excelente poder cubritivo, recomendado para proteger y decorar exteriores e interiores. De fácil aplicación y excelente nivelación. Desarrollado con materias primas de alta tecnología, que otorgan gran durabilidad','imagen-1670512946341.jpg',15);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `nick` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Fernando Del Pozzi','delpo','Argentina','fernandodelpozzi@gmail.com','admin','image-1670290998657.jpeg','$2a$10$YfBa0RyxHoLcicoCWxJcL.bjNgcYLC1nqtfz5Z17m1xEFICpnXJvG'),(2,'Eveyn Gianpieri','Evelyn','Alemania','evelyngiampieri@mail.com','admin','image-1670516520212.jpg','$2a$10$Xkynr/xFz3dwekS2vSPCAuqMccIXX2Fsgv5sIXB5Z1rpn2m432c26'),(3,'Cristian Bolzon','Cristian','Argentina','cristianbolzon@mail.com','admin','image-1670516587020.jpg','$2a$10$2GVHvF0IP1k65W6o1yzTC.5jtR1CK3b8d4JaTj14OTBQ8316mD6me'),(4,'Matías Muñoz','Matías','Argentina','matiasmunoz@mail.com','admin','image-1670516679489.jpg','$2a$10$ZodYvl1/tU2TUHo/kcpkKunKDIot3oWdOiGN4Z/yh5MlpeOvvdoDS');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_product`
--

DROP TABLE IF EXISTS `user_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_product` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-08 13:40:46
