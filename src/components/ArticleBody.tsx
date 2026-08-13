import type { Block, RichText } from "@/lib/articles";

function Rich({ parts }: { parts: RichText[] }) {
  return (
    <>
      {parts.map((r, i) => {
        let node: React.ReactNode = r.text;
        if (r.code)
          node = (
            <code key={i} className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em] text-zinc-800">
              {node}
            </code>
          );
        if (r.bold) node = <strong>{node}</strong>;
        if (r.italic) node = <em>{node}</em>;
        if (r.strike) node = <s>{node}</s>;
        if (r.href)
          node = (
            <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline-offset-2 hover:underline">
              {node}
            </a>
          );
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

// 정규화 Block[] → 사이트 톤(prose)으로 렌더
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose prose-zinc mx-auto mt-10 max-w-none prose-headings:tracking-tight prose-a:text-indigo-600 prose-pre:bg-zinc-900">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}><Rich parts={b.rich} /></p>;
          case "h2":
            return <h2 key={i}><Rich parts={b.rich} /></h2>;
          case "h3":
            return <h3 key={i}><Rich parts={b.rich} /></h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => <li key={j}><Rich parts={it} /></li>)}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => <li key={j}><Rich parts={it} /></li>)}
              </ol>
            );
          case "quote":
            return <blockquote key={i}><Rich parts={b.rich} /></blockquote>;
          case "code":
            return (
              <pre key={i}>
                <code>{b.text}</code>
              </pre>
            );
          case "img":
            return (
              <figure key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.url} alt={b.caption ?? ""} className="rounded-xl" />
                {b.caption && <figcaption>{b.caption}</figcaption>}
              </figure>
            );
          case "divider":
            return <hr key={i} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
