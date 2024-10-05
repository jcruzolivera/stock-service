import { Router } from 'express';
import {
    getStockByArticleId,
    calculateStockFromMovements,
    configureStock,
    replenishStock,
    validateStock

} from './../controllers';

const router = Router();

//Obtener stock por id de articulo
router.get('/:articleId', getStockByArticleId as any);

//Configurar stock nuevo o existente
router.post('/', configureStock as any);

//Reponer stock de articulo
router.post('/replenish', replenishStock as any);

//Validar stock de artículo
router.post('/validate', validateStock as any);

//Calcular stock de articulo por movimientos
router.get('/calculate/:articleId', calculateStockFromMovements as any);

export default router;
