import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, articles } from '@/data/articles';

// Generate static params for all articles
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for each article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Alpha Mothers',
    };
  }

  return {
    title: `${article.title} | Alpha Mothers`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const categoryColors = {
    'Mental Health': {
      bg: 'bg-[var(--primary-50)]',
      text: 'text-[var(--primary)]',
      accent: 'var(--primary)',
    },
    'Return to Work': {
      bg: 'bg-[#FDF5ED]',
      text: 'text-[var(--secondary-dark)]',
      accent: 'var(--secondary-dark)',
    },
    'Raising Gen Alpha': {
      bg: 'bg-[var(--sage-mist)]',
      text: 'text-[var(--accent)]',
      accent: 'var(--accent)',
    },
    'Career & Leadership': {
      bg: 'bg-[var(--blush)]',
      text: 'text-[var(--primary)]',
      accent: 'var(--primary)',
    },
    'Vision': {
      bg: 'bg-[var(--primary-50)]',
      text: 'text-[var(--primary)]',
      accent: 'var(--primary)',
    },
  };

  const colors = categoryColors[article.category];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--cream)] to-[var(--blush)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary-light)] opacity-10 blob blob-animate" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center text-[var(--muted)] hover:text-[var(--primary)] transition-colors mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Insights
          </Link>

          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${colors.bg} ${colors.text}`}>
            {article.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-[var(--muted)] mb-6">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
            <span>{article.readTime}</span>
            <span>•</span>
            <span>By Shivi Agarwal</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <article className="article-content max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(/\n## /g, '<h2>')
                    .replace(/\n### /g, '<h3>')
                    .replace(/\n#### /g, '<h4>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n- /g, '<li>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/<li>/g, '</p><ul><li>')
                    .replace(/<\/li>\n(?!<li>)/g, '</li></ul><p>')
                    .split('</h2>').join('</h2><p>')
                    .split('</h3>').join('</h3><p>')
                    .split('</h4>').join('</h4><p>')
                }}
              />
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Key Takeaways */}
                <div className={`rounded-2xl p-6 ${colors.bg}`}>
                  <h3 className={`font-bold mb-4 ${colors.text}`}>Key Takeaways</h3>
                  <ul className="space-y-3">
                    {article.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--border)]">
                  <h3 className="font-bold text-[var(--foreground)] mb-2">Need More Support?</h3>
                  <p className="text-sm text-[var(--muted)] mb-4">
                    Get personalized guidance with the Alpha Mothers app.
                  </p>
                  <Link href="/app" className="btn-primary text-sm w-full text-center">
                    Try the App Free
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Mobile Key Takeaways */}
      <section className="lg:hidden py-8 bg-[var(--cream)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className={`rounded-2xl p-6 ${colors.bg}`}>
            <h3 className={`font-bold mb-4 ${colors.text}`}>Key Takeaways</h3>
            <ul className="space-y-3">
              {article.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                  <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">More from {article.category}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {articles
              .filter(a => a.category === article.category && a.slug !== article.slug)
              .slice(0, 3)
              .map((relatedArticle, index) => (
                <Link
                  key={index}
                  href={`/resources/${relatedArticle.slug}`}
                  className="card-elegant p-6 hover:border-[var(--primary)] border border-transparent transition-all"
                >
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-3 ${colors.bg} ${colors.text}`}>
                    {relatedArticle.readTime}
                  </span>
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">{relatedArticle.title}</h3>
                  <p className="text-sm text-[var(--muted)] line-clamp-2">{relatedArticle.excerpt}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want more insights like this?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join 5,000+ mothers getting evidence-based guidance every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-4 bg-white text-[var(--primary)] font-medium rounded-full hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
