import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s]+$/.test(v);
            },
            message: props => `${props.value} should not contain numbers`
        }
    },
    author: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s]+$/.test(v);
            },
            message: props => `${props.value} should not contain numbers`
        }
    },
    publishYear: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
}, {
    timestamps: true,
});

export const Book = mongoose.model('Book', bookSchema);