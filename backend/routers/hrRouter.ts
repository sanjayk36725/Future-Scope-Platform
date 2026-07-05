/**
 * Router for HR & Payroll Support
 * Features: Leave requests, Employee Profile, Policies, Payroll details
 */

import { Router } from 'express';

const router = Router();

router.get('/leave-requests', (req, res) => {
  res.json({ message: "Leave requests placeholder" });
});

export default router;
