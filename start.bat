@echo off
chcp 65001
title Судебный парсер

set separator=————————————————————

echo %separator%
@echo.

if exist "node_modules" (
  echo - Зависимости установлены
) else (
  echo - Устанавливаю зависимости
  @echo.
  call npm install
)

@echo.
echo %separator%
@echo.

if exist "./data/main.sqlite" (
  echo - База данных найдена
) else (
  if exist "main.sqlite" (
    copy "main.sqlite" "./data/"
    del "main.sqlite"
    @echo.
    echo - База данных установлена 
  ) else (
    color 47
    echo - База данных отсутствует, обратитесь к разработчику!
    @echo.
    echo %separator%
    pause
    exit
  )
)

@echo.
echo %separator%
@echo.

echo Инициализация приложения...
node server.js
pause