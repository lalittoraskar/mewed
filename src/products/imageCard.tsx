"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function ProductCarouselPlugin({ images, name }: { images: string[]; name: string }) {
// export function ProductCarouselPlugin(images: string[], name: string) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {
            images.map((image,index) => {
                return(
                    <CarouselItem key={index}>
                        <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                <img
                                    src={image}
                                    alt={name}
                                    className={`w-full h-full object-cover transition-opacity duration-300 opacity-100`}
                                    // onLoad={() => setImageLoaded(true)}
                                />
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                )
            })
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
