import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default{

    async createCidade(req, res) {
        const { descricao } = req.body;

        try {
            const cidade = await prisma.cidade.create({
                data: {
                    descricao: descricao,
                }
            });

            res.json(cidade);
        } catch (error) {
            console.error('Erro ao criar cidade:', error);
            res.status(500).json({ error: 'Erro ao criar cidade' });
        }
    },

    async findAllCidades(req, res) {
        try {
            const cidades = await prisma.cidade.findMany()
            return res.json(cidades)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findCidadeById(req, res) {
        try {
            const { id } = req.params
            const cidade = await prisma.cidade.findUnique({ where: { id: Number(id) }})
            if (!cidade) return res.json({ error: "cidade não existe" })
            return res.json(cidade)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findCidadeByCategoria(req, res) {
        try {
            const { categoria } = req.params
            const cidade = await prisma.cidade.findMany({ where: { categoriaId: Number(categoria) }})
            if (!cidade) return res.json({ error: "cidade não existe" })
            return res.json(cidade)

        } catch (error) {
            return res.json({ error })
        }
    },


    async updateCidade(req, res) {
        try {
            const { id } = req.params

            const { descricao, categoria } = req.body;


            let cidade = await prisma.cidade.findUnique({ where: { id: Number(id) } })
            if (!cidade)
                return res.status(404).json({ error: "cidade não existe" })

            cidade = await prisma.cidade.update({ 
                where: { id: Number(id) }, 
                data: { 
                    descricao, 
                    categoria
                } 
            });
            return res.json(cidade)

        } catch (error) { 
            console.error(error)
            return res.status(500).json({ error: "Não foi possível atualizar o cidade" }) 
        }
    },

    async deleteCidadeById(req, res) {
        try {
            const { id } = req.params
            let cidade = await prisma.cidade.findUnique({ where: { id: Number(id) } })
            if (!cidade) return res.json({ error: "cidade não existe" })
            await prisma.cidade.delete({ where: { id: Number(id) } })
            return res.json({message: "cidade deletado"})
        } catch (error) {
            return res.json({ error })
        }
    },
}