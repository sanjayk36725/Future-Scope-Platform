/**
 * Router for User Profiles and Roles (RBAC)
 */

import { Router } from 'express';

const router = Router();

router.get('/profile', (req, res) => {
  res.json({ message: "Profile route placeholder" });
});

export default router;
