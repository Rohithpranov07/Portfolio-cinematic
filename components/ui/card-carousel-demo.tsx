import React from "react";

import { CardCarousel } from "@/components/ui/card-carousel";

const CardCarouselDemo = () => {
  const images = [
    { src: "https://picsum.photos/id/249/500/750", alt: "Portrait 1" },
    { src: "https://picsum.photos/id/1062/500/750", alt: "Portrait 2" },
    { src: "https://picsum.photos/id/1074/500/750", alt: "Portrait 3" },
  ];

  return (
    <div className="w-full">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  );
};

export default CardCarouselDemo;
