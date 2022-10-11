import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import firebase from "fbase"
import "styles.css" 
import "reset.css" 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className='containbox'>
        <App />
    </div>
);
