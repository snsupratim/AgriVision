<h1 align="center">🌾 AgriVision 🚜- AI-powered solution to  take care farmers . </h1>

AgriVision is an open-source initiative aimed at empowering farmers with AI-driven solutions and an integrated marketplace for seamless trading. This project consists of multiple microservices, including crop-disease prediction, vegetation index, crop recommendation, and yield prediction, all hosted in separate GitHub repositories.

🌟 About This Application
AgriVision provides a comprehensive digital ecosystem for farmers, combining e-commerce functionalities with AI-powered agricultural insights.

- 🚀 Project Setup
- 🗄️ MongoDB & Redis Integration
- 💳 Stripe Payment Setup
- 🔐 Robust Authentication System
- 🔑 JWT with Refresh/Access Tokens
- 📝 User Signup & Login
- 🛒 E-Commerce Core
- 📦 Product & Category Management
- 🛍️ Shopping Cart Functionality
- 💰 Checkout with Stripe
- 🏷️ Coupon Code System
- 👑 Admin Dashboard
- 📊 Sales Analytics
- 🎨 Design with Tailwind
- 🛒 Cart & Checkout Process
- 🔒 Security
- 🛡️ Data Protection
- 🚀Caching with Redis
- ⌛ And a lot more
- 🔄 Microservices Architecture

### 🌱 AI-Powered Agricultural Microservices

AgriVision also integrates various AI-based microservices to provide smart insights for farmers:

- 🏥 Crop-Disease Prediction – Identifies plant diseases using AI-powered image recognition.
- 📈 Vegetation Index – Provides insights into soil and crop health using remote sensing data.
- 🌾 Crop Recommendation System – Suggests the best crops to grow based on soil, weather, and historical data.
- 🌾 Yield Prediction – Uses AI models to predict potential crop yield based on environmental factors.
  Each of these microservices is hosted separately on GitHub and operates as an independent module, allowing for scalability and flexibility.

### Setup .env file

```bash
PORT=5000
MONGO_URI=your_mongo_uri

UPSTASH_REDIS_URL=your_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Run this app locally

```shell
npm run build
```

### Start the app

```shell
npm run start
```

## 💡 Contribution Guide

    We welcome open-source contributions! Whether you want to improve the marketplace, optimize AI models, or enhance security, your help is highly appreciated.

## 📝 How to Contribute

1. Fork this repository 📌
2. Clone your fork and set up the project locally:

```shell
git clone https://github.com/your-username/AgriVision.git
cd AgriVision
```

3. Create a new branch for your feature:

```shell
git checkout -b feature-branch-name
Raise an issue (if not already available).
```

4. Implement your changes and commit them:

```shell
git add .
git commit -m "Added feature: [Brief Description]"
git push origin feature-branch-name
Submit a Pull Request (PR) for review.
```

### 🚀 Issues Available for Contribution

You can contribute to AgriVision by working on:

- 🛒 Marketplace Enhancements – Improve the farmer marketplace with better UI, search filters, and payment enhancements.
- 🐞 Bug Fixes & Performance Optimization
- 🌍 Localization & Language Support
- 📈 AI Model Improvements (Crop Prediction, Disease Detection, etc.)
- 💳 Payment & Checkout Enhancements
- 🔌 API Integrations
  Check the Issues Tab for active contribution opportunities! 🚀

### 📬 Need Help?

If you have any questions, feel free to start a discussion or raise an issue. We appreciate your contributions and support in making AgriVision a powerful tool for farmers worldwide! 🌱🚀
