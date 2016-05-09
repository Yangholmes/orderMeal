-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2016 at 05:06 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ordermeal`
--

-- --------------------------------------------------------

--
-- Table structure for table `personnel`
--

CREATE TABLE `personnel` (
  `personnelId` int(10) UNSIGNED NOT NULL,
  `name` char(10) NOT NULL,
  `engName` char(20) DEFAULT NULL,
  `sex` char(5) DEFAULT NULL,
  `age` int(10) UNSIGNED DEFAULT NULL,
  `apartment` char(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `personnel`
--

INSERT INTO personnel (personnelId, name) VALUES
(1, '袁邦宪'),
(2, '刘静'),
(3, '杨毅'),
(4, '何燕'),
(5, '卢威'),
(6, '陈淑'),
(7, '严西文'),
(8, '赵熙'),
(9, '陈楚娜'),
(10, '黄嘉雯'),
(11, '谭旖旎'),
(12, '方淑斐'),
(13, '姚莉雯'),
(14, '张超'),
(15, '谢志华'),
(16, '黄加华'),
(17, '李纾霞'),
(18, '江宁'),
(19, '梁弘扬'),
(20, '练晓娟'),
(21, '朱攀'),
(22, '毛鑫'),
(23, '王彦春'),
(24, '张少勇'),
(25, '胡元义'),
(26, '肖钱萍'),
(27, '陈嘉俊'),
(28, '吕钊轶'),
(29, '袁善财'),
(30, '王文玲'),
(31, '陈泽琳'),
(32, '黎树棠'),
(33, '李文华'),
(34, '林蕴琪'),
(35, '王博'),
(36, '郑德文'),
(37, '陈家心'),
(38, '袁康'),
(39, '曾佳'),
(40, '潘灿森');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `personnel`
--
ALTER TABLE `personnel`
  ADD PRIMARY KEY (`personnelId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `personnelId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- business department personnel
-- INSERT INTO personnel (name) VALUES ('周志敏'), ('梁燕婷'), ('曾庆瑾'), ('吴微微'), ('刘荣'), ('邹志豪'), ('冯海利'), ('秦洁珊'), ('汤芷莹'), ('潘学冰');
