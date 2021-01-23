const mongoose = require('mongoose');
const mongodb = require('mongodb');


mongoose.connect('mongodb://localhost:27017/relationship',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    
});

const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("database connected");
})

const userSchema = new mongoose.Schema({
    
    first: String,
    last: String,
    address: [
        {
            _id: {id: false},
            state: String,
            country: String
        }
    ]
})

const user = mongoose.model('user',userSchema);

const makeuser = async()=>{
    const u = new user({
        first: ' Sherlock',
        last: 'Holmes',
    })
    u.address.push({
        state: 'Baker street',
        country: 'England'
    })
    const res = await u.save()
    console.log(res);
}

const addAddress = async(id)=>{
    const us = await user.findById(id);
    us.addAddress.push({
        state: 'Manchester',
        country: 'England'
    })
    const res = await us.save()
    console.log(res)
}
//addAddress("600c08a77df0ec6404b3187d");
makeuser();
