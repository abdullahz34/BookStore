import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Hello World!');

});


// Route for Save a new book
app.post('/books', async(request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear) {
            return response.status(400).send({
                message: 'Required field missing: title, author, publishYear'
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
});


// Route for Get all books
app.get('/books', async(request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route for Get one book
app.get('/books/:id', async(request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route for Update a book
app.put('/books/:id', async(request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear) {
            return response.status(400).send({
                message: 'Required field missing: title, author, publishYear'
            });
        }
        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({
                message: 'Book not found'
            });
        }
        return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});



// Route for Delete a book
app.delete('/books/:id', async(request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({
                message: 'Book not found'
            });
        }
        return response.status(200).send({ message: 'Book deleted successfully' });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });