# React Native Expo App: Strava API Integration

This document outlines how to set up and run the project, key development decisions, and potential areas for improvement.

---

## **Project Overview**

This project is a React Native app developed with Expo and integrates the Strava API to fetch and display user activity and stats data. The app demonstrates features such as authentication with Strava, fetching activity metrics, and presenting the data in a user-friendly format.

---

## **Setup and Running the Project**

### **Prerequisites**

1. Node.js (v16 or later) installed.
2. Expo CLI installed globally:
   ```bash
   npm install -g expo-cli
   ```
3. A Strava developer account with a registered application:
   - Obtain your _Client ID_ and _Client Secret_ from the Strava Developer Portal.

### **Steps to Set Up**

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory with the following content (there is a sample .env in the root directory):

   ```plaintext
   EXPO_PUBLIC_CLIENT_ID=client_id
   EXPO_PUBLIC_CLIENT_SECRET=client_secret
   EXPO_PUBLIC_API_URL=https://www.strava.com/api/v3/
   EXPO_PUBLIC_AUTH_URL=https://www.strava.com/oauth/authorize
   EXPO_PUBLIC_TOKEN_URL=https://www.strava.com/oauth/token
   ```

4. **Run the App**:
   ```bash
   expo start
   ```
   Use the Expo Go app on your device or an emulator to preview the app.

---

## **Assumptions and Development Decisions**

1. **Authentication**:

   - OAuth2 is implemented for user login via Strava. The app handles token exchanges and refresh tokens for long-term access.
   - `expo-auth-session` was used for a streamlined authentication process in Expo.

2. **User Data**:

   - You need a account in Strava with data in order to use this app. If you don't have any activities in your account, you will not see any data displayed.

3. **UI Design**:
   - Basic UI components are implemented to display activity details. Styling was done using React Native's `StyleSheet` and the `react-native-paper` library to handle pre-made components.

---

## **Areas for Improvement**

1. **UI/UX Enhancements**:

   - Implement a more polished and dynamic interface using a design system library.
   - Add dark mode and accessibility features.

2. **Error Handling**:

   - Current error handling for API requests is minimal. Adding more robust fallback mechanisms and user notifications would improve user experience.

3. **Testing and Performance**:

   - Conduct more extensive testing on iOS.
