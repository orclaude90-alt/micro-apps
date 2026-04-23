import * as React from 'react';
import { cn } from '../utils';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  valueDisplay?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, valueDisplay, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{label}</span>
          {valueDisplay && <span className="font-semibold text-blue-600">{valueDisplay}</span>}
        </div>
      )}
      <input
        ref={ref}
        type="range"
        className={cn(
          'w-full h-2 rounded-full appearance-none cursor-pointer',
          'bg-gray-200 [&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
          '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600',
          '[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer',
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Slider.displayName = 'Slider';
