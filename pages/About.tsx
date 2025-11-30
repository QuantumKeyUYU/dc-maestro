import React from 'react';
import { Info, ArrowRight, CheckCircle } from 'lucide-react';
import { Card } from '../components/UI';
import { Link } from 'react-router-dom';

const FLOW_STEPS = [
  "Start with the Dashboard: Show OSI and the daily brief to highlight problem areas.",
  "Drill down into 'Sites' to show live KPIs and incident tracking.",
  "Use the Alerts panel to transition into Maintenance or Safety modules.",
  "Showcase Inventory and Financials to demonstrate budget and resource awareness.",
  "Finish with Personnel to show shift management capabilities."
];

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
         <h2 className="text-2xl font-bold text-white tracking-tight mb-2">DC Maestro Demo Context</h2>
         <p className="text-gray-400">
           Internal prototype for the "Vis Energy" vacancy: Demonstrating systemic Data Center network management.
         </p>
      </div>

      <Card title="Demo Flow" subtitle="Recommended path for the interview">
         <div className="space-y-4">
            {FLOW_STEPS.map((step, idx) => (
               <div key={idx} className="flex gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                     {idx + 1}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{step}</p>
               </div>
            ))}
         </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card title="Core Responsibilities">
            <ul className="space-y-3">
               {[
                  "Uptime & Incident Management",
                  "Maintenance & Repair (MRO)",
                  "Inventory & Procurement",
                  "OPEX/CAPEX Budgeting",
                  "Health, Safety & Compliance"
               ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                     <CheckCircle size={16} className="text-emerald-500" />
                     {item}
                  </li>
               ))}
            </ul>
         </Card>

         <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex flex-col justify-center items-center text-center">
            <Info size={48} className="text-blue-400 mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Ready to Start?</h3>
            <p className="text-gray-400 text-sm mb-6">Navigate through the sidebar to explore each module.</p>
            <Link to="/" className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
               Go to Dashboard <ArrowRight size={16} />
            </Link>
         </div>
      </div>
    </div>
  );
};
