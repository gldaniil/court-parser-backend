const sqlite3 = require("sqlite3").verbose();

const getCourts = async (dirDB, res) => {
  const db = new sqlite3.Database(dirDB);
  try {
    const query = `SELECT * FROM urls`;
    const data = await new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    db.close();
    res.send(data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = getCourts;
