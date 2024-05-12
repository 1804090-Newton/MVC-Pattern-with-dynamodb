const responseHandler = () => {
    return async (ctx, next) => {
      ctx.response.ok = (message, data = {}) => {
        ctx.status = 200;
        ctx.body = { message, data };
      };
  
      ctx.response.created = (message, data = {}) => {
        ctx.status = 201;
        ctx.body = { message, data };
      };
  
      ctx.response.badRequest = (message, data = {}) => {
        ctx.status = 400;
        ctx.body = { message, data };
      };
  
      ctx.response.unauthorized = (message, data = {}) => {
        ctx.status = 401;
        ctx.body = { message, data };
      };
  
      ctx.response.forbidden = (message, data = {}) => {
        ctx.status = 403;
        ctx.body = { message, data };
      };
  
      ctx.response.notFound = (message, data = {}) => {
        ctx.status = 404;
        ctx.body = { message, data };
      };
  
      ctx.response.internalError = (message, data = {}) => {
        ctx.status = 500;
        ctx.body = { message, data };
      };
  
      await next();
    };
};

module.exports = responseHandler;
