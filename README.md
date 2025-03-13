<h1 align="center">🌾 AgriVision 🚜- AI-powered solution to  take care farmers . </h1>

AgriVision is an open-source initiative aimed at empowering farmers with AI-driven solutions and an integrated marketplace for seamless trading. This project consists of multiple microservices, including crop-disease prediction, vegetation index, crop recommendation, and yield prediction, all hosted in separate GitHub repositories.

🌟 About This Application
AgriVision provides a comprehensive digital ecosystem for farmers, combining e-commerce functionalities with AI-powered agricultural insights.

🔥 Core Features
🚀 Project Setup
🗄️ MongoDB & Redis Integration
💳 Stripe Payment Setup
🔐 Robust Authentication System
🔑 JWT with Refresh/Access Tokens
📝 User Signup & Login
🛒 E-Commerce Core
📦 Product & Category Management
🛍️ Shopping Cart Functionality
💰 Checkout with Stripe
🏷️ Coupon Code System
👑 Admin Dashboard
📊 Sales Analytics
🎨 Tailwind CSS for UI
🛒 Cart & Checkout Process
🔒 Security & Data Protection
🛡️ Caching with Redis
🔄 Microservices Architecture
🌱 AI-Powered Agricultural Microservices
AgriVision also integrates various AI-based microservices to provide smart insights for farmers:

🏥 Crop-Disease Prediction – Identifies plant diseases using AI-powered image recognition.
📈 Vegetation Index – Provides insights into soil and crop health using remote sensing data.
🌾 Crop Recommendation System – Suggests the best crops to grow based on soil, weather, and historical data.
🌾 Yield Prediction – Uses AI models to predict potential crop yield based on environmental factors.
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
