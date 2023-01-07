#Localisation des restaurants :

Ce projet a pour but de mettre en place une application web et mobile  permettant de localiser les restaurants selon la ville , la zone , la serie et la specialite  . Il utilise Spring boot    cote back end , reactjs cote front end  (web) et android pour la partie mobile  et  la gestion de la base de données avec le  SGBD Mysql.

#Fonctionnalités partie web : (administrateur)

Gestion des villes 
Gestion des zones 
Gestion des spécialités 
Gestion des séries 
Affichage de la liste des restaurants 
Validation des restaurants (Ajouter champ etat dans pharmacie : etat = 0 : en attente de validation ; etat = 1 : validée ; etat = 2 : refusé) 
Statistiques ( Afficher le nombre des restaurants par ville et zone)

#Fonctionnalités partie mobile :  (proprietaire)

Inscription 
Création de restaurant 
Visualisation de  l’état du restaurant 
L’Ajout des photos de restaurant
Fonctionnalités partie mobile : (internaute)
La recherche d’ un restaurant par ville, zone, spécialité ou série 
Affichage des restaurants avec possibilité de parcourir les photos 
Visualisation des restaurants dans une Map 
Visualisation la position de l’utilisateur dans la map et mentionner les restaurants les plus proche 
Affichage de l’itinéraire vers un restaurant

#Mise en place du projet

Pour mettre en place ce projet, vous aurez besoin des éléments suivants :
1.	Un serveur d'application Java (comme Tomcat)
2.	Un SGBD (comme MySQL)
3.	Un éditeur de code (comme Eclipse)
4.	Le driver JDBC de votre SGBD (à télécharger sur le site officiel de votre SGBD)
5.	Le framework Hibernate (à télécharger sur le site officiel ou via Maven)

#Déploiement

Pour déployer ce projet sur votre serveur d'application, suivez les étapes suivantes :
1.	Téléchargez le projet (vous trouvez au dessous les liens de la partie web et mobile) sur votre ordinateur
2.	Ouvrez-le dans votre éditeur de code
3.	Configurez la connexion à votre SGBD dans le fichier application.properties pour le back end
4.	Configurer votre adresse ip sur les fichiers pour assurer l’échange des données
5.	Exécuter le projet

#Architecture du projet

#Lien github vers les parties mobile et le backend

mobile : https://github.com/Nidabdellah-Abdelhafid/restaurant_mobil.git
backend : https://github.com/Nidabdellah-Abdelhafid/restaurant_backend.git

#Official Documentation

La documentation relative au cadre se trouve sur le site Web du :
https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#getting-help
https://developer.android.com/docs
https://devdocs.io/react/

#Auteur
Ce projet a été réalisé par :

NidAbdellah Abdelhafid<br>
Mouket Fatima zahra <br>
Madili Sanaa
