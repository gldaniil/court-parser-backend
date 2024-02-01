const sqlite3 = require("sqlite3").verbose();

const tempGetCode = (dirDB, url) => {
  const db = new sqlite3.Database(dirDB);
  try {
    const query = "SELECT code FROM code WHERE url = ?";
    db.get(query, [url], (err, row) => {
      if (err) return console.error(err.message);
      console.log(row);
    });
  } catch (e) {
    console.log(e);
  }
  db.close();
};

module.exports = tempGetCode;
