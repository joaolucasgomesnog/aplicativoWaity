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

    async findSolicitacoesCategoriaEmail(req, res) {
        try {
            const { categoria, emailUsuario } = req.params;
    
            const responsavel = await prisma.responsavel_categoria.findMany({
                where: {
                    categoria: {id: Number(categoria)},
                    responsavel: {email: emailUsuario}  // Supondo que `emailUsuario` seja o ID do usuário
                },
            });
    
            let solicitacoes;
            console.log(responsavel)
            if (responsavel) {
                // Se o usuário é o responsável, busca todas as solicitações
                solicitacoes = await prisma.solicitacao.findMany({
                    where: {
                        item: {categoriaId: Number(categoria)},
                    },
                    include: {
                        cidade: true,
                        usuario: true,
                        status: true,
                        item: true,
                    }
                });
            } else {
                // Se não é o responsável, busca apenas as solicitações específicas do usuário
                solicitacoes = await prisma.solicitacao.findMany({
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
            }
    
            if (!solicitacoes || solicitacoes.length === 0) {
                return res.json({ error: "Nenhuma solicitação encontrada" });
            }
    
            return res.json(solicitacoes);
        } catch (error) {
            console.error('Erro ao buscar solicitações:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
    

    async countSolicitacoesByStatus(req, res) {
        try {
            const { categoria, emailUsuario, status} = req.params;

            const solicitacoes = await prisma.solicitacao.count({
                where: {
                    item: {categoriaId: Number(categoria)},
                    usuario: { email: emailUsuario },
                    status: {id: Number(status)}
                }
            });

            if (!solicitacoes || solicitacoes.length === 0) {
                return res.json(0);
            }

            return res.json(solicitacoes);
        } catch (error) {
            console.error('Erro ao buscar solicitações:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async updateSolicitacaoStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
    
            let solicitacao = await prisma.solicitacao.findUnique({ where: { id: Number(id) } });
            
            if (!solicitacao) {
                return res.status(404).json({ error: "Solicitação não existe" });
            }
    
            solicitacao = await prisma.solicitacao.update({
                where: { id: Number(id) },
                data: {
                    status: { connect: { id: Number(status) } } // Update 'statusId' to 'status'
                }
            });
    
            return res.json(solicitacao);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Não foi possível atualizar a solicitação" });
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