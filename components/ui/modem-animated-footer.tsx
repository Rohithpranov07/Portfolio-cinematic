"use client";
import React from "react";
import Link from "next/link";
import { NotepadTextDashed } from "lucide-react";
import { cn } from "@/lib/utils";

const isExternalUrl = (href: string) => /^https?:\/\//i.test(href);
const isProtocolLink = (href: string) =>
  /^(mailto:|tel:|sms:)/i.test(href);

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const Footer = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full min-h-screen flex flex-col mt-0 overflow-hidden", className)}>
      <footer className="border-t bg-background relative flex-1 flex flex-col">
        <div className="max-w-7xl w-full flex flex-col mx-auto min-h-screen relative px-6 md:px-12" style={{ paddingTop: "10vh", paddingBottom: "8vh", paddingLeft: "18vh"}}>
          <div className="flex-1 flex flex-col items-center justify-start w-full">
            <div className="w-full flex flex-col items-center">
              <div className="flex flex-col items-center gap-8">
                <span className="text-foreground text-4xl md:text-5xl font-bold tracking-tight">
                  {brandName}
                </span>
                <p
                  className="text-muted-foreground font-medium text-center text-base leading-loose"
                  style={{ whiteSpace: "nowrap", marginBottom: "32px" }}
                >
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && socialLinks.length === navLinks.length ? (
                <div
                  className="mt-14 grid"
                  style={{
                    gridTemplateColumns: `repeat(${socialLinks.length}, minmax(0, 1fr))`,
                    columnGap: "56px",
                    rowGap: "16px",
                    justifyItems: "center",
                  }}
                >
                  {socialLinks.map((link, index) => {
                    const proto = isProtocolLink(link.href);
                    const external = isExternalUrl(link.href);
                    return (
                      <a
                        key={`s-${index}`}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors flex justify-center"
                        target={proto ? undefined : external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        style={{ gridRow: 1, gridColumn: index + 1 }}
                      >
                        <div className="w-6 h-6 hover:scale-110 duration-300 flex items-center justify-center">
                          {link.icon}
                        </div>
                        <span className="sr-only">{link.label}</span>
                      </a>
                    );
                  })}
                  {navLinks.map((link, index) => {
                    const proto = isProtocolLink(link.href);
                    const external = isExternalUrl(link.href);
                    if (proto || external) {
                      return (
                        <a
                          key={`n-${index}`}
                          className="hover:text-foreground duration-300 hover:font-semibold text-base font-medium text-muted-foreground text-center"
                          href={link.href}
                          target={proto ? undefined : "_blank"}
                          rel={external ? "noopener noreferrer" : undefined}
                          style={{ gridRow: 2, gridColumn: index + 1 }}
                        >
                          {link.label}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={`n-${index}`}
                        className="hover:text-foreground duration-300 hover:font-semibold text-base font-medium text-muted-foreground text-center"
                        href={link.href}
                        style={{ gridRow: 2, gridColumn: index + 1 }}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <>
                  {socialLinks.length > 0 && (
                    <div className="flex mt-14 gap-8">
                      {socialLinks.map((link, index) => {
                        const proto = isProtocolLink(link.href);
                        const external = isExternalUrl(link.href);
                        return (
                          <a
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            target={proto ? undefined : external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                          >
                            <div className="w-6 h-6 hover:scale-110 duration-300">
                              {link.icon}
                            </div>
                            <span className="sr-only">{link.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {navLinks.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-10 mt-14 text-base font-medium text-muted-foreground max-w-full px-4">
                      {navLinks.map((link, index) => {
                        const proto = isProtocolLink(link.href);
                        const external = isExternalUrl(link.href);
                        if (proto || external) {
                          return (
                            <a
                              key={index}
                              className="hover:text-foreground duration-300 hover:font-semibold"
                              href={link.href}
                              target={proto ? undefined : "_blank"}
                              rel={external ? "noopener noreferrer" : undefined}
                            >
                              {link.label}
                            </a>
                          );
                        }
                        return (
                          <Link
                            key={index}
                            className="hover:text-foreground duration-300 hover:font-semibold"
                            href={link.href}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
            <p className="text-base text-muted-foreground text-center md:text-left">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors duration-300 hover:font-medium"
                >
                  Crafted by {creatorName}
                </Link>
              </nav>
            )}
          </div>
        </div>

        <div
          className="bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-28 md:bottom-24 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4"
          style={{
            fontSize: "clamp(4rem, 16vw, 14rem)",
            maxWidth: "95vw",
          }}
        >
          {brandName.toUpperCase()}
        </div>

        <div className="absolute hover:border-foreground duration-400 drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0px_20px_rgba(255,255,255,0.3)] bottom-28 md:bottom-28 backdrop-blur-sm rounded-3xl bg-background/60 left-1/2 border-2 border-border flex items-center justify-center p-3 -translate-x-1/2 z-10">
          <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-br from-foreground to-foreground/80 rounded-2xl flex items-center justify-center shadow-lg">
            {brandIcon || (
              <NotepadTextDashed className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-background drop-shadow-lg" />
            )}
          </div>
        </div>

        <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-1 bg-gradient-to-r from-transparent via-border to-transparent w-full left-1/2 -translate-x-1/2"></div>

        <div className="bg-gradient-to-t from-background via-background/80 blur-[1em] to-background/40 absolute bottom-28 w-full h-24"></div>
      </footer>
    </section>
  );
};
