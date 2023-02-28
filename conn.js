const mongoose= require("mongoose")
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://anir:anir@cluster0.snio2pi.mongodb.net/contactmaneg?retryWrites=true&w=majority")
    // mongoose.set('strictQuery', true)

.then(()=>{
    console.log("connection with database succes")
}).catch((err)=>{
    console.log(err)
})