const mongoose = require("mongoose");

async function getConnect() {
    try {
        await mongoose.connect("mongodb+srv://vishus0606:%40Asaini66@server-ducat.hu09o6k.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=server-DUCAT", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is Connected");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

getConnect();



// mongoose.connect("mongodb://localhost:27017/may_24_1pm_server")
// .then(()=>{
//     console.log("Database is Connected")
// })
// .catch((error)=>{
//     console.log(error)
// })