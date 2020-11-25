const app = require('./index')
const PORT = process.env.PORT || 1337;

app.listen(PORT, console.log(`Server started on port ${PORT}`));