const sqlite3 = require("sqlite3").verbose();

const setData = (dirDB) => {
  const db = new sqlite3.Database(dirDB);
  try {
    const query = db.prepare("INSERT INTO urls VALUES(NULL,?,?)");
    query.run("https://example.com", "Example");
    query.finalize();
    db.close();
  } catch (e) {
    console.log(e);
  }
};

module.exports = setData;
