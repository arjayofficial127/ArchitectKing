export function TechStrip() {
  return (
    <section 
      className="relative w-full border-t border-b transition-all duration-400 ease-in-out" 
      style={{ 
        background: '#0f172a',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        transition: 'background 0.4s ease, border-color 0.3s ease, color 0.3s ease'
      }}
    >
      <div className="w-full px-6" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm md:text-base font-medium" style={{ letterSpacing: '0.5px', color: '#e2e8f0' }}>
            <span>Distributed Systems</span>
            <span style={{ color: '#94a3b8' }}>•</span>
            <span>High-scale Architectures</span>
            <span style={{ color: '#94a3b8' }}>•</span>
            <span>Reliability</span>
            <span style={{ color: '#94a3b8' }}>•</span>
            <span>Performance</span>
            <span style={{ color: '#94a3b8' }}>•</span>
            <span>Clean Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
}
