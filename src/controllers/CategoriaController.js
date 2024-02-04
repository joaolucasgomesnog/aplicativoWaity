import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default{

    async createCategoria(req, res) {
        const { descricao } = req.body;

        try {
            const categoria = await prisma.categoria.create({
                data: {
                    descricao: descricao
                }
            });

            res.json(categoria);
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            res.status(500).json({ error: 'Erro ao criar categoria' });
        }
    },

    async findAllCategorias(req, res) {
        try {
            const categorias = await prisma.categoria.findMany()
            return res.json(categorias)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findCategoriaById(req, res) {
        try {
            const { id } = req.params
            const categoria = await prisma.categoria.findUnique({ where: { id: Number(id) }})
            if (!categoria) return res.json({ error: "categoria não existe" })
            return res.json(categoria)

        } catch (error) {
            return res.json({ error })
        }
    },




    async updateCategoria(req, res) {
        try {
            const { id } = req.params

            const { descricao} = req.body;


            let categoria = await prisma.categoria.findUnique({ where: { id: Number(id) } })
            if (!categoria)
                return res.status(404).json({ error: "categoria não existe" })

            categoria = await prisma.categoria.update({ 
                where: { id: Number(id) }, 
                data: { 
                    descricao, 
                } 
            });
            return res.json(categoria)

        } catch (error) { 
            console.error(error)
            return res.status(500).json({ error: "Não foi possível atualizar o categoria" }) 
        }
    },

    async deleteCategoriaById(req, res) {
        try {
            const { id } = req.params
            let categoria = await prisma.categoria.findUnique({ where: { id: Number(id) } })
            if (!categoria) return res.json({ error: "categoria não existe" })
            await prisma.categoria.delete({ where: { id: Number(id) } })
            return res.json({message: "categoria deletado"})
        } catch (error) {
            return res.json({ error })
        }
    },
}