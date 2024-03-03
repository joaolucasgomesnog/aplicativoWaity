import { Router } from "express";
import ItemController from "../controllers/ItemController";
import SolicitacaoController from "../controllers/SolicitacaoController";
import UsuarioController from "../controllers/UsuarioController";
import CidadeController from "../controllers/CidadeController";
import CategoriaController from "../controllers/CategoriaController";
import StatusController from "../controllers/StatusController";

const router = Router()

router.post("/usuario", UsuarioController.createUsuario)
router.get("/usuarios", UsuarioController.findAllUsuarios)
router.get("/usuario/:id", UsuarioController.findUsuarioById)
router.put("/usuario/:id", UsuarioController.updateUsuario)
router.delete("/usuario/:id", UsuarioController.deleteUsuarioById)

router.post("/item",ItemController.createItem)
router.get("/items",ItemController.findAllItems)
router.get("/item/:id",ItemController.findItemById)
router.get("/items/:categoria",ItemController.findItemByCategoria)
router.put("/item/:id",ItemController.updateItem)
router.delete("/item/:id",ItemController.deleteItemById)

router.post("/cidade", CidadeController.createCidade)
router.get("/cidades", CidadeController.findAllCidades)
router.get("/cidade/:id", CidadeController.findCidadeById)
router.put("/cidade/:id", CidadeController.updateCidade)
router.delete("/cidade/:id", CidadeController.deleteCidadeById)


router.post("/solicitacao",SolicitacaoController.createSolicitacao)
router.get("/solicitacoes",SolicitacaoController.findAllSolicitacoes)
router.get("/solicitacao/:id",SolicitacaoController.findSolicitacaoById)
router.get("/solicitacoes/categoria/:categoria/usuario/:emailUsuario", SolicitacaoController.findSolicitacoesCategoriaEmail)
router.get("/solicitacoes/categoria/:categoria/usuario/:emailUsuario/status/:status", SolicitacaoController.countSolicitacoesByStatus)
router.put("/solicitacao/:id",SolicitacaoController.updateSolicitacaoStatus)
router.delete("/solicitacao/:id",SolicitacaoController.deleteSolicitacaoById)

router.post("/categoria", CategoriaController.createCategoria)
router.get("/categorias", CategoriaController.findAllCategorias)
router.get("/categoria/:id", CategoriaController.findCategoriaById)
router.put("/categoria/:id", CategoriaController.updateCategoria)
router.delete("/categoria/:id", CategoriaController.deleteCategoriaById)

router.post("/status", StatusController.createStatus)
router.get("/status", StatusController.findAllStatus)
router.get("/status/:id", StatusController.findStatusById)
router.put("/status/:id", StatusController.updateStatus)
router.delete("/status/:id", StatusController.deleteStatusById)

export {router}