# CMS Full-Stack Project

## Introduction

This project was developed as part of a Full-Stack CMS (Content Management System) learning program using .NET Core, ASP.NET MVC, Entity Framework Core, SQL Server, and ReactJS.

The goal of the project is to understand professional software architecture through a 3-layer solution structure:

* CMS.Data (Data Layer)
* CMS.Backend (ASP.NET Core MVC & Web API)
* CMS.Frontend (ReactJS Frontend)

## Technologies Used

### Backend

* ASP.NET Core MVC
* C#
* Entity Framework Core
* Dependency Injection
* RESTful API

### Frontend

* ReactJS
* Node.js
* npm

### Database

* SQL Server
* Entity Framework Core

## Project Structure

```text
CMS_Solution
│
├── CMS.Data
│   ├── Entities
│   │   ├── Category
│   │   ├── Post
│   │   ├── User
│   │   ├── CategoryProduct
│   │   ├── Product
│   │   ├── Customer
│   │   ├── Order
│   │   └── OrderDetail
│
├── CMS.Backend
│   ├── Controllers
│   ├── Views
│   ├── Models
│   └── Web API
│
└── CMS.Frontend
    ├── React Components
    ├── Pages
    └── Services
```

## Features Implemented

### Content Management

* Category Management
* Post Management
* User Management

### Product Management

* Product Categories
* Product Information
* Inventory Tracking

### Customer Management

* Customer Profiles
* Order Management
* Order Details Tracking

## Learning Objectives

During this project, the following concepts were practiced:

* Solution architecture with multiple projects
* Entity design and database relationships
* MVC Pattern
* Controller and View creation
* Dependency Injection
* Mock Data implementation
* Entity Framework Core preparation
* ReactJS project setup
* Full-stack application structure

## Demo Features

### Category Management

* Display category list
* View category information

### Post Management

* Display latest posts
* View post details

### User Management

* Display administrator accounts
* Role management interface

## Getting Started

### Prerequisites

* Visual Studio 2022
* .NET 8 SDK
* Node.js LTS
* SQL Server
* Git

### Run Backend

```bash
dotnet build
dotnet run
```

### Run Frontend

```bash
cd cms.frontend
npm install
npm start
```

## Future Development

* Entity Framework Core Database Integration
* Authentication & Authorization
* JWT Security
* CRUD Operations
* Admin Dashboard
* REST API Integration
* ReactJS Frontend Integration
* Deployment to Cloud Environment

## Author

Developed for educational purposes as part of a Full-Stack CMS learning project using ASP.NET Core and ReactJS.
