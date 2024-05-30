const mongoose = require("mongoose")
async function getConnect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/may_24_1pm_server")
        console.log("Database is Connected")
    } catch (error) {
        console.log(error)
    }
}
getConnect()


// mongoose.connect("mongodb://localhost:27017/may_24_1pm_server")
// .then(()=>{
//     console.log("Database is Connected")
// })
// .catch((error)=>{
//     console.log(error)
// })