const mongoose = require('mongoose')

const connectDB = async(config) => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/zoomcarAPI', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        if (config) {}
        console.log(`Mongo DB connected : ${conn.connection.host}`);

    } catch (err) {
        console.error(err)
        process.exit(1)

    }
}

module.exports = connectDB