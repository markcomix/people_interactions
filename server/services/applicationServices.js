var db = require('../storage/Db').getInstance();
var BaseServices = require("../services/baseServices.js");

class ApplicationServices extends BaseServices{
	
    constructor() {

        super("applications", "app_community_id", "app_id");

        this.serviceName = "ApplicationServices";
    }
		
    *getAll(orgId, request) {

        return yield super.getAll(orgId, request, this.serviceName);
    }
    
    *insert(orgId, request) {
        
        var object = yield this.createObject(request, orgId);

        return yield super.insertWithDuplicateValidation(orgId, object, this.serviceName, request.body.app_name, "app_name");
    }
	
    *update(orgId, id, request) {

        var object = yield this.createObject(request, orgId);

        return yield super.update(orgId, id, object, this.serviceName);
    }

    *delete(orgId, id) {

        return yield super.delete(orgId, id, this.serviceName);
    }

    *createObject(request, orgId){

        yield this.getParamValidator().validateApplication(request);
        
        //Creo el Objeto
        var object = yield this.getObjectCreator().convertToApplicationObject(request, orgId);

        console.log(object);

        return object;
    }
}

module.exports = ApplicationServices;
