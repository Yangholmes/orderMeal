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

INSERT INTO `personnel` (`personnelId`, `name`, `engName`, `sex`, `age`, `apartment`) VALUES
(1, '袁邦宪', '', '', 0, ''),
(2, '刘静', '', '', 0, ''),
(3, '杨毅', '', '', 0, ''),
(4, '何燕', '', '', 0, ''),
(5, '卢威', '', '', 0, ''),
(6, '陈淑', '', '', 0, ''),
(7, '严西文', '', '', 0, ''),
(8, '赵熙', '', '', 0, ''),
(9, '陈楚娜', '', '', 0, ''),
(10, '黄嘉雯', '', '', 0, ''),
(11, '谭旖旎', '', '', 0, ''),
(12, '方淑斐', '', '', 0, ''),
(13, '姚莉雯', '', '', 0, ''),
(14, '张超', '', '', 0, ''),
(15, '谢志华', '', '', 0, ''),
(16, '黄加华', '', '', 0, ''),
(17, '李纾霞', '', '', 0, ''),
(18, '江宁', '', '', 0, ''),
(19, '梁弘扬', '', '', 0, ''),
(20, '练晓娟', '', '', 0, ''),
(21, '朱攀', '', '', 0, ''),
(22, '毛鑫', '', '', 0, ''),
(23, '王彦春', '', '', 0, ''),
(24, '张少勇', '', '', 0, ''),
(25, '胡元义', '', '', 0, ''),
(26, '肖钱萍', '', '', 0, ''),
(27, '陈嘉俊', '', '', 0, ''),
(28, '吕钊轶', '', '', 0, ''),
(29, '袁善财', '', '', 0, ''),
(30, '王文玲', '', '', 0, ''),
(31, '陈泽琳', '', '', 0, ''),
(32, '黎树棠', '', '', 0, ''),
(33, '李文华', '', '', 0, ''),
(34, '林蕴琪', '', '', 0, ''),
(35, '王博', '', '', 0, ''),
(36, '郑德文', '', '', 0, ''),
(37, '陈家心', '', '', 0, ''),
(38, '袁康', '', '', 0, ''),
(39, '曾佳', '', '', 0, ''),
(40, '潘灿森', '', '', 0, '');

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
