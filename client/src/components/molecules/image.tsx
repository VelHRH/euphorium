'use client'
import { cn } from '$lib/utils'
import { ImageIcon } from 'lucide-react'
import NextImage from 'next/image'
import { type FC, type ReactEventHandler, useState } from 'react'

type ImageProps = {
  src?: string | null
  alt: string
  parentClassName?: string
  className?: string
}

export const Image: FC<ImageProps> = ({
  src,
  alt,
  className,
  parentClassName,
}) => {
  const [noImage, setNoImage] = useState<boolean>(!src)

  const onImageError: ReactEventHandler<HTMLImageElement> = () => {
    setNoImage(true)
  }

  if (noImage) {
    return (
      <div
        className={cn(
          'w-full h-full flex flex-col gap-4 items-center justify-center bg-gray-100',
          className,
        )}
      >
        <ImageIcon className="w-8 h-8 text-gray-400" />
        <p className="text-gray-500 text-xs">{'No image'}</p>
      </div>
    )
  }

  return (
    <div className={cn('relative w-full h-full', parentClassName)}>
      <NextImage
        placeholder="empty"
        unoptimized={process.env.NODE_ENV === 'development'}
        fill
        src={src || ''}
        alt={alt}
        onError={onImageError}
        className={className}
      />
    </div>
  )
}
