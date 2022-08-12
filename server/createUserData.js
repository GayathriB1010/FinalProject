const { faker } = require('@faker-js/faker');
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const url = require("url");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};



const createUserData = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("FinalProject");

        for (let i=0;i<30;i++){
            const user =({
                firstName:faker.name.fullName(),
                lastName : faker.name.fullName(),
                email : faker.internet.email(),
                password : faker.internet.password(10),
                role: "user"
            })
            await db.collection("users").insertOne(user);  
        }
    
    } catch (err) {
    }

    client.close()

    
}

createUserData();