import React, { useState } from 'react';
import { Server, MoreHorizontal, Thermometer } from 'lucide-react';
import { RackData, StatusLevel } from '../types';

// Mock Data
const racks: RackData[] = Array.from({ length: 12 }, (_, i) => ({
  id: `R-${100 + i}`,
  name: `Rack ${String.fromCharCode(65 + Math.floor(i / 4))}-${(i % 4) + 1}`,
  usage: Math.floor(Math.random() * 60) + 20,
  temperature: 20 + Math.random() * 8,
  power: 3 + Math.random() * 5,
  status:
    Math.random() > 0.9
      ? StatusLevel.WARNING
      : Math.random() > 0.95
      ? StatusLevel.CRITICAL
      : StatusLevel.NORMAL,
}));

const Monitoring: React.FC = () => {
  const [selectedRack, setSelectedRack] = useState<RackData | null>(null);

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Инфраструктура (DCIM)</h1>
          <p className="text-sm text-slate-400">
            Визуализация Машзала №1 • Сектор B
          </p>
        </div>

        <div className="flex items-center space-x-2 rounded-lg border border-slate-800 bg-slate-900 p-1">
          <button className="rounded bg-slate-700 px-3 py-1.5 text-xs font-medium text-white shadow-sm">
            Стойки
          </button>
          <button className="px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white">
            Тепловая карта
          </button>
          <button className="px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white">
            Сеть
          </button>
        </div>
      </div>

      <div className="flex h-full gap-6 overflow-hidden">
        {/* Rack Grid */}
        <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
            {racks.map((rack) => (
              <div
                key={rack.id}
                onClick={() => setSelectedRack(rack)}
                className={`group relative cursor-pointer rounded-xl border bg-slate-900 p-4 transition-all duration-200 hover:-translate-y-1 ${
                  selectedRack?.id === rack.id
                    ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded bg-slate-800 p-1.5 text-slate-400">
                      <Server className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {rack.name}
                      </h3>
                      <span className="font-mono text-xs text-slate-500">
                        {rack.id}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      rack.status === StatusLevel.NORMAL
                        ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
                        : rack.status === StatusLevel.WARNING
                        ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'
                        : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                    }`}
                  />
                </div>

                {/* Visual Representation of Rack Units */}
                <div className="relative mb-4 flex h-32 flex-col gap-[2px] overflow-hidden rounded border border-slate-800 bg-slate-950 p-1">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const filled = Math.random() > 0.3;
                    const showLed = filled && Math.random() > 0.3;
                    return (
                      <div
                        key={i}
                        className={`flex h-full w-full items-center justify-center rounded-[1px] ${
                          filled ? 'bg-slate-800' : 'bg-transparent'
                        }`}
                      >
                        {showLed && (
                          <div className="ml-auto mr-1 h-1 w-1 animate-pulse rounded-full bg-emerald-500/50" />
                        )}
                      </div>
                    );
                  })}
                  <div
                    className="absolute bottom-0 left-0 right-0 border-t border-blue-500/30 bg-blue-500/10 transition-all duration-1000"
                    style={{ height: `${rack.usage}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded border border-slate-800/50 bg-slate-950 p-2">
                    <span className="mb-1 block text-slate-500">Нагрузка</span>
                    <span className="font-mono font-medium text-white">
                      {rack.usage}%
                    </span>
                  </div>
                  <div className="rounded border border-slate-800/50 bg-slate-950 p-2">
                    <span className="mb-1 block text-slate-500">Мощность</span>
                    <span className="font-mono font-medium text-white">
                      {rack.power.toFixed(1)} kW
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel - Right Side */}
        {selectedRack && (
          <div className="animate-in slide-in-from-right flex w-80 flex-col rounded-xl border border-slate-800 bg-slate-900 p-5 duration-300">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {selectedRack.name}
                </h2>
                <div className="mt-1 font-mono text-xs text-slate-400">
                  ID: {selectedRack.id}
                </div>
              </div>
              <button
                onClick={() => setSelectedRack(null)}
                className="text-slate-500 transition-colors hover:text-white"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Temperature Gauge Mockup */}
              <div className="relative rounded-lg border border-slate-800 bg-slate-950 p-4 text-center">
                <div className="absolute left-2 top-2 text-slate-500">
                  <Thermometer className="h-4 w-4" />
                </div>
                <div className="mb-1 text-3xl font-bold text-white">
                  {selectedRack.temperature.toFixed(1)}°C
                </div>
                <div className="text-xs text-slate-500">
                  Температура (Средняя)
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[60%] bg-gradient-to-r from-blue-500 to-rose-500" />
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-300">
                  Оборудование
                </h3>
                <ul className="space-y-2">
                  {[
                    'Switch Core A1',
                    'Server Blade X1',
                    'Server Blade X2',
                    'Storage Array Z1',
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between rounded border border-slate-800 bg-slate-800/50 p-2 text-xs"
                    >
                      <span className="text-slate-300">{item}</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{' '}
                        OK
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-auto w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500">
                Открыть паспорт стойки
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monitoring;
