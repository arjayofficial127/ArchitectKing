import Link from 'next/link';

export const metadata = {
  title: 'Straightforward Website Setup | Arvin Jayson Castro',
  description: 'Simple websites for freelancers, small businesses, and professionals. Built, reviewed with you, and put online without unnecessary complexity.',
};

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-slate-800 rounded-full text-sm font-medium text-slate-300 uppercase tracking-wide">
              Small websites and useful web apps
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            A straightforward website,
            <span className="block text-indigo-400">built and put online.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            If you need a clear place to explain what you do and let people contact you, I can help you get it built without making the job bigger than it needs to be.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact-me"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
            >
              Message Me to Start
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              View Portfolio
            </Link>
          </div>
          <p className="text-sm text-slate-400">
            You work directly with me from the first conversation through launch.
          </p>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="px-6 py-16 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What I Can Take Care Of</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">A Clear One-Page Site</h3>
              <p className="text-slate-300">A simple page that explains what you do and gives people a clear way to respond.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Works on Phones and Desktops</h3>
              <p className="text-slate-300">A layout that remains readable and useful across common screen sizes.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">A Design That Fits the Business</h3>
              <p className="text-slate-300">Straightforward typography and styling based on your content and audience.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Hosting and Launch</h3>
              <p className="text-slate-300">I can handle the practical work needed to put the finished site online.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">A Short, Defined Job</h3>
              <p className="text-slate-300">Most small sites can be completed in 3–5 business days once the content is ready.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Direct Communication</h3>
              <p className="text-slate-300">You send feedback to me, and I make the changes.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-slate-400">If the job needs more pages or custom features, we can scope those separately.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Starting Points</h2>
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
                Common choice
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
          <p className="mt-8 text-slate-400">The final scope and price are agreed before I start. Urgent work depends on availability.</p>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="px-6 py-16 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Who This May Suit</h2>
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
              <p className="text-slate-300">People who need a clear place to explain their work and receive inquiries.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Creators</h3>
              <p className="text-slate-300">Artists and content creators who need a home for their work and links.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Personal Brands</h3>
              <p className="text-slate-300">Professionals who want one reliable place for their background and services.</p>
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
            If the real need is a workflow, portal, dashboard, or internal tool, we can talk about that instead of forcing it into a website.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Admin Dashboards</h3>
              <p className="text-slate-400 text-sm">A focused place to view and manage the information your team uses.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Internal Tools</h3>
              <p className="text-slate-400 text-sm">Small tools built around a workflow your team already understands.</p>
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
              <p className="text-slate-400 text-sm">An application shaped around a real business process and its users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Me Section */}
      <section className="px-6 py-16 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What Working With Me Is Like</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-3">16 Years Doing the Work</h3>
              <p className="text-slate-300">I have worked on small products, internal tools, and larger production systems.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-3">Comfortable Across the Stack</h3>
              <p className="text-slate-300">I can work through the interface, backend, data, integration, and deployment details.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-3">Practical Delivery</h3>
              <p className="text-slate-300">The goal is something useful and dependable, not a long list of features.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-3">Keep the First Step Sensible</h3>
              <p className="text-slate-300">We can build what is needed now and leave room for later without overbuilding.</p>
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
              <h3 className="text-xl font-semibold mb-3">Tell Me What You Need</h3>
              <p className="text-slate-300">Share the content, goal, deadline, and anything you are unsure about.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Confirm Scope & Timeline</h3>
              <p className="text-slate-300">We agree on deliverables, timeline, and pricing.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Build, Review, and Launch</h3>
              <p className="text-slate-300">I build it, you review it, and we make the agreed changes before launch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Something Online?</h2>
          <p className="text-xl text-slate-300 mb-8">Send me what you have. I&apos;ll tell you what I think the job involves.</p>
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
              <p className="text-slate-300">Yes. A simple website can stay simple while a separate dashboard or tool is added when there is a real need for it.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Do you help with deployment?</h3>
              <p className="text-slate-300">Yes. I can handle the hosting setup, deployment, and the checks needed before you share it.</p>
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
