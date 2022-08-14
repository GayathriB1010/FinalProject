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
    const client = new MongoClient("mongodb+srv://GayathriB1010:Monoto1995@cluster0.w1ih0.mongodb.net/?retryWrites=true&w=majority", options);

    try {
        await client.connect();
        const db = client.db("FinalProject");

        for (let i=0;i<2;i++){
            const project =({
                projectId : faker.datatype.number({ min: 1000000 }),
                projectName:faker.company.catchPhraseAdjective() ,
                projectDescription : faker.company.catchPhrase(),
                createdBy:"Millie_Tromp69@yahoo.com",
                userId:["Minerva98@yahoo.com","Felipe.Okuneva@hotmail.com","Aileen38@gmail.com","Tremayne.Walter58@yahoo.com","Roderick_Gottlieb6@gmail.com","Orion6@gmail.com","Amelia Bernier","Millie_Tromp69@yahoo.com","Michael_Hessel@hotmail.com"]
            })
            await db.collection("projects").insertOne(project);  
        }
    } catch (err) {
        console.log(`message: ${err.message}`);
    }

    client.close()

    
}

createUserData();