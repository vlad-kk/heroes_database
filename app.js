const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));
app.use(express.static(__dirname + '/uploads'));
app.use('/api', require('./routes/create.routes'));


const PORT = config.get('port') || 5000;

async function start(){
    try{
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}!`));
    }catch (e){
        console.log("Server ERROR", e.message);
        process.exit(1);
    }
}

start();

// "mongoUriCloud": "mongodb+srv://vlad-kk:test1234@cluster0-wmrmy.azure.mongodb.net/app?retryWrites=true&w=majority"