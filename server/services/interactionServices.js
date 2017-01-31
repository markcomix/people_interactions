var db = require('../storage/Db').getInstance();
var BaseServices = require("../services/baseServices.js");

class InteractionServices extends BaseServices{
	
    constructor() {

        super("interaction_logs", "", "il_id");

        this.serviceName = "InteractionServices";
    }
		
    *getAll(orgId, request) {

        return yield super.getAll(orgId, request, this.serviceName);
    }
    
    *insert(orgId, app_id, request) {
        
        var object = yield this.createObject(request, app_id);

        return yield super.insert(orgId, object, this.serviceName);    
    }
	
    *update(orgId, app_id, id, request) {

        var object = yield this.createObject(request, app_id);

        return yield super.update(orgId, id, object, this.serviceName);
    }

    *delete(orgId, app_id, id) {

        return yield super.delete(orgId, id, this.serviceName);
    }

    *createObject(request, orgId){

        yield this.getParamValidator().validateInteraction(request);
        
        //Creo el Objeto
        var object = yield this.getObjectCreator().convertToInteractionObject(request, orgId);

        console.log(object);

        return object;
    }
}

module.exports = InteractionServices;
