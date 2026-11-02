'use client'

import React from 'react'
import Image from 'next/image'

type LogoProps = {
  variant?: 'white' | 'full'
  locale?: string
  className?: string
  height?: number
  width?: number
  priority?: boolean
}

export function Logo({
  variant = 'full',
  locale = 'en',
  className = '',
  height = 44,
  width = 176,
  priority = false,
}: LogoProps) {
  const logoSrc = variant === 'white' 
    ? '/brand/fresh-ceramics-reverse-logo.png' 
    : '/brand/logo-fresh-ceramics.png'

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      aria-label={locale === 'bn' ? 'ফ্রেশ সিরামিকস লোগো' : 'Fresh Ceramics Logo'}
    >
      <div className="relative flex items-center">
        <Image
          src={logoSrc}
          alt={locale === 'bn' ? 'ফ্রেশ সিরামিকস' : 'Fresh Ceramics'}
          width={width}
          height={height}
          priority={priority}
          style={{ maxHeight: `${height}px`, width: 'auto' }}
          className="object-contain transition-all duration-200"
        />
        {locale === 'bn' && (
          <span className="sr-only">ফ্রেশ সিরামিকস</span>
        )}
      </div>
    </div>
  )
}
