declare namespace NodeJS {
	interface ProcessEnv {
		APP_NAME: string;
		NODE_ENV: string;
		PORT: string;
		// Add other environment variables here
	}
}
