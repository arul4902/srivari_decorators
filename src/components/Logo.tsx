import { type HTMLAttributes } from 'react'

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'mark' | 'full' | 'stacked'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  markOnly?: boolean
  showTagline?: boolean
}

export function LogoMark({ size = 38, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/logo.svg"
        alt="Srivari Decorators Emblem"
        width={size}
        height={size}
        className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(114,0,168,0.35)]"
        loading="eager"
      />
    </div>
  )
}

export default function Logo({
  variant = 'full',
  size = 'md',
  markOnly = false,
  showTagline = true,
  className = '',
  ...rest
}: LogoProps) {
  const markDimensions = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 60,
  }[size]

  if (markOnly || variant === 'mark') {
    return (
      <div className={`inline-flex items-center ${className}`} {...rest}>
        <LogoMark size={markDimensions} />
      </div>
    )
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 group ${className}`} {...rest}>
        <LogoMark size={markDimensions + 8} />
        <div className="flex flex-col items-center leading-tight">
          <span className="font-serif text-white font-semibold text-xl tracking-wider uppercase">
            Srivari
          </span>
          <span className="text-[#D6B46A] text-[10px] tracking-[0.25em] uppercase font-medium">
            Decorators
          </span>
          {showTagline && (
            <span className="text-white/40 text-[9px] tracking-widest uppercase mt-0.5 font-light">
              Coimbatore
            </span>
          )}
        </div>
      </div>
    )
  }

  // Full horizontal combination mark
  return (
    <div className={`flex items-center gap-3 group ${className}`} {...rest}>
      <LogoMark size={markDimensions} />
      <div className="flex flex-col leading-none select-none">
        <div className="flex items-center gap-1.5">
          <span className="font-serif text-white font-semibold tracking-wide text-lg sm:text-xl">
            Srivari
          </span>
          <span className="inline-block w-1 h-1 rounded-full bg-[#E50065]" />
        </div>
        <span className="text-[#D6B46A] text-[10px] tracking-[0.24em] uppercase font-medium mt-0.5">
          Decorators
        </span>
        {showTagline && size !== 'sm' && (
          <span className="text-white/40 text-[8px] tracking-[0.2em] uppercase font-light mt-0.5 hidden sm:inline">
            Sound · Decors · Catering
          </span>
        )}
      </div>
    </div>
  )
}
