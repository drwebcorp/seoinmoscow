# SEO продвижение сайтов — статический SEO-сайт

Контентная страница (полное руководство по SEO-продвижению в Москве) с тёмным деловым дизайном. Размещается на **GitHub**, автоматически деплоится на **Cloudflare Pages** при пуше в `main`.

**Особенности текущей версии:**
- на странице **нет** телефонов, `tel:`-ссылок и физического адреса — связь через e-mail;
- формы отправки заявок **отключены** (модалка и основная форма убраны), поэтому Pages Functions в проекте нет;
- контакт — кликабельный e-mail в шапке и CTA-блоке.

---

## ⚠️ Важно перед деплоем

1. **Домен и контакты.** Замените в `index.html`:
   - `info@your-domain.example.ru` → ваш реальный e-mail (шапка, CTA-блок, футер);
   - `https://your-domain.pages.dev/` → ваш боевой URL (Open Graph, canonical).
2. **Картинки.** `images/og-image.png` (1200×630) и `favicon.ico` — плейсхолдеры, замените перед публикацией.

---

## 🚀 Локальный запуск

Проект — чистая статика без шага сборки.

```bash
# открыть напрямую
open index.html

# или через локальный сервер
python3 -m http.server 8000
```

---

## 🐙 Деплой: GitHub → Cloudflare Pages

### 1. Инициализация и пуш в GitHub

```bash
git init
git add .
git commit -m "Initial commit: SEO article"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

### 2. Подключение к Cloudflare Pages (Git-интеграция)

1. Дашборд Cloudflare → **Workers & Pages** → **Create application** → вкладка **Pages** → **Connect to Git**.
2. Авторизуйте Cloudflare в GitHub и выберите нужный репозиторий.
3. Настройки сборки:
   - **Framework preset:** `None`;
   - **Build command:** оставьте пустым (или `exit 0`);
   - **Build output directory:** `/` (корень репозитория).
4. **Save and Deploy.**

**Автодеплой:** каждый `git push` в `main` → новый production-деплой. Пуши в другие ветки → preview-URL.

### 3. Аналитика

Включите **Cloudflare Web Analytics** в дашборде проекта. Сторонние счётчики (LiveInternet и т. п.) на странице не подключаются.

### 4. Кастомный домен

**Settings → Custom domains → Set up a custom domain.** Если домен уже на Cloudflare — DNS настраивается автоматически.

---

## ⚠️ Drag & Drop — не использовать

Загрузка через **Drag & Drop** не всегда корректно отрабатывает Git-интеграцию и версии. Деплой через **Git-подключение** (описано выше) — это рекомендуемый путь для постоянного сайта, который планируется обновлять.

---

## 🧱 Структура репозитория

```
/
├── index.html                  # главная — SEO-статья (CSS и JS встроены)
├── policy.html                 # политика конфиденциальности (noindex)
├── consent.html                # согласие на обработку ПД (noindex)
├── _headers                    # security-заголовки для Cloudflare Pages
├── _redirects                  # правила редиректов (опционально)
├── images/
│   └── og-image.png            # Open Graph 1200x630
├── favicon.ico
├── README.md                   # эта инструкция
└── .gitignore
```

---

## ✅ Чек-лист перед публикацией

- [ ] Один `<h1>`, иерархия H2/H3 соблюдена
- [ ] Нет адреса, телефонов и `tel:`-ссылок
- [ ] Ссылки на «Политику» и «Согласие» ведут на реальные `policy.html` / `consent.html`
- [ ] Заменены плейсхолдеры домена, e-mail и картинок
- [ ] Canonical и OG-image ведут на боевой домен
- [ ] Аналитика — Cloudflare Web Analytics, сторонних трекеров нет