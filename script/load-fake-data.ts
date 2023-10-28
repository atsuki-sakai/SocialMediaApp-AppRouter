
import { Client } from "pg";
import { loadEnvConfig } from "@next/env";
import { faker } from "@faker-js/faker";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function loadFakeData(numUsers: number = 10) {

    const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_NAME,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRES_PORT!)
    });
    await client.connect();

    try{
        await client.query('begin');

        for(let i = 0; i < numUsers; i ++){
            console.log(`call index to ${i}`);
            await client.query("insert into public.users (username, password, avatar) values ($1, $2, $3)",
                [faker.internet.userName(), "password", faker.internet.avatar()]
            );
            console.log('pushed data');
        }
        
        await client.query('commit');
    }catch(error){
        await client.query('rollback');
        throw error
    }finally{
        console.log(`executing load fake data. generating ${numUsers} users.`);
        await client.end();
    }
};

const numUsers = parseInt(process.argv[2]) || 10;
console.log(`loading ${numUsers} fake users.`);
loadFakeData(numUsers);