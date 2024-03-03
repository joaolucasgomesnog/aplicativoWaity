import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default{

    async createUsuario(req, res) {
        const { nome, email } = req.body;

        try {
            const usuario = await prisma.usuario.create({
                data: {
                    nome: nome,
                    cpf: email,
                }
            });

            res.json(usuario);
        } catch (error) {
            console.error('Erro ao criar usuario:', error);
            res.status(500).json({ error: 'Erro ao criar usuario' });
        }
    },

    async findAllUsuarios(req, res) {
        try {
            const usuarios = await prisma.usuario.findMany()
            return res.json(usuarios)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findUsuarioById(req, res) {
        try {
            const { id } = req.params
            const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) }})
            if (!usuario) return res.json({ error: "usuario não existe" })
            return res.json(usuario)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findUsuarioByEmail(req, res) {
        try {
            const { email } = req.params
            const usuario = await prisma.usuario.findMany({ where: { email: email }})
            if (!usuario) return res.json({ error: "usuario não existe" })
            return res.json(usuario)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findUsuarioByAll(req, res) {
        try {
            const { nome } = req.params;
            const usuarios = await prisma.$queryRaw`
            SELECT * FROM "usuario"
            WHERE LOWER("nome") LIKE ${`%${nome.toLowerCase()}%`}
            OR "cpf" LIKE ${`%${nome}%`}
            OR "rg" LIKE ${`%${nome}%`};
            
        `;
    
            if (!usuarios || usuarios.length === 0) {
                return res.json({ error: "usuario não existe" });
            }
    
            return res.json(usuarios);
        } catch (error) {
            console.error("Erro ao buscar usuarios:", error);
            return res.status(500).json({ error: "Ocorreu um erro ao buscar usuarios." });
        }
    },

    async updateUsuario(req, res) {
        try {
            const { id } = req.params

            const { nome, email } = req.body;


            let usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } })
            if (!usuario)
                return res.status(404).json({ error: "usuario não existe" })

            usuario = await prisma.usuario.update({ 
                where: { id: Number(id) }, 
                data: { 
                    nome, 
                    email
                } 
            });
            return res.json(usuario)

        } catch (error) { 
            console.error(error)
            return res.status(500).json({ error: "Não foi possível atualizar o usuario" }) 
        }
    },

    async deleteUsuarioById(req, res) {
        try {
            const { id } = req.params
            let usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } })
            if (!usuario) return res.json({ error: "usuario não existe" })
            await prisma.usuario.delete({ where: { id: Number(id) } })
            return res.json({message: "usuario deletado"})
        } catch (error) {
            return res.json({ error })
        }
    },
}