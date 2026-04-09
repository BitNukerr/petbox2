import Link from "next/link";
import { journalPosts } from "@/data/products";

export default function JournalPage() {
  return (
    <section className="container section">
      <span className="eyebrow">Journal</span>
      <h1>Pet care notes and box inspiration</h1>
      <div className="grid two">
        {journalPosts.map((post) => (
          <Link href={`/journal/${post.slug}`} key={post.slug} className="card journal-card">
            <div className="card-body">
              <span className="tag">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
