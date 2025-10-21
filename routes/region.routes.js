import express from 'express';
import {
  createRegion, getRegions, getRegionById, updateRegion, deleteRegion
} from '../controllers/region.controller.js';

const router = express.Router();

router.post('/', createRegion);
router.get('/', getRegions);
router.get('/:id', getRegionById);
router.put('/:id', updateRegion);
router.delete('/:id', deleteRegion);

export default router;
