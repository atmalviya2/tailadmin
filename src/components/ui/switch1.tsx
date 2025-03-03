import { Check, X } from 'lucide-react';

interface SwitchProps {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Switch = ({ checked, disabled, onCheckedChange }: SwitchProps) => {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <div className={`
          relative m-0 block h-7.5 w-14 rounded-full
          ${checked 
            ? 'bg-primary dark:bg-primary-dark' 
            : 'bg-stroke dark:bg-gray-600'}
          transition-colors duration-300
        `}></div>
        <span className={`
          absolute top-1/2 left-[3px]
          flex h-6 w-6 -translate-y-1/2 
          items-center justify-center 
          rounded-full bg-white 
          shadow-switcher 
          duration-75 ease-linear
          ${checked ? '!right-[3px] !translate-x-full' : 'translate-x-0'}
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}>
          {checked ? (
            <Check className="h-4 w-4 text-primary dark:text-primary-dark" />
          ) : (
            <X className="h-4 w-4 text-gray-500" />
          )}
        </span>
      </div>
    </label>
  );
}; 