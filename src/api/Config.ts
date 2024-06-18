const Config: AppConfig ={
    FQDN: process.env.NODE_ENV === 'production'
    ? 'https://sojourn.theapplication.online.com'
    : 'https://sojourn.theapplication.online.com',

    API_DOMAIN: process.env.NODE_ENV === 'production'
    ? 'https://core.sojourn.theapplication.online.com'
    : 'https://core.sojourn.theapplication.online.com',

    APP_DOMAIN: process.env.NODE_ENV === 'production'
    ? 'https://app.sojourn.theapplication.online.com'
    : 'https://app.sojourn.theapplication.online.com',

    API_KEY: undefined,

    logging: {
        level: 'error',
        remoteLogging: false
    },

    version: '1.0.0.0'
}

export default Config