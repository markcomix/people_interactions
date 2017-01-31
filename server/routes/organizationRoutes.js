var router = require('express').Router();
var Common = require("./Common.js");

Common.extendRouter(router);

//-----------------------------------------------------------------------------------------------------
//ACTIONS//////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------
var ActionServices = require("../services/actionServices.js");

var actionServices = new ActionServices();

//Consulta
router.get('/:org_id/application/:app_id/actions', function*(request, response) {

    return yield actionServices.getAll(request.params.org_id, request.params.app_id, request);
});

//Alta
router.post('/:org_id/application/:app_id/action', function*(request, response) {

    return yield actionServices.insert(request.params.org_id, request.params.app_id, request);
});

//Modificacion
router.post('/:org_id/application/:app_id/action/:aa_id', function*(request, response) {

    return yield actionServices.update(request.params.org_id, request.params.app_id, request.params.aa_id, request);
});

//Baja
router.delete('/:org_id/application/:app_id/action/:aa_id', function*(request, response) {

    return yield actionServices.delete(request.params.org_id, request.params.app_id, request.params.aa_id);
});

//-----------------------------------------------------------------------------------------------------
//APPLICATION///////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------
var ApplicationServices = require("../services/applicationServices.js");

var applicationServices = new ApplicationServices();

//Consulta
router.get('/:org_id/applications', function*(request, response) {

    return yield applicationServices.getAll(request.params.org_id, request);
});

//Alta
router.post('/:org_id/application', function*(request, response) {

    return yield applicationServices.insert(request.params.org_id, request);
});

//Modificacion
router.post('/:org_id/application/:app_id', function*(request, response) {

    return yield applicationServices.update(request.params.org_id, request.params.app_id, request);
});

//Baja
router.delete('/:org_id/application/:app_id', function*(request, response) {

    return yield applicationServices.delete(request.params.org_id, request.params.app_id);
});

//-----------------------------------------------------------------------------------------------------
//INTERACTION LOGS/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------
var InteractionServices = require("../services/interactionServices.js");

var interactionServices = new InteractionServices();

//Consulta
router.get('/:org_id/application/:app_id/interactions', function*(request, response) {

    return yield interactionServices.getAll(request.params.org_id, request.params.app_id, request);
});

//Alta
router.post('/:org_id/application/:app_id/interaction', function*(request, response) {

    return yield interactionServices.insert(request.params.org_id, request.params.app_id, request);
});

//Modificacion
router.post('/:org_id/application/:app_id/interaction/:il_id', function*(request, response) {

    return yield interactionServices.update(request.params.org_id, request.params.app_id, request.params.il_id, request);
});

//Baja
router.delete('/:org_id/application/:app_id/interaction/:il_id', function*(request, response) {

    return yield interactionServices.delete(request.params.org_id, request.params.app_id, request.params.il_id);
});

module.exports = router;
