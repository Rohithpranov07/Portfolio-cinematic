"use client";
import type { SVGProps } from "react";
import { Footer } from "@/components/ui/modem-animated-footer";
import {
  FileText,
  Mail,
  NotepadTextDashed,
} from "lucide-react";

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.54-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.53.11-3.19 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.19.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

export default function FooterDemo() {
  const socialLinks = [
    {
      icon: <LinkedinIcon className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/rohith-pranov",
      label: "LinkedIn",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      href: "https://drive.google.com/file/d/1_RlWFg78dGBueOH6he9EF3ptby07ZMML/view?usp=sharing",
      label: "Resume",
    },
    {
      icon: <GithubIcon className="w-6 h-6" />,
      href: "https://github.com/Rohithpranov07",
      label: "Github",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:rohithpranovv@gmail.com",
      label: "Mail",
    },
  ];

  const navLinks = [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Resume", href: "/" },
    { label: "Github", href: "https://github.com/Rohithpranov07" },
    { label: "Mail", href: "mailto:rohithpranovv@gmail.com" },
  ];

  return (
    <Footer
      brandName="Rohith Pranov"
      brandDescription="Developer & Engineer crafting intelligent, production-grade systems with purpose."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="Rohith Pranov"
      creatorUrl="https://github.com/Rohithpranov07"
      brandIcon={
        <NotepadTextDashed className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-background drop-shadow-lg" />
      }
    />
  );
}
