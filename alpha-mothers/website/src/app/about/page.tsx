import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--cream)] to-[var(--blush)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary-light)] opacity-10 blob blob-animate" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
            About Alpha Mothers
          </h1>
          <p className="text-xl text-[var(--muted)] leading-relaxed">
            A space for Millennial moms navigating career, motherhood, and raising kids in the AI age.
          </p>
        </div>
      </section>

      {/* My Story */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/WhatsApp Image 2026-01-14 at 01.14.12.jpeg"
                  alt="Shivi Agarwal"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Intro */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                Hi, I&apos;m Shivi
              </h2>
              <p className="text-xl text-[var(--muted)] leading-relaxed">
                A Millennial mom, career woman, and the founder of Alpha Mothers.
                I&apos;m here because I believe we shouldn&apos;t have to navigate
                this journey alone.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-lg text-[var(--muted)] leading-relaxed max-w-3xl mx-auto">
            <p>
              I remember the day I met a new mom returning to work after mat leave. It took me right
              back to my own experience two years ago—that mix of emotions. Excitement. Nervousness.
              And this overwhelming urge to prove I could still &quot;do it all.&quot;
            </p>

            <p>
              Being a career-oriented, high-achieving Millennial mom is <em>a lot</em>. We&apos;re
              the generation that was told we could have it all, and now we&apos;re discovering
              that &quot;having it all&quot; often means carrying it all—the career ambitions, the
              parenting guilt, the mental load, and now the pressure to prepare our kids for an
              AI-driven future we can barely imagine ourselves.
            </p>

            <p>
              I created Alpha Mothers because I needed a space like this. A place where we can be
              honest about how hard this is, without pretending we have it all figured out. A place
              to explore the questions that keep us up at 3am: Am I doing enough? Am I present enough?
              Am I preparing my kids for a world that&apos;s changing faster than I can keep up with?
            </p>

            <p className="text-[var(--foreground)] font-medium">
              I believe in the right to seek a better quality of life in the name of balance,
              self-esteem, and personal growth.
            </p>

            <p>
              That doesn&apos;t mean perfection. It means permission—to struggle, to question, to
              figure it out as we go. Together.
            </p>
          </div>
        </div>
      </section>

      {/* What I Write About */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-12 text-center">
            What I explore here
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Mental Health</h3>
              <p className="text-[var(--muted)]">
                The anxiety, the guilt, the identity shifts that come with motherhood. The stuff
                we don&apos;t always talk about but desperately need to.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Career & Work</h3>
              <p className="text-[var(--muted)]">
                Returning to work after leave. Navigating ambition alongside caregiving. Finding
                your worth when you feel like you&apos;re failing at both.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Raising Gen Alpha</h3>
              <p className="text-[var(--muted)]">
                Our kids are growing up as the first &quot;AI natives.&quot; How do we prepare them for
                a future we can&apos;t predict? How do we raise humans in an AI world?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Name */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">
            Why &quot;Alpha Mothers&quot;?
          </h2>

          <div className="space-y-6 text-lg text-[var(--muted)] leading-relaxed">
            <p>
              Our children are Generation Alpha—the first generation born entirely in the 21st century,
              growing up with AI as a natural part of their world.
            </p>

            <p>
              And we&apos;re their mothers. Millennial women who came of age in the digital revolution
              and are now raising kids through the AI revolution. We&apos;re navigating something unprecedented.
            </p>

            <p>
              &quot;Alpha&quot; isn&apos;t about being the best or the most dominant. It&apos;s about being
              at the forefront of a new era of motherhood—one that looks nothing like our mothers&apos;
              experience, and one we&apos;re figuring out in real time.
            </p>
          </div>
        </div>
      </section>

      {/* My Approach */}
      <section className="py-20 bg-[var(--blush)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">
            My approach
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Honest, not perfect</h3>
              <p className="text-[var(--muted)]">
                I don&apos;t have all the answers. I&apos;m figuring this out too. What I can offer is
                honesty about the struggle and a willingness to explore the hard questions together.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Questions over answers</h3>
              <p className="text-[var(--muted)]">
                The most helpful thing I&apos;ve found isn&apos;t someone telling me what to do—it&apos;s
                having space to think through what matters to me. I try to create that space here.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Community over isolation</h3>
              <p className="text-[var(--muted)]">
                Motherhood can be isolating, especially when you&apos;re also trying to maintain a career.
                Knowing you&apos;re not alone in your struggles makes them more bearable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
            Let&apos;s connect
          </h2>
          <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
            If any of this resonates with you, I&apos;d love to hear from you.
            Read the blog, reach out, or explore coaching if you want to dive deeper.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resources" className="btn-primary">
              Read the Blog
            </Link>
            <Link href="/community" className="btn-secondary">
              Join the Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
