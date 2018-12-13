# Be Heard Boston - Survey Amazon Gift Card Redemption



## Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Angular CLI](https://cli.angular.io/)

## Frontend

### Running / Development

* Install the latest angular, `npm install @angular/cli@latest -g`
* Clone this repository, `git clone <repository-url>`
* Change the working directory, `cd be-heard-boston/frontend`
* Install the frontend dependencies, `npm install`
* Start the local server for development, `npm start`
* Visit the app at [http://localhost:4200](http://localhost:4200) with hot-reload enabled.

### Configure Backend API

`beheardboston/frontend/src/environments/environment.prod.ts`

```
export const environment = {
    backendAPIUrl: 'https://beheardboston.org/backend/api/v1',
    production: true
};
```

`beheardboston/frontend/src/environments/environment.ts`

```
export const environment = {
  backendAPIUrl: 'http://localhost:3000/api/v1',
  production: false
};
```

### Building

* `ng build` (development)
* `ng build --prod --base-href http://website-address` (production)
* `ng build --prod --base-href "https://website-address/sub-directory" --deploy-url "/sub-directory/"` (sub-directory)

## Backend Server (Rybbon API)

### Running

* Change the working directory, `cd be-heard-boston/backend`
* Install the frontend dependencies, `npm install`
* `npm start` to start the NodeJS server with grunt watch.
* Development API served at `http://localhost:3000/api/v1`

### API Configuration

Configutation File: `be-heard-boston/backend/src/modules/main/conf/configurations.ts`.

```
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
```

## Demo

![be-heard-boston-demo](/demo/beheardboston_demo.gif?raw=true "App Demo")
