import { strings } from './strings';

type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const toneMap: Record<string, StatusTone> = {
  critical: 'danger',
  warning: 'warning',
  healthy: 'success',
  ok: 'success',
  stable: 'success',
  done: 'success',
  in_progress: 'info',
  open: 'warning',
  scheduled: 'info',
  overdue: 'danger',
  draft: 'neutral',
  sent: 'info',
  received: 'success',
  in_transit: 'info'
};

export function getStatusTone(status: string): StatusTone {
  return toneMap[status] ?? 'neutral';
}

export function getStatusLabel(status: string): string {
  const labels = strings.statusLabels as Record<string, string>;
  return labels[status] ?? status;
}
