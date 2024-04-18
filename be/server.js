const express = require('express');
const cors = require('cors');
const readXlsxFile = require('read-excel-file/node');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

async function readExcelFile(filePath, page, limit) {
  try {
    let rows = await readXlsxFile(filePath, { sheet: 1 });
    if (page === 1) {
      rows = rows.slice(1);
    }
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedRows = rows.slice(start, end);
    return paginatedRows;
  } catch (error) {
    throw error;
  }
}

app.get('/api/flyers', async (req, res) => {
  const { page = 1, limit = 100 } = req.query;
  const filePath = 'flyers_data_2024.xlsx';

  try {
    const rows = await readExcelFile(filePath, parseInt(page), parseInt(limit));
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

app.listen(4000, () => console.log('Listening on port 4000'));
