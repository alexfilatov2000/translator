import React, { Suspense, StrictMode } from 'react';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {store} from "./redux/store";
import options from "./config/trOptions";
// import {createTheme} from "@mui/material";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(options)

const loadingMarkup = (
    <div className="py-4 text-center">
        <h3>Loading..</h3>
    </div>
)

function main(){
    root.render(
        // <StrictMode>
            <Suspense fallback={loadingMarkup}>
                <Provider store={store}>
                    <App/>
                    <ToastContainer theme="colored" />
                </Provider>
            </Suspense>
        // </StrictMode>
    );
}

main()
