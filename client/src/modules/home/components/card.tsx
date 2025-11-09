import { Image } from '$components/molecules/image'
import { FC } from 'react'

type Props = {
  title: string
  description?: string
  imagePath: string
}

export const HomeCard: FC<Props> = ({ title, description, imagePath }) => {
  return (
    <div className="bg-card rounded-xl p-4 flex flex-col gap-4 w-full h-full">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
      <Image
        src={imagePath}
        alt={title}
        className="object-contain object-right"
      />
    </div>
  )
}
