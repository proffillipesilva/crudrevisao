import { Router } from 'express';
import ProdutoController from '../controllers/produto.controller';
import { validateRequest } from 'zod-express-middleware';
import { ProdutoId, ProdutoSchema } from '../dto/ProdutoDto';
import upload from '../middlewares/storage';

const produtoRouter = Router();

produtoRouter.post('/', validateRequest({body: ProdutoSchema }), ProdutoController.getInstance().createProduct)
produtoRouter.get('/:id', validateRequest({params: ProdutoId }), ProdutoController.getInstance().readProductById)
produtoRouter.get('/', ProdutoController.getInstance().readAllProducts);
produtoRouter.put('/:id', validateRequest({body: ProdutoSchema, params: ProdutoId}), ProdutoController.getInstance().updateProduct)
produtoRouter.put('/:id/photo', validateRequest({params: ProdutoId}), upload.single('avatar'), ProdutoController.getInstance().updateProductImage)
produtoRouter.delete('/:id', validateRequest({params: ProdutoId}), ProdutoController.getInstance().deleteProductById);

export default produtoRouter;