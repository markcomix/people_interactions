var db = require('../storage/Db').getInstance();

var ParamValidator = require("../utils/paramValidator.js");
var ObjectCreator = require("../utils/objectCreator.js");

class BaseServices {
	
    constructor(_tableName, _orgidColName, _idColName) {

        this.paramValidator = new ParamValidator();

        this.getParamValidator = function() { return this.paramValidator; }

        this.objectCreator = new ObjectCreator();

        this.getObjectCreator = function() { return this.objectCreator; }

        this.tableName = _tableName;
        this.orgidColName = _orgidColName;
        this.idColName = _idColName;
    }
    
    *getAll(orgId, request, servicesName) {

        writeLog(orgId, -1, servicesName, "GetAll");

        var query = "select * from " + this.tableName;
        
        //Si tengo Columna OrgId, la agrego a la query
        if ((this.orgidColName != undefined) && (this.orgidColName != "")){

            query = query + " where " + this.orgidColName + " = '" + orgId + "'";
        }

        console.log(query);

        return yield db.executeQueryShort(query);
    }
        
    *insert(orgId, object, servicesName) {

        yield this.insertWithDuplicateValidation(orgId, object, servicesName, "Insert", "", "");
    }

    *insertWithDuplicateValidation(orgId, object, servicesName, value, colName) {

        writeLog(orgId, -1, servicesName, "Insert");

        //Solo valido si me llegan el nombre de la columna y el valor
        if ((value != "") && (colName != "")){

            var count = yield this.countByName(orgId, value, colName);

            if (count != 0){

                console.log("Name encontrado en " + this.tableName);

                throw Error("NAME_DUPLICATED");
            }
        }

        //Si la validación salio bien, hago el insert
        console.log("Begin Insert - " + this.tableName); 

        var query = "insert into " + this.tableName + " set ?";
        
        console.log(query);
        console.log(object);

        //Ejecuto la Query
        var queryResult = yield db.executeInsertOrUpdateQuery(query, object);

        console.log("End Insert - " + this.tableName); 

        return queryResult;
    }
	
    *update(orgId, id, object, servicesName) {

        writeLog(orgId, id, servicesName, "Update");

        var count = yield this.countById(orgId, id);

        if (count != 0){

            //Si la validación salio bien, hago el update
            console.log("Begin Update - " + this.tableName); 

            var query = "update " + this.tableName + " set ? where " + this.idColName + " = " + id;

            console.log(query);
            console.log(object);

            //Ejecuto la Query
            var queryResult = yield db.executeInsertOrUpdateQuery(query, object);

            console.log("End Update - " + this.tableName); 

        }else{

           throw Error("INVALID_ID");
        }
    }

    *delete(orgId, id, servicesName) {

        writeLog(orgId, id, servicesName, "Delete");

        var count = yield this.countById(orgId, id);

        if (count != 0){

            var query = "delete from " + this.tableName + " where " + this.idColName + " = " + id;

            console.log(query);
    
            return yield db.executeQueryShort(query);

        }else{

           throw Error("INVALID_ID");
        }
    }

    *countById(orgId, id){

        var query = "select count(0) as cant from " + this.tableName + 
            " where " + this.idColName + " = " + id;            

        //Si tengo Columna OrgId, la agrego a la query
        if ((this.orgidColName != undefined) && (this.orgidColName != "")){

            query = query + " and " + this.orgidColName + " = " + orgId + "";  
        }

        return yield this.count(query);
    }

    *countByName(orgId, name, nameCol){

        var query = "select count(0) as cant from " + this.tableName + 
            " where " + nameCol + " = '" + name + "'";        

        //Si tengo Columna OrgId, la agrego a la query
        if ((this.orgidColName != undefined) && (this.orgidColName != "")){

            query = query + " and " + this.orgidColName + " = " + orgId + "";  
        }

        return yield this.count(query);
    }

    *count(query){

        console.log(query);

        var queryResult = yield db.executeQueryShort(query);

        console.log("Cantidad de Registros: ");

         if (queryResult[0] != undefined){

            console.log(queryResult[0].cant)
         }

         return queryResult[0].cant;
    }
    
    *getAllById(orgId, id, idColName, servicesName) {

        writeLog(orgId, -1, servicesName, "GetAllById");

        var query = "select * from " + this.tableName;

        var where = "";

        //Si tengo Columna OrgId, la agrego a la query
        if ((this.orgidColName != undefined) && (this.orgidColName != "")){

            where = where + " and " + this.orgidColName + " = '" + orgId + "'";
        }
        
        //Si tengo una Columna, la agrego a la query
        if ((this.idColName != undefined) && (this.idColName != "")){

            where = where + " and " + idColName + " = '" + id + "'";
        }

        //Si hay un Where para agregar, saco el 1er AND y pongo un WHERE
        if (where != ""){

            where = " where " + where.substring(5);
        }

        //Agrego el Where a la Query
        query = query + where;

        console.log(query);

        return yield db.executeQueryShort(query);
    }

    *search(orgId, text, searchColumn, servicesName) {

        writeLog(orgId, -1, servicesName, "Search");

        var query = "select * from " + this.tableName;
 
        var where = "";

        //Si tengo Columna OrgId, la agrego a la query
        if ((this.orgidColName != undefined) && (this.orgidColName != "")){

            where = where + " and " + this.orgidColName + " = '" + orgId + "'";
        }
        
        //Si tengo Columna a Buscar, la agrego a la query
        if ((searchColumn != undefined) && (searchColumn != "")){

            where = where + " and (upper(" + searchColumn + ") like upper('%" + text + "%'))";
        } 

        //Si hay un Where para agregar, saco el 1er AND y pongo un WHERE
        if (where != ""){

            where = " where " + where.substring(5);
        }

        //Agrego el Where a la Query
        query = query + where;

        console.log(query);

        return yield db.executeQueryShort(query);
    }
}

var writeLog = function(orgId, id, servicesName, methodName){

    var log = servicesName + "::" + methodName + " (orgId:" + orgId;  

    if (id != -1)
        log = log + " id:" + id  + ")";
    else
        log = log + ")";

    console.log(log);

}

module.exports = BaseServices;
