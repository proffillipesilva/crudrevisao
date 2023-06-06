import express, {Express} from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import produtoRouter from "./routes/produto.router";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

AppDataSource.initialize().then(() => console.log("Banco inicializado"))

app.use('/app/produtos', produtoRouter);

app.listen(38000, () => console.log("Iniciando"));
