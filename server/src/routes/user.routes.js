const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.controllers");

router.get('/:id', user_controller.details);
router.post('/create', user_controller.create);
router.put('/:id', user_controller.update);
router.delete('/:id', user_controller.delete);
router.post('/login', user_controller.login);

module.exports = router;