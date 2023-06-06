import { DataSource } from "typeorm";
import Produto from "./models/entities/Produto";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "crudrevisao",
    synchronize: true,
    logging: true,
    entities: [Produto],
    subscribers: [],
    migrations: [],
})