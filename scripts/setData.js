const sqlite3 = require("sqlite3").verbose();

const setData = (dirDB, id, court_name, last_changed, courtName, now) => {
  const db = new sqlite3.Database(dirDB);
  try {
    if (courtName !== court_name) {
      const query = `UPDATE urls 
        SET court_name = ?, last_changed = ?
        WHERE id = ?`;
      db.run(query, [courtName, now, id], (err) => {
        if (err) {
          console.log(err);
        } else {
          db.close();
        }
      });
    } else {
      const query = `UPDATE urls 
        SET last_changed = ?
        WHERE id = ?`;
      db.run(query, [now, id], (err) => {
        if (err) {
          console.log(err);
        } else {
          db.close();
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = setData;
