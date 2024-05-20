const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: [true, 'Please provide an url.'],
    },
    visitHistory: [
        {
            timeStamp: {
                type: Number,
            }
        }
    ]
},
{
    timeStamps: true
}
);

const Url = mongoose.model(Url, urlSchema);

module.exports = Url;