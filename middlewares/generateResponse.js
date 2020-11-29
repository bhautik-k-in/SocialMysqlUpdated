exports.sendJson = function sendJson(statusCode = 200, response) {
    var Status = (statusCode >= 200 && statusCode < 300) ? true : false;
    if (!(typeof response == "object" && response.message && response.data)) {
        response = (typeof response == "string") ? { Status, message: response } : { Status, data: response };
    }
    return this.status(statusCode).json(response)
}