import React from "react";

import { CardCarousel } from "@/components/ui/card-carousel";

const CardCarouselDemo = () => {
  const images = [
    {
      src: "/design_carosoul/Ben-10 2.PNG",
      alt: "Ben-10",
      link: "https://www.figma.com/design/tJikDaMx1ZE2wJdfAP3XPT/Task-3--Ben-10-Landing-Page?node-id=0-1&t=52THGTT7iwl84t7m-1",
    },
    {
      src: "/design_carosoul/Boundary-1.jpg",
      alt: "Boundary",
      objectPosition: "center top",
      link: "https://www.figma.com/design/o2r1PmSuHbsRzAW2t1vMt4/Task-1--Boundary-App?node-id=0-1&t=6bMI7sVF9l2e8Sbs-1",
    },
    {
      src: "/design_carosoul/Designathon-1.jpg",
      alt: "Designathon",
      link: "https://www.figma.com/design/993y2YSinlvj38sUj48UqW/Untitled?node-id=0-1&t=5DzyZiRlsSKyVcRT-1",
    },
    {
      src: "/design_carosoul/Echo-1.PNG",
      alt: "Echo",
      link: "https://www.figma.com/design/nAs1VOX8q2hSVXFMEGSciM/Echo-design?node-id=0-1&t=9QN4bdF8qDlK5itm-1",
    },
    {
      src: "/design_carosoul/Emotion 2.PNG",
      alt: "Emotions",
      link: "https://www.figma.com/design/zJnfu1JRuIRnvZyhWVqUBg/Task-1.1?node-id=0-1&t=zkDY5QvhQ9P3hjUX-1",
    },
    {
      src: "/design_carosoul/Kodairatedesign-1.jpg",
      alt: "KodaiRateIQ design",
      objectPosition: "center top",
      link: "https://www.figma.com/design/YGU1O4PiCwfdLO6uNkIC0D/KodairateIQ?node-id=0-1&t=5he7ZHtJzJ691JHt-1",
    },
    {
      src: "/design_carosoul/Mediation-1.jpg",
      alt: "Meditation",
      link: "https://www.figma.com/design/gKQk5R2RyniAy1y1lb6ihR/Task-1.2-Ambient-Meditation?node-id=0-1&t=vTawM06lQUu8J7DK-",
    },
    {
      src: "/design_carosoul/Pablo 2.PNG",
      alt: "Pablo",
      link: "https://www.figma.com/design/xLeJZMHjKsOs9JHRADcKhD/Task-2--Pablo-Picasso-Portfolio?node-id=0-1&t=NivHFxJj96biIbDj-1",
    },
    {
      src: "/design_carosoul/Ridershield-1.jpg",
      alt: "Ridershield",
    },
    {
      src: "/design_carosoul/Shopsmart-zoomparallax.png",
      alt: "SmartShop",
      link: "https://www.figma.com/design/hXZztH0S6aenYjk3l7j3Ps/ShoptSmart?node-id=1-2&t=ABqJX6vVk2iRYcio-1",
    },
    {
      src: "/design_carosoul/Sony.jpg",
      alt: "Sony Walkman",
      link: "https://www.figma.com/design/jY0TsRHDDt9GOrn9EebdJh/Task-2.1--Sony-Walkman-Time-Travel-Interface?node-id=1-2&t=ilUxN6sdaTLyHAqZ-1",
    },
    {
      src: "/design_carosoul/ev-1.jpg",
      alt: "EV Dashboard",
      link: "https://www.figma.com/design/q50GuYzSdZeHo2DsJ7fRtm/EV-dashboard?node-id=0-1&t=9cG0eqk6JoMuduC7-1",
    },
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
