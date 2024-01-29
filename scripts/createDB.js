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
    hero_id int primary key not null,
    hero_name text not null,
    is_xman text not null,
    was_snapped text not null
  )`);
};

module.exports = createDB;
