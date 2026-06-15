import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "제품" };

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">제품</h1>
      <p className="mt-3 text-zinc-600">우리가 만들고 운영하는 서비스들.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
          >
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-lg font-medium text-zinc-900">{p.name}</h2>
              {p.status === "beta" && (
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-600">
                  베타
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-600">{p.oneLiner}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
