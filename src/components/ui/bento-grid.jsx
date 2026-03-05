import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, title, description, children }) => {
  return (
    <div
      className={cn(
        "group/bento relative overflow-hidden shadow-input surface row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/10 dark:bg-black dark:shadow-none dark:hover:border-white/60",
        className,
      )}
    >
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {children ? (
          children
        ) : (
          <>
            <div className="mt-4 mb-10 text-3xl font-bold text-neutral-600 dark:text-neutral-200">
              {title}
            </div>
            <div className="text-md font-normal text-neutral-600 dark:text-neutral-300">
              {description}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
