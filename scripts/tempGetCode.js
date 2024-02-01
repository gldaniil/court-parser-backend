const sqlite3 = require("sqlite3").verbose();

const tempGetCode = (dirDB, url, callback) => {
  const db = new sqlite3.Database(dirDB);
  try {
    const query = "SELECT code FROM code WHERE url = ?";
    db.get(query, [url], (err, row) => {
      if (err) return console.error(err.message);
      callback(row.code);
    });
  } catch (e) {
    console.log(e);
  }
  db.close();
};

module.exports = tempGetCode;
