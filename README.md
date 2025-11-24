# DC Maestro

DC Maestro — локально запускаемое SPA-приложение-кокпит для сети ЦОД. Прототип v0.2 показывает ключевые KPI, состояние площадок, персонал, обслуживание, склад, финансы и безопасность на мок-данных прямо во фронтенде.

## Возможности v0.2
- Краткий отчёт дня с подсчётами критичных инцидентов, просроченных заявок, дефицита склада и безопасности.
- Единая панель предупреждений с переходами на соответствующие модули.
- Детальная страница площадки с вкладками «Обзор», «Инциденты», «ТО и активы», «Финансы».
- Сортировка и поиск в таблицах (площадки, персонал, ТО, запасы, финансы) через общий хук.
- Подсказки по KPI и OSI в хедере и карточках.

## Стек
- Vite + React + TypeScript
- Tailwind CSS для тёмной темы и базовых UI-компонентов
- Recharts для графиков
- Vitest для unit-тестов KPI

## Структура
- `src/app/App.tsx` — каркас приложения с сайдбаром, хедером и роутингом
- `src/modules/*` — экраны Dashboard, Sites (+ SitesDetailPage), Personnel, Maintenance, Inventory, Finance, Safety
- `src/shared/models` — доменные типы
- `src/shared/data` — мок-данные по площадкам, персоналу, инцидентам и т.д.
- `src/shared/lib/kpi.ts` — расчёт KPI и OSI
- `src/shared/lib/strings.ts` — текстовые константы на русском
- `src/shared/hooks/useTableSortAndFilter.ts` — сортировка и поиск по таблицам
- `src/shared/components` — общие элементы UI (Card, Table, KpiBadge, InfoTooltip и др.)

## Запуск
```bash
npm install
npm run dev    # запуск dev-сервера Vite
npm run build  # production-сборка
npm run preview
npm run test   # unit-тесты KPI
```
