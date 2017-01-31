
class ParamValidator {
	
    constructor() {

    }

    *validateApplication(request) {

        var request_obj = request.body;

        console.log("Start Validation Application"); 

        if (typeof request_obj.app_name == "undefined") {

            console.log("APPLICATION_NAME_IS_MISSING");

            throw Error("APPLICATION_NAME_IS_MISSING");
        }

        console.log("End Validation Application"); 
    }

    *validateAction(request) {

        var request_obj = request.body;

        console.log("Start Validation Action"); 

        if (typeof request_obj.aa_name == "undefined") {

            console.log("ACTION_NAME_IS_MISSING");

            throw Error("ACTION_NAME_IS_MISSING");
        }

        if (typeof request_obj.aa_weight == "undefined") {

            console.log("ACTION_WEIGHT_IS_MISSING");

            throw Error("ACTION_WEIGHT_IS_MISSING");
        }

        console.log("End Validation Action"); 
    }

    *validateInteraction(request) {

        var request_obj = request.body;

        console.log("Start Validation Interaction"); 

        if (typeof request_obj.il_user_from_id == "undefined") {

            console.log("INTERACTION_LOG_USER_FROM_IS_MISSING");

            throw Error("INTERACTION_LOG_USER_FROM_IS_MISSING");
        }

        if (typeof request_obj.il_user_to_id == "undefined") {

            console.log("INTERACTION_LOG_USER_TO_IS_MISSING");

            throw Error("INTERACTION_LOG_USER_TO_IS_MISSING");
        }

        console.log("End Validation Interaction"); 
    }
}


module.exports = ParamValidator;