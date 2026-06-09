import express from 'express';
import deleteOrden from '../controllers/ordenes/delete.orden.controller.ts';
import {getAllOrdenes, getOrdenById} from '../controllers/ordenes/get.orden.controller.ts';
import postOrden from '../controllers/ordenes/post.orden.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.ts';


const router = express.Router();

router.get('/', validateAccessToken, getAllOrdenes);

router.post('/', postOrden);

router.get('/:ordenId', getOrdenById);

// PUT /ordenes/:ordenId
// router.put('/:ordenId', (req: express.Request, res: express.Response) => {
//   const id = parseInt(req.params.ordenId as string);
//   Orden.findById(id, (err : Error | null, orden : any) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });
    
//     const { productos } = req.body;
//     if (!productos || !Array.isArray(productos)) {
//       return res.status(400).json({ error: 'productos son requeridos' });
//     }
//     Orden.update(id, req.body, (err : Error | null, orden : any) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json(orden);
//     });

//   });
  
// });

router.delete('/:ordenId', deleteOrden);

export default router;