import { AppDataSource } from "../../data-source";
import Produto from "./Produto";

export const ProdutoRepositorio = AppDataSource.getRepository(Produto);

