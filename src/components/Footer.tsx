import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom"; // Change to "next/link" if using Next.js
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa6";
import {
  IconHome,
  IconInfoCircle,
  IconMail,
  IconBrandX,
  IconLink,
} from "@tabler/icons-react";

export interface Footer15Link {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface Footer15Column {
  title: string;
  links: Footer15Link[];
}

export interface Footer15Props {
  logoIcon?: ReactNode;
  brandName?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  columns?: Footer15Column[];
  heroBrandName?: string;
  copyrightYear?: string;
}

const defaultColumns: Footer15Column[] = [
  {
    title: "Links",
    links: [
      {
        label: "Home",
        href: "/",
        icon: <IconHome className="size-4 shrink-0" />,
      },
      {
        label: "About",
        href: "/about",
        icon: <IconInfoCircle className="size-4 shrink-0" />,
      },
      {
        label: "Contact",
        href: "/contact",
        icon: <IconMail className="size-4 shrink-0" />,
      },
    ],
  },
  {
    title: "Social",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/anuragbhonsle",
        icon: <FaGithub className="size-4 shrink-0" />,
      },
      {
        label: "Linkedin",
        href: "https://www.linkedin.com/in/anurag-bhonsle/",
        icon: <FaLinkedin className="size-4 shrink-0" />,
      },
      {
        label: "X",
        href: "https://x.com/Anuraaaag7",
        icon: <IconBrandX className="size-4 shrink-0" />,
      },
    ],
  },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const navStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};

const riseItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.6, bounce: 0 },
  },
};

const linkStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const linkItem: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.4, bounce: 0 },
  },
};

const ctaVariant: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.5, bounce: 0 },
  },
};

export function Footer({
  logoIcon,
  brandName = "Zeta",
  description = "Research interface for turning natural language questions into structured, reproducible trading experiments.",
  ctaLabel = "Explore now",
  ctaHref = "#top",
  columns = defaultColumns,
}: Footer15Props) {
  // Handles scrolling to section targets or to top when clicking hash links
  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();

      const targetId = href.replace("#", "");
      const element = targetId ? document.getElementById(targetId) : null;

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        // Fallback: scroll window directly to the top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="w-full overflow-hidden bg-black font-sans antialiased pb-15 rounded-t-[3rem]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-6 pt-10 pb-0 sm:px-10 sm:pt-14 lg:px-14 lg:pt-16 xl:px-20"
      >
        <div className="mx-auto flex max-w-360 flex-col justify-between gap-10 lg:flex-row lg:gap-16 xl:gap-20">
          {/* Brand Info & Call to Action */}
          <motion.div
            variants={riseItem}
            className="flex shrink-0 flex-col gap-5 lg:max-w-60 xl:max-w-65"
          >
            <div className="flex items-center gap-2 pr-6">
              <div className="flex h-8 w-8 items-center justify-center text-neutral-900 dark:text-emerald-500">
                {logoIcon ?? (
                  <img src="/favicon.svg" alt={brandName} className="size-6" />
                )}
              </div>
              <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                {brandName}
              </span>
            </div>

            <p className="text-sm leading-[1.6] font-normal text-pretty whitespace-pre-line text-zinc-400">
              {description}
            </p>

            <motion.a
              href={ctaHref}
              onClick={(e) => handleHashClick(e, ctaHref)}
              variants={ctaVariant}
              whileTap={{ scale: 0.96 }}
              className="group mt-1 inline-flex w-fit items-center gap-2.5 rounded-full bg-emerald-500 py-1 pr-1 pl-5 text-white shadow-md shadow-emerald-500/10 transition-all duration-200 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 cursor-pointer"
            >
              <span className="text-sm font-semibold tracking-wide text-black">
                {ctaLabel}
              </span>
              <span className="flex size-9 items-center justify-center rounded-full bg-black text-emerald-400 shadow-sm transition-transform duration-200 group-hover:scale-105">
                <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            variants={navStagger}
            aria-label="Footer navigation"
            className="grid w-full max-w-135 grid-cols-2 gap-y-8 sm:grid-cols-4"
          >
            {columns.map((col) => (
              <motion.div key={col.title} variants={riseItem}>
                <h3 className="text-sm font-semibold tracking-wider text-zinc-200 uppercase">
                  {col.title}
                </h3>
                <motion.ul
                  variants={linkStagger}
                  className="mt-4 flex flex-col gap-3"
                >
                  {col.links.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    const isHashLink = link.href.startsWith("#");

                    return (
                      <motion.li key={link.label} variants={linkItem}>
                        {isExternal || isHashLink ? (
                          <a
                            href={link.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            onClick={(e) => handleHashClick(e, link.href)}
                            className="group inline-flex items-center gap-2 text-sm font-normal text-zinc-400 transition-colors duration-150 hover:text-emerald-400 cursor-pointer"
                          >
                            <span className="text-zinc-500 transition-colors duration-150 group-hover:text-emerald-400">
                              {link.icon ?? (
                                <IconLink className="size-4 shrink-0" />
                              )}
                            </span>
                            <span>{link.label}</span>
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="group inline-flex items-center gap-2 text-sm font-normal text-zinc-400 transition-colors duration-150 hover:text-emerald-400"
                          >
                            <span className="text-zinc-500 transition-colors duration-150 group-hover:text-emerald-400">
                              {link.icon ?? (
                                <IconLink className="size-4 shrink-0" />
                              )}
                            </span>
                            <span>{link.label}</span>
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>
            ))}
          </motion.nav>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
