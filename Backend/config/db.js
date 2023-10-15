const mongoose = require('mongoose')



const String = 'mongodb+srv://allankiplagatkipkemei:vovIAd7ULeqgXYnG@cluster0.fk78scu.mongodb.net/'

async function ConnectToDatabase() {
    try {
        await mongoose.connect(String, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error when connecting to MongoDB:", error)
    }
}
module.exports = {
    ConnectToDatabase
};