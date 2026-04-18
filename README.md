# 🌿 EcoNova: Smart Waste Management System

EcoNova is a state-of-the-art, IoT-enabled Smart Waste Management System designed to optimize waste collection, encourage recycling, and reduce environmental impact through advanced technology.

## 🚀 Key Features

### 📡 Real-Time IoT Monitoring
- **Live Sensor Integration:** Connects directly to ESP32/IoT hardware via **Firebase Realtime Database**.
- **Dynamic Visuals:** 3D animated bin filling visuals triggered by live `fillPercent`, `temperature`, and `humidity` data.
- **Smart Alerts:** Instant toast notifications and dashboard logs when bins reach 25%, 50%, and 90% thresholds.

### ⚛️ Quantum-Inspired Route Optimization
- **QAOA Algorithm:** Uses a Quantum-Inspired Approximate Optimization Algorithm to solve the Travelling Salesman Problem (TSP) for waste collection trucks.
- **Efficiency Gain:** Reduces fuel consumption and time by calculating the most efficient path based on bin priority.
- **Dynamic Mapping:** Visualizes optimized routes using Leaflet.js with animated truck simulations.

### 🤖 AI Waste Classifier
- **Smart Segregation:** An integrated AI assistant that helps users classify waste into Organic, Recyclable, or Hazardous categories.
- **Sorting Tips:** Provides educational guidance to improve recycling accuracy and earn "Eco Points."

### 🎨 Premium UI/UX
- **Eco-Friendly Theme:** Lush green aesthetics with Glassmorphism and modern design tokens.
- **GSAP Animations:** High-performance staggered loading, cinematic splash screens, and smooth transitions powered by GreenSock.
- **Multi-Language Support:** Full localization for **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)**.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|-|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript, GSAP, Chart.js, Leaflet.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (User Auth), Firebase RTDB (IoT Data) |
| **Hardware** | ESP32, Ultrasonic Sensors (HC-SR04), DHT11 |

---

## 📦 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Rohit22o9/Smart-Waste-Management-System.git
   cd Smart-Waste-Management-System
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Ensure you have a MongoDB instance running.
   - Configure your Firebase project and update `js/firebase-config.js` if necessary.

4. **Run the Server**
   ```bash
   node server.js
   ```

5. **Access the App**
   - Open `index.html` in your browser or use a Live Server.
   - Default Admin Login: `admin` / `admin@123`

---

## 📸 Screenshots

*(Add your project screenshots here to showcase the stunning UI!)*

---

## 🌍 Impact
By combining **Quantum AI** with **Real-time IoT**, EcoNova transforms waste management from a routine task into an intelligent, data-driven utility, paving the way for sustainable smart cities.

---
**Developed with ❤️ for a Greener Tomorrow.**
