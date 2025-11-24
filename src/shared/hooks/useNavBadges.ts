import { useMemo } from 'react';
import { inventoryItems } from '../data/inventory';
import { safetyEvents } from '../data/safetyEvents';
import { sites } from '../data/sites';
import { workOrders } from '../data/workOrders';

export function useNavBadges() {
  return useMemo(() => {
    const today = new Date();
    const nonHealthySites = sites.filter((site) => site.status === 'critical' || site.status === 'warning').length;
    const overdueWorkOrders = workOrders.filter((wo) => wo.status !== 'done' && wo.dueDate && wo.dueDate < today).length;
    const lowInventory = inventoryItems.filter((item) => item.quantityOnHand <= item.minThreshold).length;
    const openSafety = safetyEvents.filter((event) => event.status !== 'done').length;

    return {
      nonHealthySites,
      overdueWorkOrders,
      lowInventory,
      openSafety
    };
  }, []);
}
