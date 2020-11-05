const mongoose = require('mongoose')

const connectDB = async(config) => {
    try {
        const conn = await mongoose.connect("mongodb+srv://zoomcarapi:mycarapi123098@cluster0.valgj.mongodb.net/<dbname>?retrywrites=true&w=majority", {
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