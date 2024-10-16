import { Router } from "express";
import { getToken } from "../auth";

const router = Router();

//Calcular stock de articulo por movimientos
router.get("/", getToken);

export default router;
