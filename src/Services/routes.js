import { Router } from "express";
import ItemController from "../controllers/ItemController";
import SolicitacaoController from "../controllers/SolicitacaoController";
import UsuarioController from "../controllers/UsuarioController";

const router = Router()

router.post("/usuario", UsuarioController.createUsuario)
router.get("/usuarios", UsuarioController.findAllUsuarios)
router.get("/usuario/:id", UsuarioController.findUsuarioById)
router.put("/usuario/:id", UsuarioController.updateUsuario)
router.delete("/usuario/:id", UsuarioController.deleteUsuarioById)

router.post("/item",ItemController.createItem)
router.get("/items",ItemController.findAllItems)
router.get("/item/:id",ItemController.findItemById)
router.put("/item/:id",ItemController.updateItem)
router.delete("/item/:id",ItemController.deleteItemById)



router.post("/solicitacao",SolicitacaoController.createSolicitacao)
router.get("/solicitacao",SolicitacaoController.findAllSolicitacoes)
router.get("/solicitacao/:id",SolicitacaoController.findSolicitacaoById)
// router.put("/solicitacao/:id",SolicitacaoController.updateSolicitacao)
router.delete("/solicitacao/:id",SolicitacaoController.deleteSolicitacaoById)



export {router}