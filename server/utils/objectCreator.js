
class ObjectCreator {
	
    constructor() {

    }
    
    *convertToApplicationObject(request, org_id) {

        var request_obj = request.body; 

        var object  = {

            app_name : request_obj.app_name,
            app_community_id : org_id
        }

        return object;
    }
    
    *convertToActionObject(request, app_id) {

        var request_obj = request.body; 

        var object  = {

            aa_name : request_obj.aa_name,
            aa_weight : request_obj.aa_weight,
            aa_app_id : app_id
        }

        return object;
    }
    
    *convertToInteractionObject(request, app_id) {

        var request_obj = request.body; 

        var object  = {

            il_user_from_id : request_obj.il_user_from_id,
            il_user_to_id : request_obj.il_user_to_id,
            il_app_action_id : request_obj.il_app_action_id,
            il_app_id : app_id
        }

        return object;
    }
}


module.exports = ObjectCreator;