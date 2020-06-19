const express = require("express");
const router = express.Router();
const barbecue_controller = require("../controllers/barbecue.controllers");

router.get('/barbecues', barbecue_controller.getAll);
router.get('/:id', barbecue_controller.details);
router.post('/create', barbecue_controller.create);
router.put('/:id', barbecue_controller.update);
router.delete('/:id', barbecue_controller.delete);
router.post('/:id/barbecue', barbecue_controller.addUserToBarbecue);
router.put('/:id/barbecue', barbecue_controller.updateUserToBarbecue);
router.post('/:id/barbecue/delete', barbecue_controller.removeUserToBarbecue);

module.exports = router;