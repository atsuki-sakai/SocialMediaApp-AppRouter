
import { Client } from "pg";
import { loadEnvConfig } from "@next/env";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

class DataLoader {

    // - Properties
    private client: Client;
    private generateCount: number;

    // - Constructor
    constructor(gennerateCount: number = 10) {
        this.generateCount = genenrateCount;
        const projectDir = process.cwd();
        loadEnvConfig(projectDir);

        this.client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_NAME,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRES_PORT!),
        });
    }

    // - Functions
    async dbConnect() {
        await this.client.connect();
    }

    async disconnect() {
        await this.client.end();
    }

    async beginTransaction() {
        await this.client.query('begin');
    }

    async commitTransaction() {
        await this.client.query('commit');
    }

    async rollbackTransaction() {
        await this.client.query('rollback');
    }

    async insertUser() {
        const username = faker.internet.userName();
        const avatar = faker.internet.avatar();
        const saltRounds  =10;
        const hash = await bcrypt.hash("social_media_app", saltRounds);

        await this.client.query("insert into public.users (username, password, avatar) values ($1, $2, $3)",
        [username, hash, avatar]
        );
    }

    async loadUserData() {
        try {
        await this.beginTransaction();

        for (let i = 0; i < genenrateCount; i++) {
            await this.insertUser();
        }

        await this.commitTransaction();
        } catch (error) {
        await this.rollbackTransaction();
        throw error;
        }
    }

    async loadPostsData() {
        try {
        await this.beginTransaction();

        const res = await this.client.query(
            "select id from public.users order by created_at desc limit $1",
            [genenrateCount]
        );

        for (const row of res.rows) {
            for (let i = 0; i < genenrateCount; i++) {
            await this.client.query(
                "insert into public.posts (user_id, content) values ($1, $2)",
                [row.id, faker.lorem.sentence()]
            )
            }
        }

        await this.commitTransaction();
        } catch (error) {
        await this.rollbackTransaction();
        throw error;
        }
    }

    async loadFollowsData() {
        try {
        await this.beginTransaction();

        const res = await this.client.query(
            "select id from public.users"
        );

        for (const row of res.rows) {
            for (const row2 of res.rows) {
            if (row.id !== row2.id) {
                if (Math.random() > 0.5) {
                await this.client.query(
                    "insert into follows (user_id, follower_id) values ($1, $2)",
                    [row.id, row2.id]
                )
                }
            }
            }
        }

        await this.commitTransaction();
        } catch (error) {
        await this.rollbackTransaction();
        throw error;
        }
    }
}

const genenrateCount = parseInt(process.argv[2]) || 10;
const dataLoader = new DataLoader(genenrateCount);

dataLoader.dbConnect().then(async () => {
    console.log('db connected.');
    await dataLoader.loadUserData();
    console.log('created users');
    await dataLoader.loadPostsData();
    console.log('created posts');
    await dataLoader.loadFollowsData();
    console.log('created follows');
}).catch((error) => {
    console.error("Error: ", error);
}).finally(() => {
    dataLoader.disconnect();
    console.log('db disconnected');
})
