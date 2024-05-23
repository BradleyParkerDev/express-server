declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      // Add other environment variables here
      CHAT_APP_DB: string;
    }
  }
  