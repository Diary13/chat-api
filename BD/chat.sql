-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Jeu 21 Octobre 2021 à 06:15
-- Version du serveur: 5.5.24-log
-- Version de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `chat`
--

-- --------------------------------------------------------

--
-- Structure de la table `conversations`
--

CREATE TABLE IF NOT EXISTS `conversations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Contenu de la table `conversations`
--

INSERT INTO `conversations` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'private', '2021-10-18 19:21:09', '2021-10-18 19:21:09'),
(2, 'private', '2021-10-18 19:21:49', '2021-10-18 19:21:49'),
(3, 'private', '2021-10-18 19:23:30', '2021-10-18 19:23:30'),
(4, 'private', '2021-10-19 05:13:52', '2021-10-19 05:13:52'),
(5, 'private', '2021-10-19 05:15:34', '2021-10-19 05:15:34'),
(6, 'private', '2021-10-19 05:16:18', '2021-10-19 05:16:18'),
(7, 'private', '2021-10-19 05:18:18', '2021-10-19 05:18:18'),
(8, 'private', '2021-10-19 05:18:39', '2021-10-19 05:18:39'),
(9, 'private', '2021-10-19 07:55:17', '2021-10-19 07:55:17'),
(10, 'private', '2021-10-19 09:29:25', '2021-10-19 09:29:25'),
(11, 'private', '2021-10-19 15:53:53', '2021-10-19 15:53:53'),
(12, 'private', '2021-10-21 05:21:02', '2021-10-21 05:21:02');

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `adminId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `liaisons`
--

CREATE TABLE IF NOT EXISTS `liaisons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `conversationId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Contenu de la table `liaisons`
--

INSERT INTO `liaisons` (`id`, `userId`, `conversationId`, `createdAt`, `updatedAt`) VALUES
(1, 4, 1, '2021-10-18 19:21:09', '2021-10-18 19:21:09'),
(2, 1, 1, '2021-10-18 19:21:09', '2021-10-18 19:21:09'),
(3, 3, 2, '2021-10-18 19:21:49', '2021-10-18 19:21:49'),
(4, 2, 2, '2021-10-18 19:21:49', '2021-10-18 19:21:49'),
(5, 2, 3, '2021-10-18 19:23:30', '2021-10-18 19:23:30'),
(6, 5, 3, '2021-10-18 19:23:30', '2021-10-18 19:23:30'),
(7, 5, 4, '2021-10-19 05:13:52', '2021-10-19 05:13:52'),
(8, 6, 4, '2021-10-19 05:13:52', '2021-10-19 05:13:52'),
(9, 5, 5, '2021-10-19 05:15:34', '2021-10-19 05:15:34'),
(10, 3, 5, '2021-10-19 05:15:34', '2021-10-19 05:15:34'),
(11, 5, 6, '2021-10-19 05:16:18', '2021-10-19 05:16:18'),
(12, 4, 6, '2021-10-19 05:16:19', '2021-10-19 05:16:19'),
(13, 4, 7, '2021-10-19 05:18:18', '2021-10-19 05:18:18'),
(14, 3, 7, '2021-10-19 05:18:18', '2021-10-19 05:18:18'),
(15, 4, 8, '2021-10-19 05:18:39', '2021-10-19 05:18:39'),
(16, 2, 8, '2021-10-19 05:18:39', '2021-10-19 05:18:39'),
(17, 3, 9, '2021-10-19 07:55:17', '2021-10-19 07:55:17'),
(18, 6, 9, '2021-10-19 07:55:18', '2021-10-19 07:55:18'),
(19, 7, 10, '2021-10-19 09:29:25', '2021-10-19 09:29:25'),
(20, 4, 10, '2021-10-19 09:29:25', '2021-10-19 09:29:25'),
(21, 4, 11, '2021-10-19 15:53:53', '2021-10-19 15:53:53'),
(22, 6, 11, '2021-10-19 15:53:54', '2021-10-19 15:53:54'),
(23, 2, 12, '2021-10-21 05:21:02', '2021-10-21 05:21:02'),
(24, 7, 12, '2021-10-21 05:21:02', '2021-10-21 05:21:02');

-- --------------------------------------------------------

--
-- Structure de la table `liaison_user_groups`
--

CREATE TABLE IF NOT EXISTS `liaison_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `conversationId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Contenu de la table `messages`
--

INSERT INTO `messages` (`id`, `text`, `receiverId`, `senderId`, `conversationId`, `groupId`, `createdAt`, `updatedAt`) VALUES
(1, 'Bonjour!', 2, 3, 2, 0, '2021-10-18 19:24:23', '2021-10-18 19:24:23'),
(2, 'Salut e! Vaovao any aminao?', 3, 2, 2, 0, '2021-10-18 19:25:02', '2021-10-18 19:25:02'),
(3, 'Salama o!', 5, 3, 5, 0, '2021-10-19 05:22:05', '2021-10-19 05:22:05'),
(4, 'Salama  tsara fa misaotra!', 3, 5, 5, 0, '2021-10-19 05:22:22', '2021-10-19 05:22:22'),
(5, 'Inona ny vaovao?', 5, 3, 5, 0, '2021-10-19 07:19:39', '2021-10-19 07:19:39'),
(6, 'tsisy vaovao fa any aminao any', 3, 5, 5, 0, '2021-10-19 07:20:10', '2021-10-19 07:20:10'),
(7, 'Mangingina aty e. Ary ny malaza?', 5, 3, 5, 0, '2021-10-19 07:20:29', '2021-10-19 07:20:29'),
(8, 'Coucou', 2, 5, 3, 0, '2021-10-19 07:24:02', '2021-10-19 07:24:02'),
(9, 'Tsisy malaza aty ko', 3, 5, 5, 0, '2021-10-19 07:26:44', '2021-10-19 07:26:44'),
(10, 'Aiza ee?', 6, 5, 4, 0, '2021-10-19 07:46:00', '2021-10-19 07:46:00'),
(11, '                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi hic minima tempora, commodi quia libero et possimus adipisci dolores impedit mollitia repudiandae omnis illum soluta odit, sequi aliquam corporis nam!', 6, 5, 4, 0, '2021-10-19 07:47:20', '2021-10-19 07:47:20'),
(12, '                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi hic minima tempora, commodi quia libero et possimus adipisci dolores impedit mollitia repudiandae omnis illum soluta odit, sequi aliquam corporis nam!', 3, 5, 5, 0, '2021-10-19 07:47:59', '2021-10-19 07:47:59'),
(13, '                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi hic minima tempora, commodi quia libero et possimus adipisci dolores impedit mollitia repudiandae omnis illum soluta odit, sequi aliquam corporis nam!', 5, 3, 5, 0, '2021-10-19 07:48:23', '2021-10-19 07:48:23'),
(14, 'Aoeeeeeeeeeeeee', 6, 3, 9, 0, '2021-10-19 07:55:35', '2021-10-19 07:55:35'),
(15, 'Mamalia eee', 6, 3, 9, 0, '2021-10-19 07:55:50', '2021-10-19 07:55:50'),
(16, 'Salut!', 7, 4, 10, 0, '2021-10-19 09:30:01', '2021-10-19 09:30:01'),
(17, 'Coucou!', 4, 7, 10, 0, '2021-10-19 09:30:40', '2021-10-19 09:30:40'),
(18, 'Vaovao any aminao?', 7, 4, 10, 0, '2021-10-19 09:31:03', '2021-10-19 09:31:03'),
(19, 'Aoeeeee.Mialatsiny fa izao vao hitako\n', 3, 6, 9, 0, '2021-10-19 09:57:30', '2021-10-19 09:57:30'),
(20, 'Tsisy vaovao aty fa mangina!', 4, 7, 10, 0, '2021-10-19 12:17:10', '2021-10-19 12:17:10'),
(21, 'Manahoana ny fianarana ao?', 7, 4, 10, 0, '2021-10-19 12:17:47', '2021-10-19 12:17:47'),
(22, 'Ao izy ao mandende miadana ao', 4, 7, 10, 0, '2021-10-19 12:18:34', '2021-10-19 12:18:34'),
(23, 'coucou', 5, 4, 6, 0, '2021-10-19 15:43:48', '2021-10-19 15:43:48'),
(24, 'Salut', 3, 4, 7, 0, '2021-10-19 15:50:43', '2021-10-19 15:50:43'),
(25, 'De aon zanjy e', 6, 4, 11, 0, '2021-10-19 15:54:10', '2021-10-19 15:54:10'),
(26, 'salut e', 4, 3, 7, 0, '2021-10-19 16:05:37', '2021-10-19 16:05:37'),
(27, 'In nen zanjyy ee', 4, 6, 11, 0, '2021-10-19 16:07:31', '2021-10-19 16:07:31'),
(28, 'Salut', 5, 2, 3, 0, '2021-10-20 06:15:35', '2021-10-20 06:15:35'),
(29, 'tsisy vaovao fa mangina', 2, 3, 2, 0, '2021-10-21 04:57:33', '2021-10-21 04:57:33'),
(30, 'COUCOU!', 7, 2, 12, 0, '2021-10-21 05:21:14', '2021-10-21 05:21:14');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210702090548-create-user.js'),
('20210702090911-create-message.js'),
('20210702105744-create-conversation.js'),
('20210702105856-create-liaison.js'),
('20210706101306-create-group.js'),
('20210707034117-create-liaison-user-group.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `lastLog` datetime NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `username`, `mail`, `password`, `image`, `status`, `lastLog`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$05$g8jpH.Yv3j3VvBkmo72riuDpt0x2VYiamdBZi.h9C1VjLmihF0PBO', 'uploads/images/user.png', 'inactif', '2021-10-21 05:19:39', 1, '2021-10-13 05:43:49', '2021-10-21 05:19:42'),
(2, 'user1', 'user1@gmail.com', '$2b$05$Ru8x.lKHM2diyCH1A1Y6TeeXVG960Vgg3mwSFrymYrR05UECq.6Ci', 'uploads/images/client.png', 'actif', '2021-10-21 04:57:08', 0, '2021-10-13 05:44:59', '2021-10-21 04:57:08'),
(3, 'user2', 'user2@gmail.com', '$2b$05$HxsynBHY0Dqkx/AVW0ItAu61e6h9TeOJHN8KFZpIIAifWfXQErzqy', 'uploads/images/user2.png', 'inactif', '2021-10-21 05:09:32', 0, '2021-10-13 05:46:12', '2021-10-21 05:09:49'),
(4, 'user3', 'user3@gmail.com', '$2b$05$AeWg9hfYrHievhe7q38XTuS7mvoG/EdMUqwyz9gnwmAKF.ZJVSS3C', 'uploads/images/user3.png', 'inactif', '2021-10-19 15:07:30', 0, '2021-10-14 18:53:09', '2021-10-19 15:57:41'),
(5, 'user4', 'user4@gmail.com', '$2b$05$mIBDaLYwnHlBc3fCPk8ltub9oy1ZR3PJRYiYfXrH2T8Jh9v/R4lWu', 'uploads/images/user4.png', 'inactif', '2021-10-19 14:42:39', 0, '2021-10-14 19:02:35', '2021-10-19 15:05:31'),
(6, 'user5', 'user5@gmail.com', '$2b$05$ZLW/ovjhPe8QPLTWmdfEk.zghGgq/YGcG6p70n3ch.ojArEtTtjMC', 'uploads/images/user5.png', 'inactif', '2021-10-19 16:06:50', 0, '2021-10-14 19:06:26', '2021-10-19 16:08:26'),
(7, 'user6', 'user6@gmail.com', '$2b$05$V1hdXu.ikeCy2NGuGetVdOL9yz0KVwR5ihm6iOjVzU/lGS8aC.S0G', 'uploads/images/robertine.png', 'inactif', '2021-10-19 12:15:37', 0, '2021-10-19 09:28:23', '2021-10-19 12:19:17');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
