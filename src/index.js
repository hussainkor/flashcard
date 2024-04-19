import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

function Index() {
    return (
        <App />
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><Index /></React.StrictMode>);