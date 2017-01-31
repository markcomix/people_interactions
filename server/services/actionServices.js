var db = require('../storage/Db').getInstance();
var BaseServices = require("../services/baseServices.js");

class ActionServices extends BaseServices{
	
    constructor() {

        super("application_actions", "", "aa_id");

        this.serviceName = "ActionServices";
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

    *createObject(request, app_id){

        yield this.getParamValidator().validateAction(request);
        
        //Creo el Objeto
        var object = yield this.getObjectCreator().convertToActionObject(request, app_id);

        console.log(object);

        return object;
    }

    *search(orgId, text) {

        return yield super.search(orgId, text, "aa_name", this.serviceName);
    }
}

module.exports = ActionServices;
