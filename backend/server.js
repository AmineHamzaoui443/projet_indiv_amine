const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const articlesRouter = require('./routes/articles');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/articles', articlesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
