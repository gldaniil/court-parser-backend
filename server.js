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
      const result = await request(url);
      tempSetCode(dirDB, result);
    });
  });
})();
