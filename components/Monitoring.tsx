import React, { useState } from 'react';
import { Server, Info, MoreHorizontal, Thermometer } from 'lucide-react';
import { RackData, StatusLevel } from '../types';

// Mock Data
const racks: RackData[] = Array.from({ length: 12 }, (_, i) => ({
  id: `R-${100 + i}`,
  name: `Rack ${String.fromCharCode(65 + Math.floor(i / 4))}-${(i % 4) + 1}`,
  usage: Math.floor(Math.random() * 60) + 20,
  temperature: 20 + Math.random() * 8,
  power: 3 + Math.random() * 5,
  status: Math.random() > 0.9 ? StatusLevel.WARNING : Math.random() > 0.95 ? StatusLevel.CRITICAL : StatusLevel.NORMAL
}));

const Monitoring: React.FC = () => {
  const [selectedRack, setSelectedRack] = useState<RackData | null>(null);

  return (
    <div className="p-6 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Инфраструктура (DCIM)</h1>
          <p className="text-slate-400 text-sm">Визуализация Машзала №1 • Сектор B</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button className="px-3 py-1.5 text-xs font-medium text-white bg-slate-700 rounded shadow-sm">Стойки</button>
          <button className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors">Тепловая карта</button>
          <button className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors">Сеть</button>
        </div>
      </div>

      <div className="flex gap-6 h-full overflow-hidden">
        {/* Rack Grid */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {racks.map((rack) => (
              <div 
                key={rack.id}
                onClick={() => setSelectedRack(rack)}
                className={`relative group bg-slate-900 border rounded-xl p-4 transition-all cursor-pointer hover:-translate-y-1 duration-200
                  ${selectedRack?.id === rack.id ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-slate-800 hover:border-slate-600'}
                `}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded bg-slate-800 text-slate-400`}>
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{rack.name}</h3>
                      <span className="text-xs text-slate-500 font-mono">{rack.id}</span>
                    </div>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    rack.status === StatusLevel.NORMAL ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' :
                    rack.status === StatusLevel.WARNING ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' :
                    'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                  }`} />
                </div>

                {/* Visual Representation of Rack Units */}
                <div className="flex flex-col gap-[2px] h-32 bg-slate-950 rounded border border-slate-800 p-1 mb-4 relative overflow-hidden">
                   {/* Simplified visual blocks for servers */}
                   {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className={`h-full w-full rounded-[1px] ${
                        Math.random() > 0.3 ? 'bg-slate-800' : 'bg-transparent'
                      } flex items-center justify-center`}>
                        {Math.random() > 0.3 && <div className="w-1 h-1 bg-emerald-500/50 rounded-full animate-pulse ml-auto mr-1"></div>}
                      </div>
                   ))}
                   {/* Overlay Gradient for usage */}
                   <div className="absolute bottom-0 left-0 right-0 bg-blue-500/10 border-t border-blue-500/30 transition-all duration-1000" style={{ height: `${rack.usage}%` }}></div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950 rounded p-2 border border-slate-800/50">
                    <span className="text-slate-500 block mb-1">Нагрузка</span>
                    <span className="text-white font-mono font-medium">{rack.usage}%</span>
                  </div>
                  <div className="bg-slate-950 rounded p-2 border border-slate-800/50">
                    <span className="text-slate-500 block mb-1">Мощность</span>
                    <span className="text-white font-mono font-medium">{rack.power.toFixed(1)} kW</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel - Right Side */}
        {selectedRack && (
          <div className="w-80 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">{selectedRack.name}</h2>
                <div className="text-xs text-slate-400 font-mono mt-1">ID: {selectedRack.id}</div>
              </div>
              <button onClick={() => setSelectedRack(null)} className="text-slate-500 hover:text-white">
                 <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Temperature Gauge Mockup */}
              <div className="text-center p-4 bg-slate-950 rounded-lg border border-slate-800 relative">
                 <div className="absolute top-2 left-2 text-slate-500"><Thermometer className="w-4 h-4"/></div>
                 <div className="text-3xl font-bold text-white mb-1">{selectedRack.temperature.toFixed(1)}°C</div>
                 <div className="text-xs text-slate-500">Температура (Средняя)</div>
                 <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-rose-500 h-full w-[60%]"></div>
                 </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3">Оборудование</h3>
                <ul className="space-y-2">
                  {['Switch Core A1', 'Server Blade X1', 'Server Blade X2', 'Storage Array Z1'].map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center p-2 rounded bg-slate-800/50 border border-slate-800 text-xs">
                       <span className="text-slate-300">{item}</span>
                       <span className="flex items-center text-emerald-400 gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> OK</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors mt-auto">
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