const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    orignalUrl:{
        type:String,
        required:true
    },
    shortCode:{
        type:String,
        required:true,
        unique:true
    },
    qrCode:{
        type:String,
        default:null
    },
    count:{
        type:Number,
        default:0
    },
    qrScans:{
        type:Number,
        default:0
    },
    qrDownloads:{
        type:Number,
        default:0
    },
    qrCopies:{
        type:Number,
        default:0
    },
    qrScanHistory:[{
        timestamp:{
            type:Date,
            default:Date.now
        },
        action:{
            type:String,
            enum:['view','download','copy','scan'],
            required:true
        },
        ipAddress:String,
        userAgent:String
    }]
},{
    timestamps:true
})

const Url = mongoose.model("Url",urlSchema);

module.exports = Url;