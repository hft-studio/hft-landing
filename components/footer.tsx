import Link from "next/link";
import React from "react";
import { Logo } from "./logo";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";

export function Footer() {
  const legal = [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ];

  const socials = [
    { title: "Twitter", href: "https://x.com/HftStudio", icon: IconBrandTwitter },
    { title: "LinkedIn", href: "https://www.linkedin.com/company/hft-labs", icon: IconBrandLinkedin },
    { title: "GitHub", href: "https://github.com/hft-studio", icon: IconBrandGithub },
  ];

  return (
    <div className="relative border-t border-white/[0.1] px-8 py-20 bg-black w-full overflow-hidden mx-auto max-w-7xl">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px flex h-8 items-end overflow-hidden">
        <div className="flex -mb-px h-[2px] w-56">
          <div className="w-full flex-none [background-image:linear-gradient(90deg,rgba(255,255,255,0)_0%,#FFFFFF_32.29%,rgba(255,255,255,0.3)_67.19%,rgba(255,255,255,0)_100%)] blur-xs" />
        </div>
      </div>

      <div className="max-w-7xl my-28 mx-auto text-sm text-neutral-400 flex flex-col justify-between md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-16">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-sm text-neutral-400">
              An AI-native software development firm building products at the
              intersection of AI, digital assets, and data.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((social, idx) => (
                <SocialIcon key={`social-${idx}`} href={social.href}>
                  <social.icon strokeWidth={1.5} width={15} height={15} />
                </SocialIcon>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <div className="flex flex-col space-y-4">
              <p className="text-white font-semibold">Contact</p>
              <address className="not-italic space-y-2 text-sm text-neutral-400">
                <p>30 N Gould St, Ste N</p>
                <p>Sheridan, WY 82801</p>
                <p>
                  <a
                    href="mailto:michael@hftlabs.xyz"
                    className="hover:text-white transition-colors"
                  >
                    michael@hftlabs.xyz
                  </a>
                </p>
              </address>
            </div>

            <div className="flex flex-col space-y-4">
              <p className="text-white font-semibold">Legal</p>
              <ul className="space-y-3">
                {legal.map((item, idx) => (
                  <li key={`legal-${idx}`}>
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-8 text-xs text-neutral-500">
          © {new Date().getFullYear()} HFT Studio. All rights reserved. Doing
          business as HFT Labs.
        </div>
      </div>
    </div>
  );
}

interface SocialIconProps {
  href: string;
  children: React.ReactNode;
}

export function SocialIcon({ href, children }: SocialIconProps) {
  return (
    <Link
      href={href}
      className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center hover:bg-neutral-700/20 transition-all border border-neutral-700/50 shadow-[2px_-2px_15px_rgba(0,0,0,0.2)] hover:shadow-[4px_-4px_20px_rgba(0,0,0,0.3)] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:rounded-full"
    >
      <div className="w-5 h-5 text-neutral-400 hover:text-white transition-colors flex justify-center items-center">
        {children}
      </div>
    </Link>
  );
}
