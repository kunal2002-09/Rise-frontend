// src/utils/config.ts

// Check if environment variables are defined
const checkEnvVar = (key: string): string => {
    const value = process.env[key] ||'';
    if (!value) {
      console.log(`Environment variable ${key} is not defined.`);
     ;
    }
    return value;
  };
  
  // Configuration object
  const config = {
    googleMapsApiKey: checkEnvVar('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'),
    apiBaseUrl: checkEnvVar('NEXT_PUBLIC_API_BASE_URL'), // Add other env vars as needed
    // You can add more configuration options here
  };
  
  export default config;
  