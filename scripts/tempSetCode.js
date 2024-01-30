const sqlite3 = require("sqlite3").verbose();

const tempSetCode = (dirDB, code) => {
  const db = new sqlite3.Database(dirDB);
  try {
    const query = db.prepare("INSERT INTO code VALUES(NULL,?,?,?)");
    query.run("https://example.com", code, "Test");
    query.finalize();
    db.close();
  } catch (e) {
    console.log(e);
  }
};

module.exports = tempSetCode;
