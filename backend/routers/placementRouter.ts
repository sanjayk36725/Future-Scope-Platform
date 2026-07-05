/**
 * Router for Placement & Placement Preparation
 * Features: Resume Screening, Job Posts, Candidate Matching, Mock Interview
 */

import { Router } from 'express';

const router = Router();

router.get('/jobs', (req, res) => {
  res.json({ message: "Jobs placeholder" });
});

export default router;
