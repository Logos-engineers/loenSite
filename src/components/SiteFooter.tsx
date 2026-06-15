import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 text-zinc-500">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-14 text-sm sm:flex-row sm:items-center sm:justify-between sm:py-10">
        <p>
          © {site.name} — {site.tagline}
        </p>
        <div className="flex gap-4">
          <a href={`mailto:${site.contactEmail}`} className="hover:text-zinc-900">
            문의
          </a>
          <a href={site.githubUrl} className="hover:text-zinc-900">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
