import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {

    async createSolicitacao(req, res) {
        const { cidadeId, usuarioId, observacao, quantidade, itemId } = req.body;

        try {
            const solicitacao = await prisma.solicitacao.create({
                data: {
                    itemId: itemId,
                    quantidade: quantidade,
                    cidadeId: cidadeId,
                    usuarioId: usuarioId,
                    observacao: observacao
                }
            });

            res.json(solicitacao);
        } catch (error) {
            console.error('Erro ao criar solicitacao:', error);
            res.status(500).json({ error: 'Erro ao criar solicitacao' });
        }
    },

    async findAllSolicitacoes(req, res) {
        try {
            const solicitacoes = await prisma.solicitacao.findMany({
                include: {
                    cidade: true,
                    usuario: true,
                    status: true,
                    item: true,
                }
            },)
            return res.json(solicitacoes)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findSolicitacaoById(req, res) {
        try {
            const { id } = req.params
            const solicitacao = await prisma.solicitacao.findUnique({ where: { id: Number(id) } })
            if (!solicitacao) return res.json({ error: "solicitacao não existe" })
            return res.json(solicitacao)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findSolicitacoesCategoria(req, res) {
        try {
            const { categoria, emailUsuario } = req.params;

            const solicitacoes = await prisma.solicitacao.findMany({
                where: {
                    item: {categoriaId: Number(categoria)},
                    usuario: { email: emailUsuario }
                },
                include: {
                    cidade: true,
                    usuario: true,
                    status: true,
                    item: true,
                }
            });

            if (!solicitacoes || solicitacoes.length === 0) {
                return res.json({ error: "Nenhuma solicitação encontrada" });
            }

            return res.json(solicitacoes);
        } catch (error) {
            console.error('Erro ao buscar solicitações:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },


    async updateSolicitacaoStatus(req, res) {
        try {
            const { id } = req.params

            const { status } = req.body;


            let solicitacao = await prisma.solicitacao.findUnique({ where: { id: Number(id) } })
            if (!solicitacao)
                return res.status(404).json({ error: "solicitacao não existe" })

            solicitacao = await prisma.solicitacao.update({
                where: { id: Number(id) },
                data: {
                    statusId: status
                }
            });
            return res.json(solicitacao)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Não foi possível atualizar o solicitacao" })
        }
    },

    async deleteSolicitacaoById(req, res) {
        try {
            const { id } = req.params
            let solicitacao = await prisma.solicitacao.findUnique({ where: { id: Number(id) } })
            if (!solicitacao) return res.json({ error: "solicitacao não existe" })
            await prisma.solicitacao.delete({ where: { id: Number(id) } })
            return res.json({ message: "solicitacao deletada" })
        } catch (error) {
            return res.json({ error })
        }
    },
}