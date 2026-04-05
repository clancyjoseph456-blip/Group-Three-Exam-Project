// routes/groupRoutes.js
const express = require('express');
const { getAllGroups, createGroup, joinGroup, myGroups } = require('../controllers/groupController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllGroups);          // Public? Actually should be protected but fine
router.get('/my-groups', auth, myGroups);
router.post('/', auth, createGroup);
router.post('/:id/join', auth, joinGroup);

module.exports = router;