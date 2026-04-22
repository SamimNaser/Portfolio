import React, { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProjects } from "../data/projects";

const Projects = ({ hasAnimated }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === "Under Development") return -1;
    return 1;
  });
  const getStatusStyles = (status) => {
    if (status === "Completed") {
      return {
        dot: "bg-green-500",
        text: "text-green-500",
      };
    }

    return {
      dot: "bg-yellow-500",
      text: "text-yellow-500",
    };
  };

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 py-14 md:py-20 px-6 surface"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 delay-200 ${hasAnimated?.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-primary">
            PROJECTS
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            {projects.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="surface-elevated border border-primary/15 rounded-2xl p-7 md:p-8 min-h-96 h-full flex flex-col"
                >
                  <Skeleton className="h-3 w-24 mb-2" />
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-32 mb-6" />

                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-4/6 mb-6" />

                  <div className="mt-auto pt-8">
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))
              : sortedProjects.map((project) => (
                <article
                  key={project.github}
                  className="surface-elevated border border-primary/15 rounded-2xl p-7 md:p-8 min-h-96 h-full flex flex-col transition-all duration-300 hover:border-primary/40"
                >
                  <p className="text-xs tracking-[0.14em] text-primary/55 mb-2 uppercase">
                    {project.subtitle}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
                    {project.title}
                  </h3>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${getStatusStyles(project.status).dot}`}></span>
                      <span className={`relative inline-flex h-2 w-2 rounded-full ${getStatusStyles(project.status).dot}`}></span>
                    </span>
                    <span
                      className={`text-xs tracking-[0.18em] uppercase ${getStatusStyles(project.status).text}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-primary/75">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="flex flex-wrap gap-4 mb-6 px-1">
                      {project.tech?.map((t) => (
                        <div
                          key={t.name || Math.random()}
                          className="flex items-center justify-center transition-all duration-200 hover:scale-125"
                        >
                          <svg
                            role="img"
                            viewBox={t.icon.viewBox || "0 0 24 24"}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill={`#${t.icon.hex}`}
                          >
                            {t.icon.paths ? (
                              t.icon.paths.map((p, i) => (
                                <path key={i} d={p.d} fill={p.fill} />
                              ))
                            ) : (
                              <path d={t.icon.path} />
                            )}
                          </svg>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-primary/80 hover:text-primary transition-colors pl-1"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-primary/80 hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
