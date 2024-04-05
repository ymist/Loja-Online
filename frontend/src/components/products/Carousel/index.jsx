import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import CardProduct from "@/components/products/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselCardsProducts({products}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[80%]"
    >
      <CarouselContent className="pb-16 pt-8 flex justify-center">

      {
    Array.from({ length: 8 }).map((_, i) => (
      <React.Fragment key={i}>
          <CarouselItem key={`${i}`} className="md:basis-1/3 lg:basis-1/4 flex justify-center">
        {products?.map((item, index) => (
          
            <CardProduct
              key={index}
              product={item}
              
              />
              ))}
              </CarouselItem>
      </React.Fragment>
    ))
  }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
