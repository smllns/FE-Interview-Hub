// buttons for settings page
interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'redLight' | 'redDark';
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  variant = 'default',
}) => {
  const baseClasses =
    'px-4 py-2 rounded-lg font-bold text-lg text-white uppercase border transition-all duration-200 cursor-pointer';

  const variantClasses = {
    default:
      'bg-black/30 hover:bg-black/40 dark:bg-white/30 dark:hover:bg-white/40 border-black/30 dark:border-white/30',
    redLight:
      'bg-red-400/50 hover:bg-red-400/70 dark:bg-red-400/60 dark:hover:bg-red-400/80 border-black/30 dark:border-white/30',
    redDark:
      'bg-red-600/60 hover:bg-red-600/80 dark:bg-red-500/60 dark:hover:bg-red-500/70 border-black/30 dark:border-white/30',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};
