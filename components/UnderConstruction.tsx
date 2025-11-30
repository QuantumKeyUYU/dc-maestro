import React from 'react';
import { CircleHelp } from 'lucide-react';

interface UnderConstructionProps {
  title: string;
  code?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ title, code }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
        <CircleHelp className="h-8 w-8 text-slate-400" />
      </div>

      <div>
        <h1 className="text-xl font-semibold text-white">Модуль в разработке</h1>
        <p className="mt-1 text-sm text-slate-400">
          Раздел <span className="font-medium">&quot;{title}&quot;</span> будет
          доступен в следующих обновлениях.
        </p>
        {code && (
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
            {code}
          </p>
        )}
      </div>

      <p className="mt-2 max-w-md text-xs text-slate-500">
        Сейчас это демо-версия интерфейса. Здесь можно будет разместить отчёты,
        журналы, настройки доступа или другую функциональность в зависимости от
        задач заказчика.
      </p>
    </div>
  );
};

export default UnderConstruction;
