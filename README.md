# E-commerce Project

## 📚 Course
CSE-446 Web Engineering Lab

---

## 🎯 Objective
To develop API-based web services that simulate the core functionalities of an e-commerce system involving **three distinct organizations**:
1. An E-commerce platform
2. A Product Supplier
3. A Bank

The project demonstrates how APIs can be used to model real-world interactions between these organizations, focusing on purchasing and financial transaction flows.

---

## 🛠️ Technologies Used
- Express
- MongoDB
- RESTful API design
- Postman (for testing APIs)

---

## 🧩 Functional Overview

### 🌐 E-commerce Website
- Users can register and log in.
- After login, users land on a home page and must:
  - Set up bank information (account number and secret).
  - View available products
  - Add products to cart and purchase them.
- Purchases are processed by sending a transaction request to the bank.
- On successful transaction:
  - A transaction record is created.
  - Supplier is notified to deliver products.

### 🏦 Bank
- Handles secure transaction processing.
- Validates secret and account information.
- Updates balances for users, suppliers, and the e-commerce organization.
- Exposes an API to retrieve bank balances.

### 🚚 Supplier
- Receives supply requests from the e-commerce platform.
- Validates transaction records with the bank.
- Transfers money from the e-commerce account to its own upon validation.
- Updates the order status so the user sees that the products have been delivered.

---

## 🔄 Workflow

1. User logs in to the e-commerce platform.
2. User sets bank info and secret.
3. User views and selects products to buy.
4. E-commerce system calculates cost and sends transaction request to the bank.
5. Bank validates and completes the transaction.
6. E-commerce sends transaction record to the supplier.
7. Supplier verifies it with the bank and receives payment.
8. Products are marked as delivered to the user.
9. All entities can check their respective balances through the bank API.

---

## 📦 API Design

Each organization must expose a REST API. All interactions between:
- User ↔️ E-commerce
- E-commerce ↔️ Bank
- E-commerce ↔️ Supplier
- Supplier ↔️ Bank  
...are carried out **via APIs only**.

---

## ❗ Note
This project focuses on **functionality**, not on advanced **security** practices.

---

## 🚀 Getting Started

1. Clone the repositories for each organization (if using separate codebases).
2. Install dependencies.
3. Run the services on different ports.
4. Use Postman or frontend interfaces to simulate the e-commerce workflow.

---
