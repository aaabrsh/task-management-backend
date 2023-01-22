const database = "task-mgt";
const port = "27017";
const host = "127.0.0.1";
const uri = `mongodb://${host}:${port}/${database}`;

module.exports.local_uri = uri;