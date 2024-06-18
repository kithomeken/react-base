interface AppConfig {
    FQDN: string;
    API_DOMAIN: string;
    APP_DOMAIN: string;
    API_KEY: Record<string, string>;
    logging: {
        level: string;
        remoteLogging: boolean;
    };
    version: string;
}


