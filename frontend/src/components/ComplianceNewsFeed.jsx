import { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './atoms/card';
import { Badge } from './atoms/badge';
import { FileText, AlertCircle, CheckCircle, TrendingUp, ExternalLink } from 'lucide-react';

const ComplianceNewsFeed = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log('Fetching news from API...');
        const response = await fetch('http://localhost:8000/api/news/articles/');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        // Handle paginated response
        const articles = data.results || data;

        if (!articles || articles.length === 0) {
          console.warn('No articles returned from API');
          setNewsItems([]);
          setLoading(false);
          return;
        }

        // Map API data to component format
        const formattedNews = articles.map(article => ({
          id: article.id,
          title: article.title,
          source: article.source,
          sourceUrl: article.source_url,
          date: article.time_ago,
          type: article.article_type || 'standard',
          framework: article.framework || 'AI Governance',
          summary: article.summary || '',
          url: article.url,
          icon: getIconForType(article.article_type),
          color: getColorForType(article.article_type),
          bgColor: getBgColorForType(article.article_type),
        }));

        console.log('Formatted news items:', formattedNews.length);
        setNewsItems(formattedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getIconForType = (type) => {
    switch (type) {
      case 'regulation': return AlertCircle;
      case 'framework': return CheckCircle;
      case 'guidance': return TrendingUp;
      default: return FileText;
    }
  };

  const getColorForType = (type) => {
    switch (type) {
      case 'regulation': return 'text-fill-information-error';
      case 'framework': return 'text-fill-information-success';
      case 'guidance': return 'text-fill-information-warning';
      default: return 'text-fill-brand-primary';
    }
  };

  const getBgColorForType = (type) => {
    switch (type) {
      case 'regulation': return 'bg-fill-information-error/10';
      case 'framework': return 'bg-fill-information-success/10';
      case 'guidance': return 'bg-fill-information-warning/10';
      default: return 'bg-fill-brand-primary-transparent';
    }
  };

  // Fallback mock news data
  const getMockNews = () => [
    {
      id: 1,
      title: 'EU AI Act Enforcement Timeline Clarified for High-Risk Systems',
      source: 'IAPP',
      sourceUrl: 'https://iapp.org',
      date: '2 hours ago',
      type: 'regulation',
      framework: 'EU AI Act',
      summary: 'The European Data Protection Board releases detailed guidance on AI Act compliance timelines, with high-risk AI systems requiring full compliance by August 2026.',
      url: 'https://iapp.org/news/a/eu-ai-act-enforcement-timeline/',
      icon: AlertCircle,
      color: 'text-fill-information-error',
      bgColor: 'bg-fill-information-error/10',
    },
    {
      id: 2,
      title: 'NIST Releases Generative AI Risk Profile for Enterprise Adoption',
      source: 'CISO Series',
      sourceUrl: 'https://cisoseries.com',
      date: '30 min ago',
      type: 'framework',
      framework: 'NIST AI RMF',
      summary: 'NIST publishes comprehensive risk profile addressing unique challenges of generative AI deployment in enterprise environments, including prompt injection and model hallucination risks.',
      url: 'https://cisoseries.com/nist-generative-ai-risk-profile/',
      icon: CheckCircle,
      color: 'text-fill-information-success',
      bgColor: 'bg-fill-information-success/10',
    },
    {
      id: 3,
      title: 'ISO 42001 Adoption Surges Among Fortune 500 Companies',
      source: 'GRC World Forums',
      sourceUrl: 'https://grcworldforums.com',
      date: '4 hours ago',
      type: 'standard',
      framework: 'ISO 42001',
      summary: 'New survey reveals 67% of Fortune 500 companies are pursuing ISO 42001 certification for AI management systems, driven by regulatory pressure and stakeholder demands.',
      url: 'https://grcworldforums.com/iso-42001-adoption-trends/',
      icon: FileText,
      color: 'text-fill-brand-primary',
      bgColor: 'bg-fill-brand-primary-transparent',
    },
    {
      id: 4,
      title: 'UK ICO Issues First AI Governance Enforcement Action',
      source: 'Compliance Week',
      sourceUrl: 'https://complianceweek.com',
      date: '6 hours ago',
      type: 'regulation',
      framework: 'UK GDPR',
      summary: 'Information Commissioner\'s Office takes enforcement action against company for inadequate AI impact assessments, setting precedent for AI governance compliance.',
      url: 'https://complianceweek.com/uk-ico-ai-enforcement/',
      icon: AlertCircle,
      color: 'text-fill-information-error',
      bgColor: 'bg-fill-information-error/10',
    },
    {
      id: 5,
      title: 'SEC Proposes AI Risk Disclosure Requirements for Public Companies',
      source: 'AI Governance Institute',
      sourceUrl: 'https://aigovernance.org',
      date: '1 day ago',
      type: 'regulation',
      framework: 'SEC Disclosure',
      summary: 'Securities and Exchange Commission proposes new rules requiring public companies to disclose material AI-related risks in 10-K and 10-Q filings.',
      url: 'https://aigovernance.org/sec-ai-disclosure-rules/',
      icon: TrendingUp,
      color: 'text-fill-information-warning',
      bgColor: 'bg-fill-information-warning/10',
    },
    {
      id: 6,
      title: 'EDPB Guidelines on AI Transparency and Explainability Published',
      source: 'IAPP',
      sourceUrl: 'https://iapp.org',
      date: '1 day ago',
      type: 'guidance',
      framework: 'GDPR',
      summary: 'European Data Protection Board releases comprehensive guidelines on transparency obligations for AI systems under GDPR, with practical implementation examples.',
      url: 'https://iapp.org/news/a/edpb-ai-transparency-guidelines/',
      icon: CheckCircle,
      color: 'text-fill-information-success',
      bgColor: 'bg-fill-information-success/10',
    },
    {
      id: 7,
      title: 'NIST AI Safety Institute Launches Testing Framework',
      source: 'CISO Series',
      sourceUrl: 'https://cisoseries.com',
      date: '2 days ago',
      type: 'framework',
      framework: 'NIST AISI',
      summary: 'New testing framework provides standardized approach for evaluating AI system safety, security, and trustworthiness before deployment.',
      url: 'https://cisoseries.com/nist-ai-testing-framework/',
      icon: FileText,
      color: 'text-fill-brand-primary',
      bgColor: 'bg-fill-brand-primary-transparent',
    },
    {
      id: 8,
      title: 'California Passes Comprehensive AI Accountability Act',
      source: 'Compliance Week',
      sourceUrl: 'https://complianceweek.com',
      date: '3 days ago',
      type: 'regulation',
      framework: 'California SB 1047',
      summary: 'California legislature passes SB 1047 requiring algorithmic impact assessments and third-party audits for high-risk AI systems deployed in the state.',
      url: 'https://complianceweek.com/california-ai-accountability-act/',
      icon: AlertCircle,
      color: 'text-fill-information-error',
      bgColor: 'bg-fill-information-error/10',
    },
  ];

  // Duplicate items for seamless loop
  const allItems = [...newsItems, ...newsItems];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // Reset to start when we've scrolled through one set of items
      if (scrollPosition >= scrollContainer.scrollHeight / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollTop = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[16px]">📰</span>
            <CardTitle className="text-[13px] font-[600] text-[rgb(26,32,44)]">Compliance News Feed</CardTitle>
          </div>
          <Badge variant="outline" className="text-[9px] px-2 py-0.5">
            Live
          </Badge>
        </div>
        <p className="text-[11px] text-text-base-tertiary mt-1">
          Latest AI governance updates from trusted sources
        </p>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden relative">
        <div
          ref={scrollRef}
          className="h-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="space-y-[12px]">
            {allItems.map((item, index) => (
              <a
                key={`${item.id}-${index}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-[14px] bg-fill-base-1 rounded-[10px] hover:bg-fill-base-2 transition-colors border-l-[3px] border-transparent hover:border-fill-brand-primary group"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${item.bgColor} flex-shrink-0`}>
                    <item.icon className={item.color} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-[6px]">
                      <h4 className="text-[13px] font-[600] text-text-base-primary leading-tight group-hover:text-fill-brand-primary transition-colors">
                        {item.title}
                      </h4>
                      <ExternalLink className="text-text-base-tertiary group-hover:text-fill-brand-primary transition-colors flex-shrink-0" size={12} />
                    </div>
                    <p className="text-[11px] text-text-base-secondary leading-relaxed mb-[8px]">
                      {item.summary}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-[9px] px-2 py-0.5">
                        {item.framework}
                      </Badge>
                      <span className="text-[10px] text-text-base-tertiary">{item.source}</span>
                      <span className="text-text-base-tertiary">•</span>
                      <span className="text-[12px] font-[600] text-text-base-tertiary">{item.date}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </CardContent>
    </Card>
  );
};

export default ComplianceNewsFeed;
