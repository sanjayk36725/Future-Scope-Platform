/**
 * Router for Central AI Routing Helper and Chat Interface
 */

import { Router } from 'express';

const router = Router();

router.post('/route', (req, res) => {
  res.json({ message: "AI routing helper placeholder" });
});

export default router;
