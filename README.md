# AutoRent API — документация REST API (индивидуальный проект)

Учебный статический сайт для лабораторных работ по дисциплине
«ИС и технологии обработки цифрового контента» (CDN, Cloudflare).

**Студент:** Bezeme Bezeme Kris Levi, КубГУ, 2026
**Тема (вариант 2):** Документация REST API вымышленного сервиса аренды автомобилей

## Ссылки

- Сайт через Cloudflare: https://clevi.dpdns.org/
- Сайт на GitHub Pages (Origin): https://chrislevi05.github.io/

## Выполненные этапы (часть 1)

| Этап | Содержание | Где посмотреть |
|---|---|---|
| Лабораторная 0 | Публикация сайта на GitHub Pages | этот репозиторий |
| Лабораторная 1 | Многостраничный сайт с подкаталогами и относительными путями | `about/`, `blog/`, `images/` |
| Индивидуальный проект | Документация API: 15 страниц, разные типы контента | весь сайт |

## Структура проекта

```
index.html                  обзор API
getting-started/            быстрый старт, аутентификация, первый запрос
api/                        справочник: автомобили, бронирования, клиенты, платежи, вебхуки
guides/                     руководства, коды ошибок, пагинация
changelog.html, faq.html    история изменений и частые вопросы
assets/css/docs.css         стили сайта
assets/js/search.js         клиентский поиск
assets/js/copy-code.js      копирование примеров кода
assets/images/              SVG-схемы (архитектура, жизненный цикл бронирования)
data/openapi.json           спецификация OpenAPI
data/search-index.json      индекс для поиска
data/vehicles-sample.json   пример ответа API
about/, blog/, images/      страницы лабораторной работы 1
CNAME                       пользовательский домен clevi.dpdns.org
```

## Типы контента и что они позволяют проверить в CDN

| Тип | Файлы | Что тестировать |
|---|---|---|
| HTML | 15 однотипных страниц | Cache Hit Ratio, кэширование HTML |
| CSS / JS | `assets/css`, `assets/js` | долгий TTL, статика из кэша |
| SVG | `assets/images/*.svg` | сжатие текстовых изображений (Brotli, gzip) |
| JSON | `data/*.json` | динамически загружаемые ресурсы (поиск) |
| JPG | `images/test.jpg` | кэширование бинарных файлов |

## Подключение к Cloudflare

1. Бесплатный домен `clevi.dpdns.org` зарегистрирован в DigitalPlat FreeDomain.
2. Домен добавлен в Cloudflare (тариф Free), NS-записи у регистратора заменены
   на `gigi.ns.cloudflare.com` и `miles.ns.cloudflare.com`. Статус домена — Active.
3. В Cloudflare созданы 4 A-записи на серверы GitHub Pages
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)
   и CNAME-запись `www` → `chrislevi05.github.io`. Проксирование включено (оранжевое облако).
4. В GitHub Pages указан пользовательский домен, включён Enforce HTTPS.
5. Режим SSL/TLS в Cloudflare — Full (шифрование и между браузером и Cloudflare,
   и между Cloudflare и Origin).

## Проверка работы CDN

В инструментах разработчика (вкладка «Сеть») для файла `assets/css/docs.css`:

| Заголовок | Значение | Вывод |
|---|---|---|
| Адрес сервера | `104.21.41.125` | запрос идёт на IP Cloudflare, а не GitHub |
| `server` | `cloudflare` | ответ отдаёт Cloudflare |
| `cf-ray` | `…-SYD` | идентификатор запроса и дата-центр Cloudflare |
| `cf-cache-status` | `MISS`, затем `HIT` | первый запрос — к Origin, повторный — из кэша Cloudflare |
| `age` | время в секундах | сколько файл хранится в кэше |
| `cache-control` | `max-age=14400` | TTL — 4 часа |
