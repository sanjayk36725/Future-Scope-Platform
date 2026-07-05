import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@heroui/react';

interface CardProps {
  id?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerExtra?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  isHoverable?: boolean;
  className?: string;
  bodyClassName?: string;
  showDivider?: boolean;
  onClick?: () => void;
}

export const CustomCard: React.FC<CardProps> = ({
  id,
  title,
  subtitle,
  headerExtra,
  footer,
  children,
  isHoverable = true,
  className = '',
  bodyClassName = '',
  showDivider = true,
  onClick,
}) => {
  const hasHeader = title || subtitle || headerExtra;

  return (
    <Card
      id={id}
      onClick={onClick}
      className={`bg-white border border-slate-200/80 rounded-2xl transition-all duration-300 ${
        isHoverable ? 'hover:shadow-lg hover:border-slate-300/80' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {hasHeader && (
        <>
          <CardHeader className="flex justify-between items-center px-6 py-4">
            <div className="flex flex-col gap-1">
              {title && (
                <div className="font-sans font-bold text-slate-800 text-sm tracking-tight">
                  {title}
                </div>
              )}
              {subtitle && (
                <p className="font-sans text-xs text-slate-400 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
            {headerExtra && (
              <div className="flex items-center">
                {headerExtra}
              </div>
            )}
          </CardHeader>
          {showDivider && <div className="h-[1px] bg-slate-100 w-full" />}
        </>
      )}

      <CardContent className={`px-6 py-4 font-sans text-xs text-slate-600 leading-relaxed ${bodyClassName}`}>
        {children}
      </CardContent>

      {footer && (
        <>
          {showDivider && <div className="h-[1px] bg-slate-100 w-full" />}
          <CardFooter className="px-6 py-3.5 flex justify-end gap-2 bg-slate-50/50">
            {footer}
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default CustomCard;
