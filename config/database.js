if(process.env.NODE_ENV == 'production') {
    module.exports = {
        database: 'mongodb://root:password@ds245548.mlab.com:45548/meanauth',
    };
}else {
    module.exports = {
        database: 'mongodb://localhost:27017/meanauth',
        secret: 'yoursecret'
    };
}


