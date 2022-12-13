-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 13, 2022 at 05:51 PM
-- Server version: 8.0.29
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bunker`
--

-- --------------------------------------------------------

--
-- Table structure for table `аккаунты`
--

CREATE TABLE `аккаунты` (
  `номер` int NOT NULL,
  `логин` varchar(10) NOT NULL,
  `пароль` varchar(10) NOT NULL,
  `массив_ролей` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `аккаунты`
--

INSERT INTO `аккаунты` (`номер`, `логин`, `пароль`, `массив_ролей`) VALUES
(1, 'логин', 'пароль', '[\"оператор\",\"администратор\",\"начальник\"]');

-- --------------------------------------------------------

--
-- Table structure for table `вагон`
--

CREATE TABLE `вагон` (
  `номер` int NOT NULL,
  `масса` int NOT NULL,
  `вид` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `вид_груза`
--

CREATE TABLE `вид_груза` (
  `код` int NOT NULL,
  `название` varchar(10) NOT NULL,
  `краткое_название` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `вид_груза`
--

INSERT INTO `вид_груза` (`код`, `название`, `краткое_название`) VALUES
(1, 'Клинкер', 'Кл'),
(2, 'Еще один', 'Еще1'),
(3, 'Третий вид', 'еще3');

-- --------------------------------------------------------

--
-- Table structure for table `груз`
--

CREATE TABLE `груз` (
  `номер` int NOT NULL,
  `объем` double(10,2) NOT NULL,
  `дата_поступления` date NOT NULL,
  `вид_груза` int NOT NULL,
  `состояние_груза` int NOT NULL,
  `номер_участка` int NOT NULL,
  `ед_изм` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `груз`
--

INSERT INTO `груз` (`номер`, `объем`, `дата_поступления`, `вид_груза`, `состояние_груза`, `номер_участка`, `ед_изм`) VALUES
(1, 250.70, '2022-10-02', 1, 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `единица_измерения`
--

CREATE TABLE `единица_измерения` (
  `код` int NOT NULL,
  `название` varchar(10) NOT NULL,
  `краткое_название` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `единица_измерения`
--

INSERT INTO `единица_измерения` (`код`, `название`, `краткое_название`) VALUES
(1, 'килограмм', 'кг'),
(2, 'тонна', 'тн'),
(3, 'киловат', 'кВт'),
(4, 'кубометр', 'м3');

-- --------------------------------------------------------

--
-- Table structure for table `журнал_работы`
--

CREATE TABLE `журнал_работы` (
  `номер` int NOT NULL,
  `начало_работы` datetime NOT NULL,
  `конец_работы` datetime NOT NULL,
  `устройство` int NOT NULL,
  `груз` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `журнал_работы`
--

INSERT INTO `журнал_работы` (`номер`, `начало_работы`, `конец_работы`, `устройство`, `груз`) VALUES
(1, '2022-10-03 21:00:00', '2022-10-03 22:00:00', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `лог`
--

CREATE TABLE `лог` (
  `номер` int NOT NULL,
  `дата` date NOT NULL,
  `вагоны` longtext NOT NULL,
  `время_сушки` int NOT NULL,
  `тип_груза` int NOT NULL,
  `режим` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `модель`
--

CREATE TABLE `модель` (
  `код` int NOT NULL,
  `название` varchar(25) NOT NULL,
  `краткое_название` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `модель`
--

INSERT INTO `модель` (`код`, `название`, `краткое_название`) VALUES
(1, 'ТУ-0865PS100R', 'ТУ-01');

-- --------------------------------------------------------

--
-- Table structure for table `погода`
--

CREATE TABLE `погода` (
  `код` int NOT NULL,
  `дата` date NOT NULL,
  `название` varchar(20) NOT NULL,
  `температура` int NOT NULL,
  `влажность` int NOT NULL,
  `ветер` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `погода`
--

INSERT INTO `погода` (`код`, `дата`, `название`, `температура`, `влажность`, `ветер`) VALUES
(1, '2022-10-02', 'прехолодно', -10, 60, 2),
(2, '2022-10-03', 'холодно', -20, 70, 3),
(3, '2022-10-04', 'мороз', -30, 80, 4);

-- --------------------------------------------------------

--
-- Table structure for table `расчетное_груз_время`
--

CREATE TABLE `расчетное_груз_время` (
  `номер` int NOT NULL,
  `время` double(4,2) NOT NULL,
  `груз` int NOT NULL,
  `установки` int NOT NULL,
  `погода` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `режим_работы`
--

CREATE TABLE `режим_работы` (
  `номер` int NOT NULL,
  `название` varchar(10) NOT NULL,
  `расчетное_время` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `состояние`
--

CREATE TABLE `состояние` (
  `код` int NOT NULL,
  `название` varchar(15) NOT NULL,
  `краткое_название` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `состояние`
--

INSERT INTO `состояние` (`код`, `название`, `краткое_название`) VALUES
(1, 'Концентрат', 'КЦ');

-- --------------------------------------------------------

--
-- Table structure for table `устройство`
--

CREATE TABLE `устройство` (
  `номер` int NOT NULL,
  `дата ввода` date NOT NULL,
  `номер_модели` int NOT NULL,
  `код_характеристик` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `устройство`
--

INSERT INTO `устройство` (`номер`, `дата ввода`, `номер_модели`, `код_характеристик`) VALUES
(2, '2022-09-01', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `участок`
--

CREATE TABLE `участок` (
  `номер` int NOT NULL,
  `название` varchar(30) NOT NULL,
  `краткое_название` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `участок`
--

INSERT INTO `участок` (`номер`, `название`, `краткое_название`) VALUES
(1, 'Железнодорожный', 'ЖДЦ');

-- --------------------------------------------------------

--
-- Table structure for table `характеристики_устройств`
--

CREATE TABLE `характеристики_устройств` (
  `код` int NOT NULL,
  `мощность` double(4,3) NOT NULL,
  `потребление` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `характеристики_устройств`
--

INSERT INTO `характеристики_устройств` (`код`, `мощность`, `потребление`) VALUES
(1, 8.500, 80);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `аккаунты`
--
ALTER TABLE `аккаунты`
  ADD PRIMARY KEY (`номер`);

--
-- Indexes for table `вид_груза`
--
ALTER TABLE `вид_груза`
  ADD PRIMARY KEY (`код`);

--
-- Indexes for table `груз`
--
ALTER TABLE `груз`
  ADD PRIMARY KEY (`номер`),
  ADD KEY `вид_груза` (`вид_груза`),
  ADD KEY `номер_участка` (`номер_участка`),
  ADD KEY `состояние_груза` (`состояние_груза`),
  ADD KEY `ед_изм` (`ед_изм`);

--
-- Indexes for table `единица_измерения`
--
ALTER TABLE `единица_измерения`
  ADD PRIMARY KEY (`код`);

--
-- Indexes for table `журнал_работы`
--
ALTER TABLE `журнал_работы`
  ADD PRIMARY KEY (`номер`),
  ADD KEY `груз` (`груз`),
  ADD KEY `устройство` (`устройство`);

--
-- Indexes for table `модель`
--
ALTER TABLE `модель`
  ADD PRIMARY KEY (`код`);

--
-- Indexes for table `погода`
--
ALTER TABLE `погода`
  ADD PRIMARY KEY (`код`);

--
-- Indexes for table `расчетное_груз_время`
--
ALTER TABLE `расчетное_груз_время`
  ADD PRIMARY KEY (`номер`),
  ADD KEY `груз` (`груз`),
  ADD KEY `установки` (`установки`),
  ADD KEY `погода` (`погода`);

--
-- Indexes for table `режим_работы`
--
ALTER TABLE `режим_работы`
  ADD PRIMARY KEY (`номер`),
  ADD KEY `расчетное_время` (`расчетное_время`);

--
-- Indexes for table `состояние`
--
ALTER TABLE `состояние`
  ADD PRIMARY KEY (`код`);

--
-- Indexes for table `устройство`
--
ALTER TABLE `устройство`
  ADD PRIMARY KEY (`номер`),
  ADD KEY `номер_модели` (`номер_модели`),
  ADD KEY `код_характеристик` (`код_характеристик`);

--
-- Indexes for table `участок`
--
ALTER TABLE `участок`
  ADD PRIMARY KEY (`номер`);

--
-- Indexes for table `характеристики_устройств`
--
ALTER TABLE `характеристики_устройств`
  ADD PRIMARY KEY (`код`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `аккаунты`
--
ALTER TABLE `аккаунты`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `вид_груза`
--
ALTER TABLE `вид_груза`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `груз`
--
ALTER TABLE `груз`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `единица_измерения`
--
ALTER TABLE `единица_измерения`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `журнал_работы`
--
ALTER TABLE `журнал_работы`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `модель`
--
ALTER TABLE `модель`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `погода`
--
ALTER TABLE `погода`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `расчетное_груз_время`
--
ALTER TABLE `расчетное_груз_время`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `режим_работы`
--
ALTER TABLE `режим_работы`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `состояние`
--
ALTER TABLE `состояние`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `устройство`
--
ALTER TABLE `устройство`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `участок`
--
ALTER TABLE `участок`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `характеристики_устройств`
--
ALTER TABLE `характеристики_устройств`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `груз`
--
ALTER TABLE `груз`
  ADD CONSTRAINT `груз_ibfk_1` FOREIGN KEY (`вид_груза`) REFERENCES `вид_груза` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `груз_ibfk_2` FOREIGN KEY (`номер_участка`) REFERENCES `участок` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `груз_ibfk_3` FOREIGN KEY (`состояние_груза`) REFERENCES `состояние` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `груз_ibfk_4` FOREIGN KEY (`ед_изм`) REFERENCES `единица_измерения` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `журнал_работы`
--
ALTER TABLE `журнал_работы`
  ADD CONSTRAINT `журнал_работы_ibfk_1` FOREIGN KEY (`груз`) REFERENCES `груз` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `журнал_работы_ibfk_2` FOREIGN KEY (`устройство`) REFERENCES `устройство` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `расчетное_груз_время`
--
ALTER TABLE `расчетное_груз_время`
  ADD CONSTRAINT `расчетное_груз_время_ibfk_1` FOREIGN KEY (`груз`) REFERENCES `груз` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `расчетное_груз_время_ibfk_2` FOREIGN KEY (`установки`) REFERENCES `устройство` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `расчетное_груз_время_ibfk_3` FOREIGN KEY (`погода`) REFERENCES `погода` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `режим_работы`
--
ALTER TABLE `режим_работы`
  ADD CONSTRAINT `режим_работы_ibfk_1` FOREIGN KEY (`расчетное_время`) REFERENCES `расчетное_груз_время` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `устройство`
--
ALTER TABLE `устройство`
  ADD CONSTRAINT `устройство_ibfk_1` FOREIGN KEY (`номер_модели`) REFERENCES `модель` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `устройство_ibfk_2` FOREIGN KEY (`код_характеристик`) REFERENCES `характеристики_устройств` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
