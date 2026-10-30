import { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
  aspectRatio?: string
}

export default function SafeImage({
  src,
  alt = '',
  fallbackSrc,
  className = '',
  style,
  aspectRatio,
  ...rest
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [prevSrc, setPrevSrc] = useState(src)
  const [triedFallback, setTriedFallback] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (src !== prevSrc) {
    setPrevSrc(src)
    setCurrentSrc(src)
    setTriedFallback(false)
    setHasError(false)
    setLoaded(false)
  }

  const handleError = () => {
    if (!triedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setTriedFallback(true)
      setCurrentSrc(fallbackSrc)
    } else {
      setHasError(true)
      setLoaded(true)
    }
  }

  const handleRef = (el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true)
    }
  }

  return (
    <div
      className="relative overflow-hidden w-full h-full bg-[#27002F]"
      style={{ aspectRatio, ...style }}
    >
      {/* Skeleton loader - only shown while not loaded and no error */}
      {!loaded && !hasError && (
        <div
          className="absolute inset-0 animate-pulse z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(114,0,168,0.2) 0%, rgba(39,0,47,0.4) 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Branded placeholder if image completely fails */}
      {hasError ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
          style={{ background: 'linear-gradient(135deg, #27002F 0%, #3d0050 100%)' }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7200A8] to-[#E50065] flex items-center justify-center mb-3 shadow-lg">
            <Sparkles size={22} className="text-[#D6B46A]" />
          </div>
          <p className="font-serif text-white text-lg font-semibold tracking-wide">Srivari Decorators</p>
          <p className="text-[#D6B46A] text-[11px] tracking-widest uppercase mt-1">Coimbatore</p>
          <p className="text-white/40 text-xs mt-2 max-w-[200px]">{alt || 'Premium Event Setup'}</p>
        </div>
      ) : (
        <img
          ref={handleRef}
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-90'
          } ${className}`}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          {...rest}
        />
      )}
    </div>
  )
}
