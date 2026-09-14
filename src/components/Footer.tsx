import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
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
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const navStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

// Mobile-optimized item variant (removed expensive CSS blur filters)
const riseItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.5, bounce: 0 },
  },
};

const linkStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const linkItem: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.35, bounce: 0 },
  },
};

const ctaVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.45, bounce: 0 },
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
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="w-full overflow-hidden bg-black font-sans antialiased pb-12 sm:pb-16 rounded-t-3xl sm:rounded-t-[3rem]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-5 pt-10 sm:px-10 sm:pt-14 lg:px-14 lg:pt-16 xl:px-20"
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-16 xl:gap-20">
          {/* Brand Info & Call to Action */}
          <motion.div
            variants={riseItem}
            className="flex shrink-0 flex-col gap-4 sm:gap-5 lg:max-w-xs"
          >
            <div className="flex items-center gap-2 pr-6">
              <div className="flex h-8 w-8 items-center justify-center text-emerald-500">
                {logoIcon ?? (
                  <img src="/favicon.svg" alt={brandName} className="size-6" />
                )}
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                {brandName}
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
              {description}
            </p>

            <motion.a
              href={ctaHref}
              onClick={(e) => handleHashClick(e, ctaHref)}
              variants={ctaVariant}
              whileTap={{ scale: 0.96 }}
              className="group mt-1 inline-flex w-fit items-center gap-2.5 rounded-full bg-emerald-500 py-1 pr-1 pl-4 sm:pl-5 text-white shadow-md shadow-emerald-500/10 transition-all duration-200 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 cursor-pointer"
            >
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-black">
                {ctaLabel}
              </span>
              <span className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-black text-emerald-400 shadow-sm transition-transform duration-200 group-hover:scale-105">
                <FaArrowRight className="size-3 sm:size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            variants={navStagger}
            aria-label="Footer navigation"
            className="grid w-full max-w-lg grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4"
          >
            {columns.map((col) => (
              <motion.div key={col.title} variants={riseItem}>
                <h3 className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-200 uppercase">
                  {col.title}
                </h3>
                <motion.ul
                  variants={linkStagger}
                  className="mt-3 sm:mt-4 flex flex-col gap-2.5 sm:gap-3"
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
                            className="group inline-flex items-center gap-2 py-0.5 text-xs sm:text-sm font-normal text-zinc-400 transition-colors duration-150 hover:text-emerald-400 cursor-pointer"
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
                            className="group inline-flex items-center gap-2 py-0.5 text-xs sm:text-sm font-normal text-zinc-400 transition-colors duration-150 hover:text-emerald-400"
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
