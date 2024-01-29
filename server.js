const axios = require("axios");
const fs = require("fs");
const jsdom = require("jsdom"); // Подключение модуля jsdom для работы с DOM-деревом (1)
const { JSDOM } = jsdom; // Подключение модуля jsdom для работы с DOM-деревом (2)
const sqlite3 = require("sqlite3");
const createDB = require("./scripts/createDB");

function parsing() {}

(async () => {
  const file = "main.sqlite";
  const dir = "./data/";
  const dirDB = dir + file;

  const result = await new Promise((resolve) => {
    fs.access(dirDB, fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });

  if (result) {
    console.log(`${file} файл существует`);
  } else {
    console.log(`${file} файл отсутствует`);
    console.log(createDB(dirDB));
  }
})();
