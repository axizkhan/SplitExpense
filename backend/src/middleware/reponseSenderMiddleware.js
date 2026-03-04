export class ResponseSenderMiddleware {
    responseMiddleware(req, res, next) {
        const { data, message, statusCode } = req.resData;
        res.status(Number(statusCode));
        res.json({
            message,
            data,
            success: true,
        });
    }
}
