import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default{

    async createItem(req, res) {
        const { descricao, categoria } = req.body;

        try {
            const item = await prisma.item.create({
                data: {
                    descricao: descricao,
                    categoria: categoria,
                }
            });

            res.json(item);
        } catch (error) {
            console.error('Erro ao criar item:', error);
            res.status(500).json({ error: 'Erro ao criar item' });
        }
    },

    async findAllItems(req, res) {
        try {
            const items = await prisma.item.findMany()
            return res.json(items)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findItemById(req, res) {
        try {
            const { id } = req.params
            const item = await prisma.item.findUnique({ where: { id: Number(id) }})
            if (!item) return res.json({ error: "item não existe" })
            return res.json(item)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findItemByCategoria(req, res) {
        try {
            const { categoria } = req.params
            const item = await prisma.item.findMany({ where: { categoriaId: Number(categoria) }})
            if (!item) return res.json({ error: "item não existe" })
            return res.json(item)

        } catch (error) {
            return res.json({ error })
        }
    },


    async updateItem(req, res) {
        try {
            const { id } = req.params

            const { descricao, categoria } = req.body;


            let item = await prisma.item.findUnique({ where: { id: Number(id) } })
            if (!item)
                return res.status(404).json({ error: "item não existe" })

            item = await prisma.item.update({ 
                where: { id: Number(id) }, 
                data: { 
                    descricao, 
                    categoria
                } 
            });
            return res.json(item)

        } catch (error) { 
            console.error(error)
            return res.status(500).json({ error: "Não foi possível atualizar o item" }) 
        }
    },

    async deleteItemById(req, res) {
        try {
            const { id } = req.params
            let item = await prisma.item.findUnique({ where: { id: Number(id) } })
            if (!item) return res.json({ error: "item não existe" })
            await prisma.item.delete({ where: { id: Number(id) } })
            return res.json({message: "item deletado"})
        } catch (error) {
            return res.json({ error })
        }
    },
}