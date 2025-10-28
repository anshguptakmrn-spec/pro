import express from 'express';
import {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemStats
} from '../controllers/problemController.js';
import {
  protect,
  authorize
} from '../middleware/auth.js';
const router = express.Router();
router.route('/')
  .get(getProblems)
  .post(protect, authorize('admin'), createProblem);
router.route('/:id')
  .get(getProblem)
  .put(protect, authorize('admin'), updateProblem)
  .delete(protect, authorize('admin'), deleteProblem);
router.get('/:id/stats', getProblemStats);
export default router;