# Deployment Guide - Vercel

## ✅ Чек-лист перед деплоем

- [x] Git репозиторий инициализирован
- [x] vercel.json настроен
- [x] .vercelignore создан
- [x] Локальная сборка работает (`npm run build`)
- [x] Service Worker файл создан (`src/public/sw.js`)
- [x] Manifest файл создан (`src/public/manifest.json`)
- [x] Иконка приложения добавлена (`src/public/logo.jpg`)

## 🚀 Шаги развертывания

### 1. Подготовка репозитория

```bash
git status          # Убедитесь что все коммитено
git log --oneline   # Проверьте историю коммитов
```

### 2. Подключение к Vercel

**Вариант A: CLI**
```bash
npm install -g vercel
vercel login
vercel
```

**Вариант B: GitHub интеграция**
1. Перейдите на https://vercel.com/new
2. Подключите свой GitHub репозиторий
3. Vercel автоматически обнаружит конфиг
4. Нажмите Deploy

### 3. Настройка окружения (если нужно)

В Vercel Dashboard:
- Settings → Environment Variables
- Добавьте переменные если требуются

### 4. Проверка сборки

В Vercel Dashboard:
- Deployments → Последний деплой
- Проверьте Build Logs на ошибки

### 5. Проверка работы

1. Откройте URL вашего приложения
2. Проверьте все маршруты:
   - `/` — главная
   - `/id-card` — ID карточка
   - `/profile` — профиль
3. Откройте DevTools (F12) → Application
4. Проверьте Service Worker в разделе Service Workers
5. Проверьте Manifest в Application

## 🔍 Проверка работы PWA

```javascript
// В консоли браузера:

// Проверить Service Worker
navigator.serviceWorker.getRegistrations()
  .then(registrations => console.log(registrations))

// Проверить Manifest
fetch('/manifest.json')
  .then(r => r.json())
  .then(m => console.log(m))
```

## 🛠️ Решение проблем

### 404 Not Found

**Причина:** Маршруты SPA не работают.
**Решение:** Проверьте `vercel.json` содержит `rewrites` секцию.

### Service Worker не загружается

**Причина:** Неправильная конфигурация headers.
**Решение:** Убедитесь что `vercel.json` имеет headers для `/sw.js`.

### Изображения не отображаются

**Причина:** Неправильные пути к файлам.
**Решение:** Используйте абсолютные пути: `/logo.jpg` вместо `./logo.jpg`.

### Кеш-проблемы

**Решение:** Очистите кеш в Vercel Dashboard:
- Settings → Caching
- Clear cache

## 📊 Мониторинг

После деплоя проверяйте:
- **Analytics** — трафик и производительность
- **Logs** → Function Logs — ошибки
- **Deployments** — история деплоев

## 🔄 Обновление приложения

Просто запустите `git push`:

```bash
git add .
git commit -m "Описание изменений"
git push origin main
```

Vercel автоматически перестроит и развернет приложение.

## 📞 Контакты поддержки

- Vercel Docs: https://vercel.com/docs
- GitHub Issues: https://github.com/beksVSCODE/test/issues

---

**Дата подготовки:** 30 апреля 2026
**Статус:** ✅ Готово к деплою
