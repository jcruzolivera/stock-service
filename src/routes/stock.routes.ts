import { Router } from 'express';
import {
    getStockByArticleId,
    calculateStockFromMovements,
    configureStock,
    //replenishStock,
    //validateStock

} from '../controllers';

import { checkStockConfig, checkAuth } from '../middlewares';

const router = Router();

//Obtener stock por id de articulo
router.get('/:articleId', getStockByArticleId as any);

//Configurar stock nuevo o existente
router.post('/', checkAuth, checkStockConfig, configureStock as any);

//Reponer stock de articulo
//router.post('/replenish', checkAuth, replenishStock as any);

//Validar stock de artículo
//router.post('/validate', checkAuth, validateStock as any);

//Calcular stock de articulo por movimientos
router.put('/calculate/:articleId', checkAuth, calculateStockFromMovements as any);

export default router;
