import mongoose from 'mongoose';

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3qgnh.mongodb.net/connect-4`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => {
        console.log('Connected on MongoDB server');
    })
    .catch((err) => {
        console.log('Connexion failed to MongoDB : ' + err);
    });
