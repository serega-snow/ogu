-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 12 2022 г., 17:36
-- Версия сервера: 8.0.29
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bunker`
--

-- --------------------------------------------------------

--
-- Структура таблицы `модель`
--

CREATE TABLE `модель` (
  `код` int NOT NULL,
  `название` varchar(25) NOT NULL,
  `краткое_название` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `модель`
--

INSERT INTO `модель` (`код`, `название`, `краткое_название`) VALUES
(1, 'ТУ-0865PS100R', 'ТУ-01');

-- --------------------------------------------------------

--
-- Структура таблицы `погода`
--

CREATE TABLE `погода` (
  `код` int NOT NULL,
  `название` varchar(20) NOT NULL,
  `температура` int NOT NULL,
  `влажность` int NOT NULL,
  `ветер` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `погода`
--

INSERT INTO `погода` (`код`, `название`, `температура`, `влажность`, `ветер`) VALUES
(5, 'прехолодно', -10, 60, 2),
(6, 'холодно', -20, 70, 3),
(7, 'мороз', -30, 80, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `аккаунты`
--

CREATE TABLE `аккаунты` (
  `номер` int NOT NULL,
  `логин` varchar(10) NOT NULL,
  `пароль` varchar(10) NOT NULL,
  `массив_ролей` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `аккаунты`
--

INSERT INTO `аккаунты` (`номер`, `логин`, `пароль`, `массив_ролей`) VALUES
(1, 'логин', 'пароль', '[\"оператор\",\"администратор\",\"начальник\"]');

-- --------------------------------------------------------

--
-- Структура таблицы `вид_груза`
--

CREATE TABLE `вид_груза` (
  `код` int NOT NULL,
  `название` varchar(10) NOT NULL,
  `краткое_название` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `вид_груза`
--

INSERT INTO `вид_груза` (`код`, `название`, `краткое_название`) VALUES
(1, 'Клинкер', 'Кл');

-- --------------------------------------------------------

--
-- Структура таблицы `вагон`
--

CREATE TABLE `вагон` (
  `номер` int NOT NULL,
  `масса` int NOT NULL,
  `вид` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `груз`
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
-- Дамп данных таблицы `груз`
--

INSERT INTO `груз` (`номер`, `объем`, `дата_поступления`, `вид_груза`, `состояние_груза`, `номер_участка`, `ед_изм`) VALUES
(1, 250.70, '2022-10-02', 1, 1, 1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `единица_измерения`
--

CREATE TABLE `единица_измерения` (
  `код` int NOT NULL,
  `название` varchar(10) NOT NULL,
  `краткое_название` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `единица_измерения`
--

INSERT INTO `единица_измерения` (`код`, `название`, `краткое_название`) VALUES
(1, 'килограмм', 'кг'),
(2, 'тонна', 'тн'),
(3, 'киловат', 'кВт'),
(4, 'кубометр', 'м3');

-- --------------------------------------------------------

--
-- Структура таблицы `журнал_работы`
--

CREATE TABLE `журнал_работы` (
  `номер` int NOT NULL,
  `начало_работы` datetime NOT NULL,
  `конец_работы` datetime NOT NULL,
  `устройство` int NOT NULL,
  `груз` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `журнал_работы`
--

INSERT INTO `журнал_работы` (`номер`, `начало_работы`, `конец_работы`, `устройство`, `груз`) VALUES
(1, '2022-10-03 21:00:00', '2022-10-03 22:00:00', 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `лог`
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
-- Структура таблицы `расчетное_груз_время`
--

CREATE TABLE `расчетное_груз_время` (
  `номер` int NOT NULL,
  `время` double(4,2) NOT NULL,
  `груз` int NOT NULL,
  `установки` int NOT NULL,
  `погода` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `расчетное_груз_время`
--

INSERT INTO `расчетное_груз_время` (`номер`, `время`, `груз`, `установки`, `погода`) VALUES
(1, 2.30, 1, 2, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `режим_работы`
--

CREATE TABLE `режим_работы` (
  `номер` int NOT NULL,
  `название` varchar(10) NOT NULL,
  `расчетное_время` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `режим_работы`
--

INSERT INTO `режим_работы` (`номер`, `название`, `расчетное_время`) VALUES
(1, 'Режим1', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `состояние`
--

CREATE TABLE `состояние` (
  `код` int NOT NULL,
  `название` varchar(15) NOT NULL,
  `краткое_название` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `состояние`
--

INSERT INTO `состояние` (`код`, `название`, `краткое_название`) VALUES
(1, 'Концентрат', 'КЦ');

-- --------------------------------------------------------

--
-- Структура таблицы `устройство`
--

CREATE TABLE `устройство` (
  `номер` int NOT NULL,
  `дата ввода` date NOT NULL,
  `номер_модели` int NOT NULL,
  `код_характеристик` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `устройство`
--

INSERT INTO `устройство` (`номер`, `дата ввода`, `номер_модели`, `код_характеристик`) VALUES
(2, '2022-09-01', 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `участок`
--

CREATE TABLE `участок` (
  `номер` int NOT NULL,
  `название` varchar(30) NOT NULL,
  `краткое_название` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `участок`
--

INSERT INTO `участок` (`номер`, `название`, `краткое_название`) VALUES
(1, 'Железнодорожный', 'ЖДЦ');

-- --------------------------------------------------------

--
-- Структура таблицы `характеристики_устройств`
--

CREATE TABLE `характеристики_устройств` (
  `код` int NOT NULL,
  `мощность` double(4,3) NOT NULL,
  `потребление` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `характеристики_устройств`
--

INSERT INTO `характеристики_устройств` (`код`, `мощность`, `потребление`) VALUES
(1, 8.500, 80);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `модель`
--
ALTER TABLE `модель`
  ADD PRIMARY KEY (`код`);

--
-- Индексы таблицы `погода`
--
ALTER TABLE `погода`
  ADD PRIMARY KEY (`код`);

--
-- Индексы таблицы `аккаунты`
--
ALTER TABLE `аккаунты`
  ADD PRIMARY KEY (`номер`);

--
-- Индексы таблицы `вид_груза`
--
ALTER TABLE `вид_груза`
  ADD PRIMARY KEY (`код`);

--
-- Индексы таблицы `груз`
--
ALTER TABLE `груз`
  ADD PRIMARY KEY (`номер`),
  ADD KEY `вид_груза` (`вид_груза`),
  ADD KEY `номер_участка` (`номер_участка`),
  ADD KEY `состояние_груза` (`состояние_груза`),
  ADD KEY `ед_изм` (`ед_изм`);

--
-- Индексы таблицы `единица_измерения`
--
ALTER TABLE `единица_измерения`
  ADD PRIMARY KEY (`код`);

--
-- Индексы таблицы `журнал_работы`
--
ALTER TABLE `журнал_работы`
  ADD PRIMARY KEY (`номер`),
  ADD KEY `груз` (`груз`),
  ADD KEY `устройство` (`устройство`);

--
-- Индексы таблицы `расчетное_груз_время`
--
ALTER TABLE `расчетное_груз_время`
  ADD PRIMARY KEY (`номер`),
  ADD KEY `груз` (`груз`),
  ADD KEY `установки` (`установки`),
  ADD KEY `погода` (`погода`);

--
-- Индексы таблицы `режим_работы`
--
ALTER TABLE `режим_работы`
  ADD PRIMARY KEY (`номер`),
  ADD KEY `расчетное_время` (`расчетное_время`);

--
-- Индексы таблицы `состояние`
--
ALTER TABLE `состояние`
  ADD PRIMARY KEY (`код`);

--
-- Индексы таблицы `устройство`
--
ALTER TABLE `устройство`
  ADD PRIMARY KEY (`номер`),
  ADD KEY `номер_модели` (`номер_модели`),
  ADD KEY `код_характеристик` (`код_характеристик`);

--
-- Индексы таблицы `участок`
--
ALTER TABLE `участок`
  ADD PRIMARY KEY (`номер`);

--
-- Индексы таблицы `характеристики_устройств`
--
ALTER TABLE `характеристики_устройств`
  ADD PRIMARY KEY (`код`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `модель`
--
ALTER TABLE `модель`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `погода`
--
ALTER TABLE `погода`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `аккаунты`
--
ALTER TABLE `аккаунты`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `вид_груза`
--
ALTER TABLE `вид_груза`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `груз`
--
ALTER TABLE `груз`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `единица_измерения`
--
ALTER TABLE `единица_измерения`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `журнал_работы`
--
ALTER TABLE `журнал_работы`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `расчетное_груз_время`
--
ALTER TABLE `расчетное_груз_время`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `режим_работы`
--
ALTER TABLE `режим_работы`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `состояние`
--
ALTER TABLE `состояние`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `устройство`
--
ALTER TABLE `устройство`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `участок`
--
ALTER TABLE `участок`
  MODIFY `номер` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `характеристики_устройств`
--
ALTER TABLE `характеристики_устройств`
  MODIFY `код` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `груз`
--
ALTER TABLE `груз`
  ADD CONSTRAINT `груз_ibfk_1` FOREIGN KEY (`вид_груза`) REFERENCES `вид_груза` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `груз_ibfk_2` FOREIGN KEY (`номер_участка`) REFERENCES `участок` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `груз_ibfk_3` FOREIGN KEY (`состояние_груза`) REFERENCES `состояние` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `груз_ibfk_4` FOREIGN KEY (`ед_изм`) REFERENCES `единица_измерения` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `журнал_работы`
--
ALTER TABLE `журнал_работы`
  ADD CONSTRAINT `журнал_работы_ibfk_1` FOREIGN KEY (`груз`) REFERENCES `груз` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `журнал_работы_ibfk_2` FOREIGN KEY (`устройство`) REFERENCES `устройство` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `расчетное_груз_время`
--
ALTER TABLE `расчетное_груз_время`
  ADD CONSTRAINT `расчетное_груз_время_ibfk_1` FOREIGN KEY (`груз`) REFERENCES `груз` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `расчетное_груз_время_ibfk_2` FOREIGN KEY (`установки`) REFERENCES `устройство` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `расчетное_груз_время_ibfk_3` FOREIGN KEY (`погода`) REFERENCES `погода` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `режим_работы`
--
ALTER TABLE `режим_работы`
  ADD CONSTRAINT `режим_работы_ibfk_1` FOREIGN KEY (`расчетное_время`) REFERENCES `расчетное_груз_время` (`номер`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `устройство`
--
ALTER TABLE `устройство`
  ADD CONSTRAINT `устройство_ibfk_1` FOREIGN KEY (`номер_модели`) REFERENCES `модель` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `устройство_ibfk_2` FOREIGN KEY (`код_характеристик`) REFERENCES `характеристики_устройств` (`код`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
