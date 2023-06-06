import { z } from "zod";

export interface ProdutoDto {
    nome: string;
    serie: number;
    descricao: string;
    preco: number;
}

export const ProdutoSchema = z.object({
    nome: z.string().min(2),
    serie: z.coerce.number().min(1),
    descricao: z.string().optional(),
    preco: z.coerce.number()

})

export const ProdutoId = z.object({
    id: z.string().length(36)
})


