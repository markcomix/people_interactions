const co = require('co');

var debugMode = true;

class Common {

  static replyOk(res, value) {

    res.json({ "status": "OK", "message": "", result: value });
  }

  static replyError(res, error) {

    var response = { "status":"FAIL" };

    if (error instanceof Error) {

      response.message = error.message || 'No error information';

      if (debugMode)
        response.stack = error.stack;

    //   res.statusCode = error.status || 400;

    } else if (typeof error == 'string') {

    //   res.statusCode = 400;
      response.message = error;

    } else {

    //   res.statusCode = 400;
      response.message = 'No error information';
    }

    res.json(response);
  }

  static *sampleGenerator() {

  };

  static isGenerator(arg) {
      return arg.constructor === Common.sampleGenerator.constructor;
  }

  static isGeneratorIterator(arg) {
      return arg.constructor === Common.sampleGenerator.prototype.constructor;
  }

  static extendRouterMethod(router, method) {

    var prevFunction = router[method];

    if (!prevFunction)
        return;

    router[method] = function(path, handler) {

      var newHandler = handler;

      if (Common.isGenerator(handler)) {

        // New Handler
        newHandler = function(req, res, next) {

          var promise = co(handler(req, res, next));

          promise.then(value => { Common.replyOk(res, value); })
            .catch(error => { Common.replyError(res, error); });
        };

      }

      prevFunction.call(router, path, newHandler);

    };
  }

  static extendRouter(router) {

    Common.extendRouterMethod(router, 'get');
    Common.extendRouterMethod(router, 'put');
    Common.extendRouterMethod(router, 'post');
    Common.extendRouterMethod(router, 'delete');
  };

  static toPromise(fn) {

    return new Promise(function(resolve, reject) {

          fn(function(err, res) {

            if (err)
              reject(err);
            else
              resolve(res);
          });
      });
  };
}

module.exports = Common;
