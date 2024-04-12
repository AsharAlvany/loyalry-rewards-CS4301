import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Test from './Test';
import reportWebVitals from './reportWebVitals';
import ItemCard from "./ItemCard"
import { MetaMaskProvider } from "@metamask/sdk-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <MetaMaskProvider
//       debug={false}
//       sdkOptions={{
//           dappMetadata: {
//               name: "Example React Dapp",
//               url: window.location.href,
//           },
//       }}
//   >
//       <Test />
//   </MetaMaskProvider>
    <div className='flex flex-col bg-Linen h-screen fixed top-0 left-0 w-screen'>
        <App/>
        <div className='grid w-full auto-rows-fr grid-cols-3 justify-center align-center gap-16 p-10'>
            <ItemCard item="Phone"/>
            <ItemCard item="Phone"/>
            <ItemCard item="Phone"/>
        </div>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
