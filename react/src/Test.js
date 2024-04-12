import { useSDK } from "@metamask/sdk-react";
import React, { useEffect, useState } from "react";

const Test = () => {
    useEffect(()=>{
        console.log(connected)
    }, [])
    const [account, setAccount] = useState();
    const { sdk, connected, connecting, provider, chainId } = useSDK();

    const connect = async () => {
        try {
            console.log("attempting to connect")
            const accounts = await sdk?.connect();
            console.log(provider.getSelectedAddress);
            setAccount(accounts?.[0]);
        } catch (err) {
            console.warn("failed to connect..", err);
        }
    };

    return (
        <div className="App">
            <button style={{ padding: 10, margin: 10 }} onClick={connect}>
                Connect
            </button>
            {connected && (
                <div>
                    <>
                        {chainId && `Connected chain: ${chainId}`}
                        <p></p>
                        {account && `Connected account: ${account}`}
                    </>
                </div>
            )}
        </div>
    );
};

export default Test;