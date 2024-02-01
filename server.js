const axios = require("axios");
const fs = require("fs");
const jsdom = require("jsdom"); // Подключение модуля jsdom для работы с DOM-деревом (1)
const { JSDOM } = jsdom; // Подключение модуля jsdom для работы с DOM-деревом (2)
const sqlite3 = require("sqlite3");
require("dotenv").config();
const iconv = require("iconv-lite");
const createDB = require("./scripts/createDB");
const setData = require("./scripts/setData");
const getUrls = require("./scripts/getUrls");
const tempSetCode = require("./scripts/tempSetCode");
const tempGetCode = require("./scripts/tempGetCode");

const dirDB = "./data/" + process.env.DB_NAME;

async function request(url) {
  let { data } = await axios.get(url, {
    responseType: "arraybuffer",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
    },
  });

  data = iconv.decode(Buffer.from(data), "win1251");
  return data;
}

(async () => {
  getUrls(dirDB, (urls) => {
    urls.forEach(async (url) => {
      // const code = await request(url);
      // tempSetCode(dirDB, url, code);
      tempGetCode(dirDB, url, (code) => {
        const arr = [];
        const keys = ["number", "date", "solution"];
        const dom = new JSDOM(code);
        const courtName = dom.window.document.querySelector("h5").textContent;
        console.log(courtName);
        const table = dom.window.document
          .querySelector("table#tablcont")
          .querySelector("tbody");
        // Проход по каждой строке таблицы
        for (const row of table.children) {
          // Только перечень дел
          if (row.vAlign) {
            // Выборка дел, начинающихся с `2-`
            if (row.children[0].textContent.includes("2-")) {
              const [numberCell, dateCell, categoryCell] = row.children;
              const splittedCategory = categoryCell.innerHTML.split("<br>");

              const conversion = (str) => str.replace(/[\n\t]/g, "").trim();

              const getPerson = (value) =>
                splittedCategory
                  .filter((str) => (str.includes(value) ? str : ""))
                  .join("");
              // Объект для дальнейшей загрузки в БД
              const obj = {
                number: numberCell.textContent,
                date: conversion(dateCell.textContent),
                plaintiff: conversion(getPerson("ИСТЕЦ")),
                defendant: conversion(getPerson("ОТВЕТЧИК")),
              };

              arr.push(obj);
            }
          }
        }
        console.log(arr);
      });
    });
  });
})();
