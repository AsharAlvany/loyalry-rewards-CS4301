const ethers = require("ethers");
const express = require("express");
const app = express();
const fs = require("fs");
const cors=require("cors");
const { type } = require("node:os");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const file = fs.readFileSync("artifacts/contracts/CryptoPoints.sol/CryptoPoints.json", "utf8")
const json = JSON.parse(file)
const ABI = json.abi

async function getPoints(user){
    const usdcAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.WebSocketProvider(
        `ws://localhost:8545`
    );
    const contract = new ethers.Contract(usdcAddress, ABI, provider);
    return contract.getPoints(`${user}`);
}

async function getUsers(){
    const usdcAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.WebSocketProvider(
        `ws://localhost:8545`
    );
    const contract = new ethers.Contract(usdcAddress, ABI, provider);
    return contract.getUsers();
}

async function awardPoints(user, amount){
    const usdcAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.WebSocketProvider(
        `ws://localhost:8545`
    );
    const signer = (await provider.getSigner());
    const contract = new ethers.Contract(usdcAddress, ABI, signer);
    contract.awardPoints(`${user}`, amount);
}

async function redeemPoints(user, amount){
    try {
        const usdcAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const provider = new ethers.WebSocketProvider(
            `ws://localhost:8545`
        );
        const signer = (await provider.getSigner());
        const contract = new ethers.Contract(usdcAddress, ABI, signer);
        await contract.redeemPoints(`${user}`, amount);
        return "Success";
    } catch (error) {
        return "Error"
    }
}

async function createUser(user){
    try {
        const usdcAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const provider = new ethers.WebSocketProvider(
            `ws://localhost:8545`
        );
        const signer = (await provider.getSigner());
        const contract = new ethers.Contract(usdcAddress, ABI, signer);
        await contract.createUser(`${user}`);
        return "Success";
    } catch (error) {
        return "Error";
    }
}

server = app.listen(3030, function () {
    let host = server.address().address;
    let port = server.address().port;
}); 

// returns the points of the user in the response variable
app.get("/getPoints/:user", async function(req, res){
    getPoints(req.params.user).then((resp) =>{
        return resp.toString();
    }).then((response) => {
        console.log(response);
        res.send(response);
    })
})
app.get("/getUsers", async function(req, res){
    getUsers().then((resp) =>{
        return JSON.stringify(resp);
    }).then((response) => {
        console.log(response);
        res.send(response);
    })
})
app.get("/awardPoints/:user/:points", async function(req, res){
    awardPoints(req.params.user, req.params.points).then((response) => {
        console.log(response);
        res.send("Success");
    }).catch(()=>{
        // console.log(err);
        res.send("Error");
    })
})
app.get("/redeemPoints/:user/:points", async function(req, res){
    try{
        redeemPoints(req.params.user, req.params.points).then((response) => {
            // console.log(response);
            res.send(response);
        })
    }
    catch(error){
        res.send("Success");
    }
})
app.get("/createUser/:user", async function(req, res){
    console.log(req.params.user);
    createUser(req.params.user).then((response) => {
        res.send(response);
    }).catch(()=>{
        // console.log(err);
        res.send("Error");
    })
})