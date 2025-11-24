# DC Maestro

DC Maestro — локально запускаемое SPA-приложение-кокпит для сети ЦОД. Прототип v0.1 показывает ключевые KPI, состояние площадок, персонал, обслуживание, склад, финансы и безопасность на мок-данных прямо во фронтенде.

## Стек
- Vite + React + TypeScript
- Tailwind CSS для тёмной темы и базовых UI-компонентов
- Recharts для графиков
- Vitest для unit-тестов KPI

## Структура
- `src/app/App.tsx` — каркас приложения с сайдбаром, хедером и роутингом
- `src/modules/*` — экраны Dashboard, Sites, Personnel, Maintenance, Inventory, Finance, Safety
- `src/shared/models` — доменные типы
- `src/shared/data` — мок-данные по площадкам, персоналу, инцидентам и т.д.
- `src/shared/lib/kpi.ts` — расчёт KPI и OSI
- `src/shared/components` — общие элементы UI (Card, Table, KpiBadge и др.)

## Запуск
```bash
npm install
npm run dev    # запуск dev-сервера Vite
npm run build  # production-сборка
npm run preview
npm run test   # unit-тесты KPI
```
