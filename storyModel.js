const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var storySchema = new Schema({

    title: {
        type: String,
        trim: true,
        required: "please give a title"
    },
    summary: {
        type:String,
        trim: true,
    },
    link: {
        type: String,
        unique: true,
        required: "This is allready saved"
    },
    notes: {
        type: Array
    }
})

var Story = mongoose.model("story", storySchema )

module.exports = Story;