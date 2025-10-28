 import {
  useEffect,
  useRef
} from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Code2,
  Users,
  Zap,
  Trophy,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import {
  ScrollTrigger
} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Hero section animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out'
        }
      });
      tl.from('.hero-heading', {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: 'back.out(1.7)'
        })
        .from('.hero-subtitle', {
          opacity: 0,
          y: 30,
          duration: 0.8
        }, '-=0.5')
        .from('.hero-button', {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 0.8
        }, '-=0.3');

      // Features scroll animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out'
      });

      // Stats counter animation
      const stats = document.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.to(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            once: true
          },
          innerText: target,
          duration: 2,
          snap: {
            innerText: 1
          },
          ease: 'power1.out',
          onUpdate: function() {
            stat.innerText = Math.floor(stat.innerText).toLocaleString();
          }
        });
      });

      // CTA button pulse
      gsap.to('.cta-button', {
        scale: 1.05,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [{
    icon: < Users className = "h-8 w-8" / > ,
    title: 'Real-Time Collaboration',
    description: 'Code together with developers solving the same problems. Share knowle'
  }, {
    icon: < Code2 className = "h-8 w-8" / > ,
    title: 'Interactive Code Editor',
    description: 'Monaco-powered editor with syntax highlighting, auto-completion, and'
  }, {
    icon: < Zap className = "h-8 w-8" / > ,
    title: 'Instant Feedback',
    description: 'Run test cases and get immediate results with detailed execution met'
  }, {
    icon: < Trophy className = "h-8 w-8" / > ,
    title: 'Track Progress',
    description: 'Earn achievements, track your growth, and climb the leaderboard.'
  }];

  const stats = [{
    label: 'Active Users',
    value: 15000,
    suffix: '+'
  }, {
    label: 'Problems Solved',
    value: 250000,
    suffix: '+'
  }, {
    label: 'Lines of Code',
    value: 5000000,
    suffix: '+'
  }, {
    label: 'Success Rate',
    value: 94,
    suffix: '%'
  }];

  return (
    <div>
      {
      /* Hero Section */
      }
      <section ref={heroRef} className="relative overflow-hidden">
        <div>
          <div>
            <h1 className="hero-heading">
              Master Coding Through
              <span> Collaboration</span>
            </h1>
            <p className="hero-subtitle">
              Connect with developers, solve problems together, and accelerate your learr
            </p>
            <div>
              <Link to="/signup" className="hero-button btn-primary inline-flex items-center justify-cente">
                Start Coding
                <ArrowRight className="m1-2 h-5 w-5" />
              </Link>
              <Link to="/problems" className="hero-button btn-secondary inline-flex items-center justify-cer">
                Explore Problems
              </Link>
            </div>
          </div>
        </div>
        {
        /* Decorative background */
        }
        <div>
          <div></div>
          <div></div>
        </div>
      </section>

      {
      /* Features Section */
      }
      <section ref={featuresRef} className="features-section py-20 bg-gray-50 dark:bg-">
        <div>
          <div>
            <h2>
              Why Choose Code Arena?
            </h2>
            <p>
              Everything you need to become a better developer
            </p>
          </div>
          <div>
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div>
                  {feature.icon}
                </div>
                <h3>
                  {feature.title}
                </h3>
                <p>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {
      /* Stats Section */
      }
      <section ref={statsRef} className="py-20">
        <div>
          <div>
            {stats.map((stat, index) => (
              <div key={index}>
                <div data-target={stat.value} className="stat-number">
                  <span>0</span>
                  {stat.suffix}
                </div>
                <div>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {
      /* CTA Section */
      }
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div>
          <h2>
            Ready to Level Up?
          </h2>
          <p>
            Join thousands of developers improving their skills through collaborative coc
          </p>
          <Link to="/signup" className="cta-button inline-flex items-center justify-center px-8 py-3 text-">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
