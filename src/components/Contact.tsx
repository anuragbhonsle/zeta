import React, { useReducer } from "react";
import axios from "axios";
import { motion, type Variants } from "framer-motion";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export interface ContactFormFields {
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  namePlaceholder?: string;
  messagePlaceholder?: string;
  submitText?: string;
}

export interface NewsletterFields {
  heading?: string;
  description?: string;
  emailPlaceholder?: string;
  buttonText?: string;
}

export interface ContactCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "primary" | "secondary" | "outline" | "muted";
}

export interface Contact6Props {
  form?: ContactFormFields;
  newsletter?: NewsletterFields;
  cards?: ContactCard[];
}

const getCardStyles = (variant?: ContactCard["variant"]) => {
  switch (variant) {
    case "primary":
      return "bg-emerald-500 text-white border-transparent shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.4),inset_0_-2px_4px_0_rgba(0,0,0,0.3)]";
    case "secondary":
      return "bg-black text-white border-transparent shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.1),inset_0_-2px_4px_0_rgba(0,0,0,0.5)]";
    case "outline":
      return "bg-white text-zinc-950 border-zinc-200 shadow-sm";
    case "muted":
    default:
      return "bg-zinc-100 text-zinc-900 border-transparent shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]";
  }
};

const getIconStyles = (variant?: ContactCard["variant"]) => {
  switch (variant) {
    case "primary":
      return "text-white";
    case "secondary":
      return "text-emerald-400";
    case "outline":
    case "muted":
    default:
      return "text-emerald-500";
  }
};

const getDescriptionStyles = (variant?: ContactCard["variant"]) => {
  switch (variant) {
    case "primary":
      return "text-emerald-50";
    case "secondary":
      return "text-zinc-300";
    case "outline":
    case "muted":
    default:
      return "text-zinc-600";
  }
};

interface FormState {
  email: string;
  phone: string;
  name: string;
  message: string;
  newsletterEmail: string;
  contactStatus: "idle" | "loading" | "success" | "error";
  newsletterStatus: "idle" | "loading" | "success" | "error";
  contactMessage: string;
  newsletterMessage: string;
}

type Action =
  | { type: "CHANGE_INPUT"; field: keyof FormState; value: string }
  | {
      type: "SET_STATUS";
      formType: "contact" | "newsletter";
      status: FormState["contactStatus"];
      message?: string;
    }
  | { type: "RESET_FORM"; formType: "contact" | "newsletter" };

const initialState: FormState = {
  email: "",
  phone: "",
  name: "",
  message: "",
  newsletterEmail: "",
  contactStatus: "idle",
  newsletterStatus: "idle",
  contactMessage: "",
  newsletterMessage: "",
};

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };
    case "SET_STATUS":
      return action.formType === "contact"
        ? {
            ...state,
            contactStatus: action.status,
            contactMessage: action.message || "",
          }
        : {
            ...state,
            newsletterStatus: action.status,
            newsletterMessage: action.message || "",
          };
    case "RESET_FORM":
      return action.formType === "contact"
        ? { ...state, email: "", phone: "", name: "", message: "" }
        : { ...state, newsletterEmail: "" };
    default:
      return state;
  }
}

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.7, bounce: 0 },
  },
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export default function Contact({
  form = {
    emailPlaceholder: "Work Email",
    phonePlaceholder: "Phone Number",
    namePlaceholder: "Full Name",
    messagePlaceholder: "How can I assist you?",
    submitText: "Send Message",
  },
  newsletter = {
    heading: "Let's talk.",
    description:
      "Get the latest insights, product updates, and news delivered straight to your inbox.",
    emailPlaceholder: "Your email address",
    buttonText: "Get in Touch",
  },
  cards = [
    {
      icon: <MdPhone className="h-8 w-8" />,
      title: "+91 9373336322",
      description:
        "Mon–Sun, 10am–7pm IST. If I miss it, I'm just downstairs getting a coffee.",
      variant: "secondary",
    },
    {
      icon: <MdEmail className="h-8 w-8" />,
      title: "anuragkbhonsle.com",
      description:
        "Drop us an email anytime. We typically reply within 1 hour.",
      variant: "secondary",
    },
    {
      icon: <MdLocationOn className="h-8 w-8" />,
      title: "Headquarters",
      description:
        "(Latitude: 18.5204, Longitude: 73.8567). Bring a laptop with Docker installed.",
      variant: "secondary",
    },
  ],
}: Contact6Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: "CHANGE_INPUT", field, value: e.target.value });
    };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_STATUS", formType: "contact", status: "loading" });

    try {
      await axios.post(`${VITE_API_URL}/api/contact`, {
        email: state.email,
        phone: state.phone,
        name: state.name,
        message: state.message,
      });

      dispatch({
        type: "SET_STATUS",
        formType: "contact",
        status: "success",
        message: "Message sent! I'll get back to you shortly.",
      });
      dispatch({ type: "RESET_FORM", formType: "contact" });
    } catch (err: unknown) {
      let errorMsg = "Something went wrong.";
      if (axios.isAxiosError(err)) {
        errorMsg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message;
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }

      dispatch({
        type: "SET_STATUS",
        formType: "contact",
        status: "error",
        message: errorMsg,
      });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_STATUS", formType: "newsletter", status: "loading" });

    try {
      await axios.post(`${VITE_API_URL}/api/newsletter`, {
        email: state.newsletterEmail,
      });

      dispatch({
        type: "SET_STATUS",
        formType: "newsletter",
        status: "success",
        message: "Subscribed! Welcome aboard.",
      });
      dispatch({ type: "RESET_FORM", formType: "newsletter" });
    } catch (err: unknown) {
      let errorMsg = "Something went wrong.";
      if (axios.isAxiosError(err)) {
        errorMsg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message;
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }

      dispatch({
        type: "SET_STATUS",
        formType: "newsletter",
        status: "error",
        message: errorMsg,
      });
    }
  };

  return (
    <section className="w-full px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl space-y-8 md:space-y-12">
        {/* Upper Section: Form & Newsletter */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12"
        >
          {/* Contact Form Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <form className="space-y-5" onSubmit={handleContactSubmit}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input
                  type="email"
                  required
                  value={state.email}
                  onChange={handleInputChange("email")}
                  placeholder={form.emailPlaceholder}
                  className="bg-zinc-100 text-zinc-950 placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 h-14 w-full rounded-2xl border border-transparent px-5 text-base outline-none shadow-none transition-shadow focus-visible:ring-2"
                />
                <input
                  type="tel"
                  value={state.phone}
                  onChange={handleInputChange("phone")}
                  placeholder={form.phonePlaceholder}
                  className="bg-zinc-100 text-zinc-950 placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 h-14 w-full rounded-2xl border border-transparent px-5 text-base outline-none shadow-none transition-shadow focus-visible:ring-2"
                />
              </div>
              <input
                type="text"
                required
                value={state.name}
                onChange={handleInputChange("name")}
                placeholder={form.namePlaceholder}
                className="bg-zinc-100 text-zinc-950 placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 h-14 w-full rounded-2xl border border-transparent px-5 text-base outline-none shadow-none transition-shadow focus-visible:ring-2"
              />
              <textarea
                required
                value={state.message}
                onChange={handleInputChange("message")}
                placeholder={form.messagePlaceholder}
                className="bg-zinc-100 text-zinc-950 placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 min-h-40 w-full resize-none rounded-2xl border border-transparent p-5 text-base outline-none shadow-none transition-shadow focus-visible:ring-2"
              />
              <div className="space-y-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  type="submit"
                  disabled={state.contactStatus === "loading"}
                  className="bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 inline-flex items-center justify-center h-12 rounded-full px-8 text-base font-medium shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.4),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] transition-colors cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  {state.contactStatus === "loading"
                    ? "Sending..."
                    : form.submitText}
                </motion.button>
                {state.contactMessage && (
                  <p
                    className={`text-sm ${
                      state.contactStatus === "success"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {state.contactMessage}
                  </p>
                )}
              </div>
            </form>
          </motion.div>

          {/* Newsletter Box */}
          <motion.div
            variants={fadeInUp}
            className="bg-zinc-950 text-white flex flex-col justify-center rounded-3xl p-8 shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.1),inset_0_-2px_4px_0_rgba(0,0,0,0.5)] lg:col-span-2 lg:p-10"
          >
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                {newsletter.heading}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed md:text-base">
                {newsletter.description}
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                required
                value={state.newsletterEmail}
                onChange={handleInputChange("newsletterEmail")}
                placeholder={newsletter.emailPlaceholder}
                className="text-zinc-950 placeholder:text-zinc-500 focus-visible:ring-emerald-400/50 h-14 w-full rounded-full border-none bg-zinc-100 px-6 text-base outline-none shadow-none"
              />
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                type="submit"
                disabled={state.newsletterStatus === "loading"}
                className="h-14 w-full rounded-full bg-emerald-500 text-lg font-medium text-white shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.4),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] transition-colors cursor-pointer hover:bg-emerald-600 disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                {state.newsletterStatus === "loading"
                  ? "Subscribing..."
                  : newsletter.buttonText}
              </motion.button>
              {state.newsletterMessage && (
                <p
                  className={`text-sm text-center ${
                    state.newsletterStatus === "success"
                      ? "text-emerald-400"
                      : "text-rose-400"
                  }`}
                >
                  {state.newsletterMessage}
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>

        {/* Info Cards Grid */}
        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`rounded-3xl border ${getCardStyles(card.variant)}`}
            >
              <div className="flex h-full flex-col items-start justify-center p-6">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className={`shrink-0 ${getIconStyles(card.variant)}`}>
                    {card.icon}
                  </div>
                  <h4 className="text-lg font-bold lg:text-xl">{card.title}</h4>
                </div>
                <p
                  className={`text-sm leading-relaxed lg:text-base ${getDescriptionStyles(card.variant)}`}
                >
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
