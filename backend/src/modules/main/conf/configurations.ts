export const CONFIGURATIONS = {

    environment: { frontendURL: '' },
    localFileName: 'sample_db.csv',
    service: {
        host : 'sandbox.rybbon.net',
        path: '/v1.5/giftclaim',
        port: 443,
        campaign_key: 'CAMPAIGN_KEY',
        auth: 'Basic BASE64_AUTH'
    }

};

export const DEV_ENV = {

    frontendURL: 'http://localhost:4200',

}
export const PROD_ENV = {

    frontendURL: 'http://website.com'

}