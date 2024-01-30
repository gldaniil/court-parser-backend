const sqlite3 = require("sqlite3");

const createDB = (filename) => {
  const db = new sqlite3.Database(filename, (err) => {
    if (err) {
      console.log("Не удалось создать базу данных - " + err);
      return;
    }
  });
  db.exec(`
    create table urls (
        id integer primary key autoincrement,
        url text not null,
        court_name text not null
    );
    create table code (
        id integer primary key autoincrement,
        url text not null,
        code text,
        title text
    );
  `);
};

module.exports = createDB;
