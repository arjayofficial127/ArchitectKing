export function CTASection() {
  return (
    <section id="contact" className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Ready to Build Systems That Scale?
          </h2>
          <p className="mt-6 text-xl text-teal-50">
            Let&apos;s discuss how architecture-first thinking can accelerate your product development 
            and create sustainable technical leverage.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:arvinjaysoncastro@gmail.com?subject=Architecture%20Call%20Request&body=Hi%20Arvin%2C%0A%0AI'd%20like%20to%20schedule%20a%2020-minute%20architecture%20call%20to%20discuss%20[your%20project%2Frole].%0A%0ABest%2C"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-teal-700 shadow-xl transition-all hover:bg-teal-50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-700"
            >
              Book a 20-Min Architecture Call
            </a>
            <a
              href="/pdf/ARVIN_JAYSON_CASTRO_Senior_Full-Stack_Engineer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-700"
            >
              Download Resume
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-teal-50">
            <a
              href="mailto:arvinjaysoncastro@gmail.com"
              className="hover:text-white transition-colors"
            >
              arvinjaysoncastro@gmail.com
            </a>
            <span className="text-teal-300">•</span>
            <a
              href="https://linkedin.com/in/arvinjaysoncastro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-teal-300">•</span>
            <a
              href="https://www.github.com/arvinjaysoncastro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Calendly placeholder - ready for integration */}
          <div className="mt-12">
            <p className="text-sm text-teal-100">
              Prefer to schedule directly?{' '}
              <span className="text-teal-50 font-medium">
                Calendly integration coming soon
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
