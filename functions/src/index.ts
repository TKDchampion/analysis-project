import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import { router } from './router/router';


const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());

for (const route of router) {
    app.use(route.getPrefix(), route.getRouter())
}

export const webApi = functions.https.onRequest(main);
