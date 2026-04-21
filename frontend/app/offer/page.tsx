import Link from 'next/link';

export const metadata = {
  title: 'Fast Website Setup | Arvin Jayson Castro',
  description: 'Professional websites for freelancers, small businesses, and professionals. Simple, clean, ready to go live. Built by a systems architect with 15+ years experience.',
};

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-slate-800 rounded-full text-sm font-medium text-slate-300 uppercase tracking-wide">
              Fast Website Setup
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            Simple. Clean.
            <span className="block text-indigo-400">Ready to go live.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            For freelancers, small businesses, and professionals who need a polished website quickly — with room to grow into dashboards and custom systems later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact-me"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
            >
              Message Me to Start
            </Link>
            <Link
              href="/posts"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              View Portfolio
            </Link>
          </div>
          <p className="text-sm text-slate-400">
            Built by a systems architect with 15+ years of experience.
          </p>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="px-6 py-16 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">1-Page Website</h3>
              <p className="text-slate-300">Clean, professional single-page design focused on your message and call-to-action.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Mobile-Friendly</h3>
              <p className="text-slate-300">Responsive design that looks great on all devices, from phones to desktops.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Polished Modern Design</h3>
              <p className="text-slate-300">Elegant typography, subtle animations, and professional styling.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Deployed Live</h3>
              <p className="text-slate-300">Hosted and ready to share with your audience immediately.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Fast Turnaround</h3>
              <p className="text-slate-300">From concept to live in 3-5 business days.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Direct Collaboration</h3>
              <p className="text-slate-300">Work directly with me for revisions and refinements.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-slate-400">Optional: Expand to multi-page sites or add custom features later.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
              <h3 className="text-2xl font-bold mb-4">Starter Page</h3>
              <div className="text-4xl font-black text-indigo-400 mb-4">₱5,000</div>
              <p className="text-slate-300 mb-6">Single page website with basic content and contact form.</p>
              <ul className="text-left text-slate-300 space-y-2">
                <li>• Professional design</li>
                <li>• Mobile responsive</li>
                <li>• Basic SEO setup</li>
                <li>• 3 rounds of revisions</li>
              </ul>
            </div>
            <div className="bg-slate-800 p-8 rounded-lg border-2 border-indigo-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Business Page</h3>
              <div className="text-4xl font-black text-indigo-400 mb-4">₱8,000</div>
              <p className="text-slate-300 mb-6">Enhanced single page with services, testimonials, and lead capture.</p>
              <ul className="text-left text-slate-300 space-y-2">
                <li>• Everything in Starter</li>
                <li>• Services section</li>
                <li>• Testimonials</li>
                <li>• Contact form integration</li>
                <li>• Analytics setup</li>
              </ul>
            </div>
            <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
              <h3 className="text-2xl font-bold mb-4">Website + Light Setup</h3>
              <div className="text-4xl font-black text-indigo-400 mb-4">₱12,000</div>
              <p className="text-slate-300 mb-6">Business page plus domain setup and basic email configuration.</p>
              <ul className="text-left text-slate-300 space-y-2">
                <li>• Everything in Business</li>
                <li>• Domain registration</li>
                <li>• Email setup</li>
                <li>• SSL certificate</li>
                <li>• Basic maintenance guide</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-slate-400">Rush delivery available for urgent projects. Payment plans can be arranged.</p>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="px-6 py-16 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Who This Is For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Small Businesses</h3>
              <p className="text-slate-300">Local shops, restaurants, and service providers needing an online presence.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Freelancers</h3>
              <p className="text-slate-300">Designers, writers, and consultants showcasing their work and services.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Consultants</h3>
              <p className="text-slate-300">Experts in various fields establishing credibility and attracting clients.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Creators</h3>
              <p className="text-slate-300">Artists, influencers, and content creators building their personal brand.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Personal Brands</h3>
              <p className="text-slate-300">Professionals and thought leaders creating a strong online identity.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Service Providers</h3>
              <p className="text-slate-300">Anyone offering services who needs a simple, effective online presence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Systems Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Need More Than a Website?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Start simple now. If your business grows, I can build more advanced systems later.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Admin Dashboards</h3>
              <p className="text-slate-400 text-sm">Manage your business data and operations efficiently.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Internal Tools</h3>
              <p className="text-slate-400 text-sm">Custom software for your team's specific workflows.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Client Systems</h3>
              <p className="text-slate-400 text-sm">Portals for your clients to access services or information.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">HR Systems</h3>
              <p className="text-slate-400 text-sm">Employee management, payroll, and HR automation.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Project Tracking</h3>
              <p className="text-slate-400 text-sm">Tools for managing projects, tasks, and team collaboration.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Custom Web Apps</h3>
              <p className="text-slate-400 text-sm">Tailored applications for your unique business needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Me Section */}
      <section className="px-6 py-16 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Work With Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-3">15+ Years Experience</h3>
              <p className="text-slate-300">Building production systems for startups and enterprises alike.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-3">Fullstack & Systems Thinking</h3>
              <p className="text-slate-300">Frontend, backend, databases, and deployment — I handle it all.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-3">Practical Delivery</h3>
              <p className="text-slate-300">Focus on what works in the real world, not just fancy features.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-3">Start Simple, Scale Later</h3>
              <p className="text-slate-300">Begin with what you need now, expand as your business grows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Send Your Needs</h3>
              <p className="text-slate-300">Share your content, goals, and any specific requirements.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Confirm Scope & Timeline</h3>
              <p className="text-slate-300">We agree on deliverables, timeline, and pricing.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Build & Launch</h3>
              <p className="text-slate-300">I develop, you review, we iterate, and go live quickly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Website Up Quickly?</h2>
          <p className="text-xl text-slate-300 mb-8">Let's build it and get it live.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-me"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
            >
              Message Me
            </Link>
            <a
              href="mailto:arvinjaysoncastro@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Email Me
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">How fast can you deliver?</h3>
              <p className="text-slate-300">Standard delivery is 3-5 business days. Rush projects can be completed in 1-2 days for an additional fee.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Can you build dashboards later?</h3>
              <p className="text-slate-300">Absolutely. Many clients start with a simple website and expand to custom systems as their business grows.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Do you help with deployment?</h3>
              <p className="text-slate-300">Yes, I handle hosting setup and deployment. Your site will be live and ready to share immediately.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">What do you need from me to start?</h3>
              <p className="text-slate-300">Your content (text, images, logo), brand colors if any, and details about what you want the site to achieve.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
