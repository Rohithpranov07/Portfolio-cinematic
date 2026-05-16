"use client";
import { Footer } from "@/components/ui/modem-animated-footer";
import {
  Send,
  Briefcase,
  Code2,
  Mail,
  NotepadTextDashed,
} from "lucide-react";

export default function FooterDemo() {
  const socialLinks = [
    {
      icon: <Send className="w-6 h-6" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:contact@resumegpt.com",
      label: "Email",
    },
  ];

  const navLinks = [
    { label: "Pricing", href: "/" },
    { label: "Templates", href: "/" },
    { label: "About", href: "/" },
    { label: "Contact", href: "/" },
  ];

  return (
    <Footer
      brandName="Rohith Pranov"
      brandDescription="Designer & engineer crafting distinctive, motion-rich web experiences."
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
