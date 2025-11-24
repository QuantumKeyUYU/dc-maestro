import { useMemo } from 'react';
import { sites } from '../data/sites';
import { workOrders } from '../data/workOrders';
import { safetyEvents } from '../data/safetyEvents';

export function useNavBadges() {
  return useMemo(() => {
    const today = new Date();
    const nonHealthySites = sites.filter((site) => site.status !== 'healthy').length;
    const overdueWorkOrders = workOrders.filter((wo) => wo.status !== 'done' && wo.dueDate && wo.dueDate < today).length;
    const overdueSafety = safetyEvents.filter((event) => event.status === 'overdue').length;

    return {
      nonHealthySites,
      overdueWorkOrders,
      overdueSafety
    };
  }, []);
}
