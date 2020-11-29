module.exports = {
    dbConfig: {
        dialect: process.env.DIALECT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE_NAME
    },
    swageerOptions: {
        swaggerOptions: {
            defaultModelsExpandDepth: 0,
        },
    },
    secretKeys: {
        jwt: process.env.SECRET_KEY
    }
}

//ENV CODE

// # SERVER PORT
// SERVER_PORT = 3000


// # DATABASE CONFIG
// DATABASE_NAME=SocialDB
// DIALECT=mysql
// DB_USERNAME=cyber
// DB_PASSWORD=cyber

// # JWT SECRET KEY
// SECRET_KEY=jbhbJHBJHjhbjh87yh2i3bhbYGYUGH8YWGBUyguyg8eybwiyeg8h78Y387Y283UINJKn9h8832iuh3iuhibiG87I
