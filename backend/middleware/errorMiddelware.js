const notFound = (req, res, next) => {
    const error = new Error(`Not Found =${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode || 500;
    let message = err.message

    res.status(statusCode).json({
        message : message 
    })
} 


export {notFound, errorHandler }