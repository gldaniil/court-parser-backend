const sqlite3 = require("sqlite3").verbose();

const checkData = (db, { number, date }, callback) => {
  const query = "SELECT * FROM court_data WHERE number = ? AND date = ?";
  db.get(query, [number, date], (err, row) => {
    if (err) return console.error(err.message);
    // Если запись отсутствует в БД
    if (!row) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

const setCourtData = (dirDB, solution, courtName, now) => {
  const db = new sqlite3.Database(dirDB);
  try {
    checkData(db, solution, (result) => {
      if (result) {
        console.log(solution);
        const query = db.prepare(
          "INSERT INTO court_data VALUES(NULL,?,?,?,?,?,?)"
        );
        query.run(
          solution.number,
          solution.date,
          solution.plaintiff,
          solution.defendant,
          courtName,
          now
        );
        query.finalize();
      }
    });
    db.close();
  } catch (e) {
    console.log(e);
  }
};

module.exports = setCourtData;
