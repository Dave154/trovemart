
![TroveMart Logo](src/assets/trove.svg)

# TroveMart

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Redux](https://img.shields.io/badge/State-Redux-purple)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4)
![MUI](https://img.shields.io/badge/UI-Material--UI-0081CB)

![Firebase](https://img.shields.io/badge/Backend-Firebase-orange)
![Vercel](https://img.shields.io/badge/Hosting-Vercel-black)


### [🌐 Live Link to TroveMart](https://trovemart.vercel.app)

Welcome to **TroveMart**! TroveMart is a customer self-service shopping app created to streamline the supermarket shopping experience. Built with **React** and **Firebase**, TroveMart empowers customers to shop from a categorized list of products, add items to a virtual cart, and generate a unique QR code upon checkout, allowing cashiers to verify and complete the order quickly at the counter.

## Table of Contents
1. [About TroveMart](#about-trovemart-🛒)
2. [Features](#features-🚀)
3. [Technologies Used 💻](#technologies-used-💻)
4. [Installation](#installation)
5. [Usage Guide](#usage-guide)
6. [Future Improvements](#future-improvements)
7. [Contributing](#contributing)
8. [License](#license)

---

## About TroveMart 🛒

**TroveMart** was developed as a hackathon project, focusing on improving customer convenience and cashier efficiency. TroveMart allows customers to browse a categorized product list, add items to a virtual cart, and checkout, generating a unique QR code for fast verification at the store counter.

## Features 🚀

- **Customer Shopping Experience**
  - 🛍️ **Product Browsing**: Customers access a neatly categorized list of all available products, including prices, via the web app.
  -  💳**Virtual Cart and Checkout**: Customers add items to a virtual cart and complete the checkout directly on the app.
  -   🔒**Order Limit Management**: Initial orders are limited to 20,000 Naira. As customers complete orders successfully, this limit gradually increases.
  -    🧾**QR Code Generation**: After checkout, a unique QR code is generated for the customer’s order.
  - 📦 **Order Packaging Option**: Customers can request to have their orders packaged for an additional fee.
  -  🕒**Five-Day Pickup Period**: Orders can be placed from anywhere, but they must be brought to the store counter within five days. Orders left beyond five days are marked as abandoned and can only be recovered or canceled by the cashier.
  - **Efficient Counter Checkout**: Customers simply present their QR code to the cashier for order retrieval and verification.
 
  


- **Cashier Workflow**
  - **Order Management**: Cashiers access a dashboard displaying all orders, including active, completed, and abandoned.
  - **Order Editing**: Cashiers can modify customer orders by adding, removing, or adjusting item quantities.
  - **User Profile Access**: View customer profiles with information such as order history, last order timestamp, and contact details.
  - **Order History Sorting**: Sort customer order history by date range for easy lookup.
  - **Account and Abandoned Order Management**: Cashiers can suspend and recover accounts as needed and are the only ones authorized to recover or cancel abandoned orders.


## Technologies Used 💻

| Frontend                                   | Backend   | Hosting |
| ------------------------------------------ | --------- | ------- |
| React, Vite, Tailwind,Redux ,Material-UI   | Firebase  | Vercel  |


## Installation

To run TroveMart locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/trovemart.git
   cd trovemart
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Firebase Configuration**:
   - Create a Firebase project on [Firebase Console](https://console.firebase.google.com/).
   - Create a `.env` file in the project root with your Firebase keys:
     ```plaintext
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Start the Application**:
   ```bash
   npm run dev
   ```

5. **Access the App**:
   Open `http://localhost:5173` in your browser.

## Usage Guide

### For Customers
1. **Browse and Add to Cart**: Explore the categorized product listings and add desired items to your virtual cart.
2. **Checkout**: Complete the checkout process on the app, generating a unique QR code for your order.
3. **Order Limit**: Start with a 20,000 Naira limit per order. This limit increases as you complete orders successfully.
4. **Request Packaging**: If desired, select the packaging option for an extra fee.
5. **Show QR Code at Counter**: Present your QR code to the cashier at the counter within five days for quick order retrieval. After five days, the order is marked as abandoned and can only be recovered or canceled by the cashier.

### For Cashiers
1. **Scan Customer QR Code**: Use the QR code to access and verify the customer’s order.
2. **Manage Orders**: View a dashboard of all orders, including active, completed, and abandoned ones.
3. **Edit Orders**: Modify orders as needed by adding items, removing items, or adjusting quantities.
4. **Access User Profiles**: Access customer profiles with order history, last order timestamps, and contact info.
5. **Sort Order History by Date Range**: Use date filters to quickly find specific orders.
6. **Suspend, Recover Accounts, and Manage Abandoned Orders**: Suspend or recover customer accounts if necessary, and manage abandoned orders per policy.

## Future Improvements

- **Offline Mode**: Allow offline cart additions for increased convenience.
- **Enhanced Analytics**: Integrate more in-depth order and sales data for administrative insights.
- **Administration Section**:Create a page for Admins

## Contributing

We welcome contributions! To contribute to TroveMart:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Added feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Thank you for exploring **TroveMart**! We hope it enhances the  shopping experience for both customers and staff.
