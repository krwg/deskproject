# Сеты 01–60

Папки уже созданы. Клади файлы и запускай:

```powershell
npm.cmd run images
```

Для видео нужен **ffmpeg** в PATH (иначе в манифест может попасть тяжёлый `.MOV`). Предпочтительно: `winget install Gyan.FFmpeg`.

Сайт подхватит новый сет **сам** (галерея, timeline, hero = самый новый).

```
10/main.jpg
10/02.jpg
10/03.jpg
```

Даты берутся из имён файлов / EXIF.  
Своё название/дату — опционально в `src/data/sets.meta.ts`.  
Полная инструкция (EN): [`CONTENT.md`](../../../CONTENT.md)  
Проверка манифеста: `npm run check:manifest`
