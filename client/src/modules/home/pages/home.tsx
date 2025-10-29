'use client'

import { Image } from '$components/molecules/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '$components/ui/carousel'
import { FC } from 'react'
import { HomeArea } from '../components/area'
import { HomeCard } from '../components/card'

export const HomePage: FC = () => {
  return (
    <div className="h-screen flex flex-col gap-8">
      <div className="grid grid-cols-4 grid-rows-2 gap-4 h-2/3">
        <HomeArea className="col-span-2">
          <Image
            src="/images/logo-transparent.png"
            alt="Euphorium"
            className="object-contain object-left"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-5xl">Euphorium is the home for eurofans</h1>
            <p className="text-muted-foreground text-lg">
              The place to create, share and discuss your rankings and
              predictions on Eurovision, Sanremo, Melodifestivalen and many many
              more.
            </p>
          </div>
        </HomeArea>
        <HomeArea className="col-span-2 row-span-2">
          <h1 className="text-4xl">Featured show</h1>
          <Image
            src="/images/logo-transparent.png"
            alt="Euphorium"
            className="object-contain object-right"
          />
        </HomeArea>
        <HomeArea>
          <h1 className="text-2xl font-semibold">Enter our fantasy</h1>
        </HomeArea>
        <HomeArea>
          <h1 className="text-2xl font-semibold">Create rankings</h1>
        </HomeArea>
      </div>
      <div className="h-1/3 flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Current shows</h1>
        <div className="flex-1 px-12">
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            className="w-full h-full"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 object-contain">
                <HomeCard
                  title="Eurovision 2025"
                  imagePath="/images/logo-transparent.png"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <HomeCard
                  title="Melodifestivalen 2025"
                  imagePath="/images/logo-transparent.png"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <HomeCard
                  title="Sanremo 2025"
                  imagePath="/images/logo-transparent.png"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <HomeCard
                  title="JESC 2024"
                  imagePath="/images/logo-transparent.png"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <HomeCard
                  title="UMK 2025"
                  imagePath="/images/logo-transparent.png"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <HomeCard
                  title="Destination Eurovision"
                  imagePath="/images/logo-transparent.png"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <HomeCard
                  title="Eesti Laul 2025"
                  imagePath="/images/logo-transparent.png"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <HomeCard
                  title="Dora 2025"
                  imagePath="/images/logo-transparent.png"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
