import { ProdutoDto } from "../dto/ProdutoDto";
import Produto from "../models/entities/Produto";
import { ProdutoRepositorio } from "../models/entities/Repositories";
import { v4 } from "uuid";
import Jimp from "jimp";
import fs from 'fs';

class ProdutoService {
    private static instance: ProdutoService;
    private constructor(){

    }
    // Singleton
    public static getInstance(): ProdutoService {
        if(!ProdutoService.instance){
            ProdutoService.instance = new ProdutoService();
        }
        return ProdutoService.instance;
    }

    public async createProduct(dto: ProdutoDto): Promise<Produto> {
        try{
        const produto = new Produto();
        produto.nome = dto.nome;
        produto.descricao = dto.descricao;
        produto.preco = dto.preco;
        produto.serie = dto.serie;
        produto.id = v4();
            return await ProdutoRepositorio.save(produto)
        } catch(err) {
            return Promise.reject(new Error('Nao consegui salvar'));
        }
    }

    public async readAllProducts(): Promise<Produto[]> {
        return await ProdutoRepositorio.find();
    }

    public async readProductById(id: string): Promise<Produto> {
        const produtoSelecionado = await ProdutoRepositorio.findOneBy({id});
        if(produtoSelecionado){
            return Promise.resolve(produtoSelecionado);
        } else {
            return Promise.reject('Not found')
        }
    }

    public async updateProduct(dto: ProdutoDto, id: string): Promise<Produto> {
        try{

        const produto = await ProdutoRepositorio.findOneBy({id})
        if(!produto){
            return Promise.reject('Not Found')
        }
        produto.nome = dto.nome;
        produto.descricao = dto.descricao;
        produto.preco = dto.preco;
        produto.serie = dto.serie;
            return await ProdutoRepositorio.save(produto)
        } catch(err) {
            return Promise.reject(new Error('Nao consegui atualizar'));
        }
    }

    public async updateProductImage(file: Express.Multer.File, id: string) : Promise<void> {
        try{

            const produto = await ProdutoRepositorio.findOneBy({id})
            if(!produto){
                return Promise.reject('Not Found')
            }
            const nomeImagem = `avatar_${id}.jpg`;
            const imagem = await Jimp.read(file.path);
            await imagem.resize(500,500);
            await imagem.writeAsync('public/images/' + nomeImagem);
            if(fs.existsSync(file.path))
                fs.unlinkSync(file.path);
            produto.imagem = nomeImagem;
            await ProdutoRepositorio.save(produto);

            
        } catch(err) {
            return Promise.reject('Nao pode processar imagem')
        }
    }

    public async deleteProductById(id: string): Promise<void> {
        try {
            await ProdutoRepositorio.delete({id});
        } catch(err){
            return Promise.reject('Not found')
        }
    }
}

export default ProdutoService;