import { Request, Response, NextFunction} from 'express'
import ProdutoService from '../services/produto.service';

class ProdutoController {
    private static instance: ProdutoController;
    private constructor(){

    }
    // Singleton
    public static getInstance(): ProdutoController {
        if(!ProdutoController.instance){
            ProdutoController.instance = new ProdutoController();
        }
        return ProdutoController.instance;
    }

    public async createProduct(req: Request, res: Response){
        try {
        const produtoDto = req.body;
        const produtoSalvo = await ProdutoService.getInstance().createProduct(produtoDto);
        res.json(produtoSalvo);
        } catch(error) {
            res.status(500).json(error);
        }        
    }

    public async readAllProducts(req: Request, res: Response){
        const products = await ProdutoService.getInstance().readAllProducts();
        res.json(products);
    }

    public async readProductById(req: Request, res: Response){
        try{
        const id = req.params.id;
        const product = await ProdutoService.getInstance().readProductById(id);
        res.json(product);
        } catch(error){
            res.status(500).send(error);
        }
    }

    public async updateProduct(req: Request, res: Response){
        try {
        const produtoDto = req.body;
        const id = req.params.id;
       await ProdutoService.getInstance().updateProduct(produtoDto, id);
        res.json('ok');
        } catch(error) {
            res.status(500).json(error);
        }        
    }

    public async updateProductImage(req: Request, res: Response){
        try {
        const file = req.file;
        if(file == null) throw new Error();
        const id = req.params.id;
       await ProdutoService.getInstance().updateProductImage(file, id);
        res.json('ok');
        } catch(error) {
            res.status(500).json(error);
        }        
    }

    public async deleteProductById(req: Request, res: Response){
        try{
        const id = req.params.id;
       await ProdutoService.getInstance().deleteProductById(id);
        res.json('ok')
        } catch(error){
            res.status(500).send(error);
        }
    }

    

}

export default ProdutoController;
 