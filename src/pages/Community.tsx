import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ThumbsUp, Share2, MessageCircle, ExternalLink } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import TiltCard from '../components/TiltCard';
import { CONTACT, FACEBOOK_POSTS } from '../data/site';

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

export default function Community() {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('stratosphere_likes');
      if (stored) {
        setLikedPosts(JSON.parse(stored));
      }
      const counts = localStorage.getItem('stratosphere_like_counts');
      if (counts) {
        setLikeCounts(JSON.parse(counts));
      }
    } catch {
      // localStorage may be blocked
    }
  }, []);

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = { ...prev, [postId]: !prev[postId] };
      try { localStorage.setItem('stratosphere_likes', JSON.stringify(next)); } catch {}
      return next;
    });
    setLikeCounts((prev) => {
      const isLiked = likedPosts[postId];
      const baseCount = prev[postId] ?? 0;
      const next = { ...prev, [postId]: Math.max(0, baseCount + (isLiked ? -1 : 1)) };
      try { localStorage.setItem('stratosphere_like_counts', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return (
    <Shell>
      <PageHead
        kicker="Our Facebook Community"
        title="Stratosphere Aeronautics Community"
        lede="Follow our latest posts, videos, and updates from our Facebook page. Like and share our content to help spread aviation education in Somaliland."
      />

      <Filings />

      {/* ── Facebook Page CTA ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="community-cta">
            <div className="community-cta__text">
              <span className="badge badge--blue" style={{ marginBottom: 12 }}>
                <FacebookIcon size={14} />
                Follow Us
              </span>
              <h2 className="title-md">Join Our Facebook Community</h2>
              <p className="desc-md" style={{ marginTop: 8 }}>
                Stay up to date with our latest training videos, student success stories,
                campus news, and aviation insights. Like our page to never miss an update.
              </p>
            </div>
            <div className="community-cta__actions">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary"
              >
                <FacebookIcon size={18} />
                Visit Our Facebook Page
                <ExternalLink size={15} />
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn--secondary"
              >
                Connect on LinkedIn
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Facebook Posts with Like Buttons ───────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Latest Posts</span>
            <h2 className="title-md">Our Facebook Posts.</h2>
            <p className="desc-md">
              Watch, like, and share our latest content. Click any post to view it directly on Facebook.
            </p>
          </div>

          <div className="community-posts-grid">
            {FACEBOOK_POSTS.map((post) => {
              const isLiked = likedPosts[post.id] ?? false;
              const likeCount = likeCounts[post.id] ?? 0;
              return (
                <TiltCard key={post.id} maxTilt={4} className="fb-post-card">
                  <div className="fb-post-card__header">
                    <div className="fb-post-card__page-info">
                      <div className="fb-post-card__avatar">
                        <img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" />
                      </div>
                      <div>
                        <b>Stratosphere Aeronautics</b>
                        <span>Facebook Post</span>
                      </div>
                    </div>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="fb-post-card__open-link"
                      aria-label="Open post on Facebook"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <div className="fb-post-card__embed">
                    <iframe
                      src={post.embedUrl}
                      title={post.title}
                      className="fb-post-card__frame"
                      scrolling="no"
                      frameBorder={0}
                      loading="lazy"
                    />
                  </div>

                  <div className="fb-post-card__actions">
                    <button
                      type="button"
                      className={`fb-like-btn ${isLiked ? 'is-liked' : ''}`}
                      onClick={() => toggleLike(post.id)}
                      aria-pressed={isLiked}
                      aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
                    >
                      <ThumbsUp size={16} />
                      <span>{isLiked ? 'Liked' : 'Like'}</span>
                      {likeCount > 0 && <span className="fb-like-btn__count">{likeCount}</span>}
                    </button>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="fb-action-btn"
                    >
                      <MessageCircle size={16} />
                      <span>Comment</span>
                    </a>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="fb-action-btn"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </a>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA to Enroll ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell" style={{ textAlign: 'center' }}>
          <h2 className="title-md" style={{ marginBottom: 12 }}>Inspired to Join Us?</h2>
          <p className="desc-md" style={{ maxWidth: 520, margin: '0 auto 28px' }}>
            Start your aviation career today. Enroll in one or more of our 34 training programs.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn--secondary">
              Enroll in the Master Course
              <ArrowRight size={16} />
            </Link>
            <Link to="/register" className="btn btn--primary btn--enroll-glow">
              Enroll Now
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
