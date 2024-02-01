const sqlite3 = require("sqlite3").verbose();

const tempSetCode = (dirDB, url, code) => {
  const db = new sqlite3.Database(dirDB);
  try {
    const query = db.prepare("INSERT INTO code VALUES(NULL,?,?,?)");
    query.run(url, code, "Test");
    query.finalize();
  } catch (e) {
    console.log(e);
  }
  db.close();
};

module.exports = tempSetCode;
