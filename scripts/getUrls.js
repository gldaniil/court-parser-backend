const sqlite3 = require("sqlite3").verbose();

const getUrls = (dirDB, callback) => {
  const db = new sqlite3.Database(dirDB);
  try {
    const query = `SELECT * FROM urls ORDER BY id`;
    db.all(query, [], (err, rows) => {
      if (err) {
        throw err;
      }
      callback(rows);
    });
    db.close();
  } catch (e) {
    console.log(e);
  }
};

module.exports = getUrls;
