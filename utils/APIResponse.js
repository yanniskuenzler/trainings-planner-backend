class APIResponse {
    constructor(statusCode, description, data) {
        this.statusCode = statusCode;
        this.data = data;
    }

    getStatusCode() {
        return this.statusCode;
    }

    getData() {
        return this.data;
    }
}

module.exports = APIResponse;
