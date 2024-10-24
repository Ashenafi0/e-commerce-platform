const notFound = (req, res, next) => { //  used to catch requests to routes that do not exist
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err , req , res , next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; //ensures that errors do not inadvertently have a 200 status.
    let message = err.message;

    if(err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
}

export { notFound , errorHandler };
