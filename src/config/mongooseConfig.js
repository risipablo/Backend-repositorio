import { connect } from 'mongoose'


const connectMongoDB = () => {
    // connect to localhost
    // connect('mongodb://127.0.0.1:27017/ecommerce')
    connect("mongodb+srv://pablorisi22:pbwRHaKLohJFzQsR@borrador.fgz4d3c.mongodb.net/")
    console.log('Base de datos conectada')
}


export default connectMongoDB
