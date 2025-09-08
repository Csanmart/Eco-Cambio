const { default: mongoose } = require('mongoose');

const url = 'mongodb://localhost:27017/products-service';

async function connectDb(){
    try {
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.log('Error conectandose a la base de datos...', error);
    }
};

connectDb()

module.exports = connectDb;