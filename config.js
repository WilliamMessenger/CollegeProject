module.exports = {
  db: {
    url: process.env.DB_URL,
    options: {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    }
  }
}