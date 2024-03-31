const ethers = require("ethers");
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const { type } = require("node:os");

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const file = fs.readFileSync("artifacts/contracts/CryptoPoints.sol/CryptoPoints.json", "utf8");
const json = JSON.parse(file);
const ABI = json.abi;

// Replace with your actual server's private key (store securely!)
const serverPrivateKey = "...";

async function getPoints(user) {
    const provider = new ethers.WebSocketProvider(`ws://localhost:8545`);
    const signer = new ethers.Wallet(serverPrivateKey, provider);
    const contract = new ethers.Contract("YOUR_CONTRACT_ADDRESS", ABI, signer); // Replace with deployed contract address
    return contract.getPoints(user);
}

async function getUsers() {
    const provider = new ethers.WebSocketProvider(`ws://localhost:8545`);
    const signer = new ethers.Wallet(serverPrivateKey, provider);
    const contract = new ethers.Contract("YOUR_CONTRACT_ADDRESS", ABI, signer); // Replace with deployed contract address
    return contract.getUsers();
}

async function awardPoints(user, amount) {
    const provider = new ethers.WebSocketProvider(`ws://localhost:8545`);
    const signer = new ethers.Wallet(serverPrivateKey, provider);
    const contract = new ethers.Contract("YOUR_CONTRACT_ADDRESS", ABI, signer); // Replace with deployed contract address
    await contract.awardPoints(user, amount);
}

async function redeemPoints(user, amount) {
    const provider = new ethers.WebSocketProvider(`ws://localhost:8545`);
    const signer = new ethers.Wallet(serverPrivateKey, provider);
    const contract = new ethers.Contract("YOUR_CONTRACT_ADDRESS", ABI, signer); // Replace with deployed contract address
    await contract.redeemPoints(user, amount);
}

async function createUser(user) {
    const provider = new ethers.WebSocketProvider(`ws://localhost:8545`);
    const signer = new ethers.Wallet(serverPrivateKey, provider);
    const contract = new ethers.Contract("YOUR_CONTRACT_ADDRESS", ABI, signer); // Replace with deployed contract address
    await contract.createUser(user);
}

app.post("/register", async function (req, res) {
    const { username, email, password } = req.body;

    try {
        await registerUser(username, email, password); // Implement secure registration
        res.send("Registration successful");
    } catch (error) {
        console.error(error);
        res.status(400).send("Registration failed");
    }
});

app.post("/login", async function (req, res) {
    const { username, password } = req.body;

    try {
        const authenticatedUser = await authenticateUser(username, password); // Use appropriate authentication logic

        if (authenticatedUser) {
            const token = generateAuthToken(authenticatedUser); // Implement token generation
            res.send({ token });
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

const server = app.listen(3030, function () {
    let host = server.address().address;
    let port = server.address().port;
});

app.get("/getPoints/:user", async function (req, res) {
    try {
        const username = await authenticateUser(req.params.user, req.headers.authorization, req.params.user); // Assuming username is stored during login
        const points = await getPoints(username);
        res.send(points.toString());
    } catch (error) {
        console.error(error);
        res.status(401).send("Unauthorized");
    }
});

app.get
