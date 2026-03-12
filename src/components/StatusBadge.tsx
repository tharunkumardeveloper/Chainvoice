interface StatusBadgeProps {
  status: 'financed' | 'not-financed' | 'in-progress' | 'duplicate' | 'pending' | 'verified' | 'paid' | 'rejected';
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const configs = {
    financed: {
      label: 'Financed',
      icon: '✓',
      bgColor: 'rgba(16,185,129,0.15)',
      borderColor: '#10B981',
      textColor: '#10B981',
      animate: false,
    },
    'not-financed': {
      label: 'Not Financed',
      icon: '○',
      bgColor: 'rgba(156,163,175,0.15)',
      borderColor: '#6B7280',
      textColor: '#9CA3AF',
      animate: false,
    },
    'in-progress': {
      label: 'In Progress',
      icon: '⏳',
      bgColor: 'rgba(59,130,246,0.15)',
      borderColor: '#3B82F6',
      textColor: '#3B82F6',
      animate: true,
    },
    duplicate: {
      label: 'Duplicate / Flagged',
      icon: '⚠',
      bgColor: 'rgba(239,68,68,0.15)',
      borderColor: '#EF4444',
      textColor: '#EF4444',
      animate: false,
    },
    pending: {
      label: 'Pending',
      icon: '⏸',
      bgColor: 'rgba(251,191,36,0.15)',
      borderColor: '#FBBF24',
      textColor: '#FBBF24',
      animate: false,
    },
    verified: {
      label: 'Verified',
      icon: '✓',
      bgColor: 'rgba(16,185,129,0.15)',
      borderColor: '#10B981',
      textColor: '#10B981',
      animate: false,
    },
    paid: {
      label: 'Paid',
      icon: '✓',
      bgColor: 'rgba(16,185,129,0.15)',
      borderColor: '#10B981',
      textColor: '#10B981',
      animate: false,
    },
    rejected: {
      label: 'Rejected',
      icon: '✕',
      bgColor: 'rgba(239,68,68,0.15)',
      borderColor: '#EF4444',
      textColor: '#EF4444',
      animate: false,
    },
  };

  const config = configs[status];
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-flex items-center space-x-1 rounded-full font-medium border ${sizeClasses[size]}`}
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.borderColor,
        color: config.textColor,
      }}
    >
      <span className={config.animate ? 'inline-block animate-pulse' : ''}>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
