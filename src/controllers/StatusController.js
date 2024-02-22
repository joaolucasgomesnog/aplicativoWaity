import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default{

    async createStatus(req, res) {
        const { descricao } = req.body;

        try {
            const status = await prisma.status.create({
                data: {
                    descricao: descricao
                }
            });

            res.json(status);
        } catch (error) {
            console.error('Erro ao criar status:', error);
            res.status(500).json({ error: 'Erro ao criar status' });
        }
    },

    async findAllStatus(req, res) {
        try {
            const categorias = await prisma.status.findMany()
            return res.json(categorias)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findStatusById(req, res) {
        try {
            const { id } = req.params
            const status = await prisma.status.findUnique({ where: { id: Number(id) }})
            if (!status) return res.json({ error: "status não existe" })
            return res.json(status)

        } catch (error) {
            return res.json({ error })
        }
    },




    async updateStatus(req, res) {
        try {
            const { id } = req.params

            const {descricao} = req.body;


            let status = await prisma.status.findUnique({ where: { id: Number(id) } })
            if (!status)
                return res.status(404).json({ error: "status não existe" })

            status = await prisma.status.update({ 
                where: { id: Number(id) }, 
                data: { 
                    descricao, 
                } 
            });
            return res.json(status)

        } catch (error) { 
            console.error(error)
            return res.status(500).json({ error: "Não foi possível atualizar o status" }) 
        }
    },

    async deleteStatusById(req, res) {
        try {
            const { id } = req.params
            let status = await prisma.status.findUnique({ where: { id: Number(id) } })
            if (!status) return res.json({ error: "status não existe" })
            await prisma.status.delete({ where: { id: Number(id) } })
            return res.json({message: "status deletado"})
        } catch (error) {
            return res.json({ error })
        }
    },
}