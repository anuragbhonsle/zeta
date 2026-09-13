"use client";

import {
  useState,
  useRef,
  useEffect,
  useId,
  useMemo,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

function GooeyFilter({ filterId, blur }: { filterId: string; blur: number }) {
  return (
    <svg className="absolute hidden h-0 w-0" aria-hidden>
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blur}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

function SearchIcon({ layoutId }: { layoutId?: string }) {
  return (
    <motion.svg
      layoutId={layoutId}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="size-4 shrink-0 text-zinc-400"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </motion.svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="size-4"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const transition = {
  duration: 0.4,
  type: "spring" as const,
  bounce: 0.25,
};

const EXAMPLES = [
  "Does buying NIFTY after a 1% fall work better during high volatility?",
  "Is RELIANCE mean-reverting after a gap-down open?",
  "Does shorting NIFTY into monthly expiry have an edge?",
];

export interface GooeyInputClassNames {
  root?: string;
  filterWrap?: string;
  buttonRow?: string;
  trigger?: string;
  input?: string;
}

export interface GooeyInputProps {
  placeholder?: string;
  className?: string;
  classNames?: GooeyInputClassNames;
  collapsedWidth?: number;
  expandedWidth?: number;
  expandedOffset?: number;
  gooeyBlur?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  onFocusChange?: (focused: boolean) => void;
}

export function GooeyInput({
  placeholder = "Type to search...",
  className,
  classNames,
  collapsedWidth = 400,
  expandedWidth = 550,
  expandedOffset = 0,
  gooeyBlur = 5,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onOpenChange,
  onSubmit,
  onFocusChange,
  disabled = false,
}: GooeyInputProps) {
  const reactId = useId();
  const safeId = reactId.replace(/:/g, "");
  const filterId = `gooey-filter-${safeId}`;
  const iconLayoutId = `gooey-input-icon-${safeId}`;
  const inputLayoutId = `gooey-input-field-${safeId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const searchText = isControlled ? valueProp : uncontrolledValue;

  // Stays expanded when containing non-empty text OR explicitly focused
  const isExpanded = searchText.trim().length > 0 || isFocused;

  const setSearchText = useCallback(
    (next: string) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const updateFocus = useCallback(
    (focused: boolean) => {
      setIsFocused(focused);
      onFocusChange?.(focused);
    },
    [onFocusChange],
  );

  const setExpanded = useCallback(
    (next: boolean) => {
      updateFocus(next);
      onOpenChange?.(next);
    },
    [onOpenChange, updateFocus],
  );

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        updateFocus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [updateFocus]);

  const buttonVariants = useMemo(
    () => ({
      collapsed: { width: collapsedWidth, marginLeft: 0 },
      expanded: { width: expandedWidth, marginLeft: expandedOffset },
    }),
    [collapsedWidth, expandedWidth, expandedOffset],
  );

  const handleToggleExpand = useCallback(() => {
    if (!disabled && !isExpanded) {
      setExpanded(true);
    }
  }, [disabled, isExpanded, setExpanded]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    [setSearchText],
  );

  const handleSearchSubmit = useCallback(
    (queryToSubmit?: string) => {
      const finalQuery = queryToSubmit ?? searchText;
      if (!finalQuery.trim()) return;
      onSubmit?.(finalQuery);
      updateFocus(false);
    },
    [searchText, onSubmit, updateFocus],
  );

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearchSubmit();
  };

  const handleSelectExample = (example: string) => {
    setSearchText(example);
    updateFocus(false);
  };

  const surfaceClass =
    "bg-black text-white border border-neutral-800 shadow-2xl";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center justify-start w-full max-w-137.5",
        className,
        classNames?.root,
      )}
    >
      <GooeyFilter filterId={filterId} blur={gooeyBlur} />

      <div
        className={cn(
          "relative flex h-12 items-center justify-center w-full",
          classNames?.filterWrap,
        )}
        style={{ filter: `url(#${filterId})` }}
      >
        <motion.div
          className={cn(
            "flex h-12 items-center justify-center",
            classNames?.buttonRow,
          )}
          variants={buttonVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          transition={transition}
        >
          <form
            onSubmit={handleFormSubmit}
            onClick={handleToggleExpand}
            className={cn(
              "flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-full px-4 text-sm font-medium outline-none transition-all",
              surfaceClass,
              classNames?.trigger,
            )}
          >
            <SearchIcon layoutId={iconLayoutId} />

            <motion.input
              layoutId={inputLayoutId}
              ref={inputRef}
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              value={searchText}
              onChange={handleChange}
              onFocus={() => updateFocus(true)}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(
                "h-full min-w-0 flex-1 bg-black text-sm text-white outline-none placeholder:text-zinc-500",
                "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
                !isExpanded && "pointer-events-none cursor-pointer",
                classNames?.input,
              )}
            />

            {isExpanded && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                type="submit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearchSubmit();
                }}
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
                aria-label="Submit query"
              >
                <ArrowRightIcon />
              </motion.button>
            )}
          </form>
        </motion.div>
      </div>

      {/* Absolutely positioned dropdown so opening prompts doesn't push down the page */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 12, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-0 right-0 w-full flex flex-col gap-1.5 p-3 rounded-2xl bg-black border border-neutral-800 backdrop-blur-md shadow-2xl z-30"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-2 py-1 text-left">
              Suggested Prompts
            </span>
            {EXAMPLES.map((example, idx) => (
              <button
                key={idx}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectExample(example);
                }}
                className="text-left text-xs sm:text-sm text-zinc-300 hover:text-white hover:bg-neutral-800/80 p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between group"
              >
                <span>{example}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400">
                  <ArrowRightIcon />
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
