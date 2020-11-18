import 'babel-polyfill';
import * as express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppReducer from "../src/store/index";
import { StaticRouter } from 'react-router-dom';

import App from '../src/components/App';

const app = express();
const _CSSURL = '/style.css';
const _SCRIPTURL = '/client_bundle.js';
const _PUBLICFOLDERURL = 'server-build/public';

app.use(express.static(_PUBLICFOLDERURL));

app.get('*', async (req, res) => {

    const store = createStore(
        AppReducer
    );

    const appMarkup = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                <App />
            </StaticRouter>
        </Provider>
    );

    const preloadedState = store.getState()


    res.send(`<!doctype html>
      <head>
      <link rel="stylesheet" href="${_CSSURL}"></style/>
      </head>
      <body>
      <div id="root">${appMarkup}</div>
      <script>
        window.__PRELOADED_STATE__= ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
    )}
        </script>
        <script type="text/javascript" src="${_SCRIPTURL}" defer></script> 
      </body>
    `);
});

app.listen(3030, () => console.log('Listening on localhost:3030'));

