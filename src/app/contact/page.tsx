"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl"), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-8 w-8 border-2 border-accent border-t-transparent"></div></div>
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const [globeError, setGlobeError] = useState(false);
  const globeEl = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobeLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-surface/20">
      {/* Mobile Hero Section */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center md:hidden">
        {/* Mobile Background Globe */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[120vh] w-[120vw] opacity-30 light-mode-globe">
            {/* Loading State */}
            {!globeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
                  <p className="text-sm text-muted">Loading globe...</p>
                </div>
              </div>
            )}
            
            {/* Globe Container */}
            <div className={`transition-opacity duration-500 ${globeLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {globeError ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-body">Lahore, Pakistan</h3>
                      <p className="text-sm text-muted">Our Global Headquarters</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Globe
                  ref={globeEl}
                  width={800}
                  height={800}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  backgroundColor="rgba(0,0,0,0)"
                  showAtmosphere={false}
                  showGraticules={true}
                  onGlobeReady={() => {
                    if (globeEl.current) {
                      globeEl.current.pointOfView({ lat: 24.8607, lng: 67.0011, altitude: 2.5 });
                      // Enable user interactions
                      const controls = globeEl.current.controls();
                      controls.enableDamping = true;
                      controls.dampingFactor = 0.05;
                      controls.enableZoom = true;
                      controls.enablePan = true;
                      controls.autoRotate = true;
                      controls.autoRotateSpeed = 0.8;
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg/80 via-bg/60 to-bg/80 pointer-events-none" />

        {/* Mobile Centered Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-body sm:text-4xl">
            Let's <span className="text-[var(--accent)]">Connect</span> & Create
          </h1>
          <p className="mx-auto mt-6 max-w-sm text-lg text-gray-900 dark:text-white leading-relaxed">
            Ready to transform your ideas into reality? We're here to make it happen.
          </p>
          
          {/* Mobile Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 justify-center items-center">
            <button className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer">
              Get in Touch
            </button>
            <button className="w-full max-w-xs px-6 py-3 bg-transparent border-2 border-[var(--accent)] text-[var(--accent)] font-semibold rounded-lg hover:bg-[var(--accent)] hover:text-white transition-all duration-200 cursor-pointer">
              Explore Services
            </button>
          </div>
        </div>

        {/* Mobile Scroll Arrow */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={() => {
              document.getElementById('contact-form')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
            className="group flex flex-col items-center space-y-2 text-[var(--accent)] hover:text-[var(--accent)]/80 transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-surface/30 backdrop-blur-lg border border-ui/30 flex items-center justify-center group-hover:bg-[var(--accent)]/20 group-hover:border-[var(--accent)]/30 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <svg 
                className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300 animate-bounce" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{ animationDuration: '2s' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              Scroll to Form
            </span>
          </button>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] hidden md:flex items-center">
        {/* Background Globe */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[170vh] w-[170vw] opacity-30 light-mode-globe">
            {/* Loading State */}
            {!globeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
                  <p className="text-sm text-muted">Loading globe...</p>
                </div>
              </div>
            )}
            
            {/* Globe Container */}
            <div className={`transition-opacity duration-500 ${globeLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {globeError ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-body">Lahore, Pakistan</h3>
                      <p className="text-sm text-muted">Our Global Headquarters</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Globe
                  ref={globeEl}
                  width={1600}
                  height={1600}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  backgroundColor="rgba(0,0,0,0)"
                  showAtmosphere={false}
                  showGraticules={true}
                  onGlobeReady={() => {
                    if (globeEl.current) {
                      globeEl.current.pointOfView({ lat: 24.8607, lng: 67.0011, altitude: 2.5 });
                      // Enable user interactions
                      const controls = globeEl.current.controls();
                      controls.enableDamping = true;
                      controls.dampingFactor = 0.05;
                      controls.enableZoom = true;
                      controls.enablePan = true;
                      controls.autoRotate = true;
                      controls.autoRotateSpeed = 0.8;
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg/80 via-bg/60 to-bg/80 pointer-events-none" />

        {/* Centered Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-body sm:text-6xl lg:text-7xl">
            Let's <span className="text-[var(--accent)]">Connect</span> & Create
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-900 dark:text-white leading-relaxed">
            Ready to transform your ideas into reality? Whether you're looking to collaborate, 
            explore our services, or simply have a chat, we're here to make it happen.
          </p>
          
          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer">
              Get in Touch
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[var(--accent)] text-[var(--accent)] font-semibold rounded-lg hover:bg-[var(--accent)] hover:text-white transition-all duration-200 cursor-pointer">
              Explore Services
            </button>
          </div>
        </div>

        {/* Scroll Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={() => {
              document.getElementById('contact-form')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
            className="group flex flex-col items-center space-y-3 text-[var(--accent)] hover:text-[var(--accent)]/80 transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-surface/30 backdrop-blur-lg border border-ui/30 flex items-center justify-center group-hover:bg-[var(--accent)]/20 group-hover:border-[var(--accent)]/30 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <svg 
                className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300 animate-bounce" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{ animationDuration: '2s' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              Scroll to Form
            </span>
          </button>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-8  sm:py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div id="contact-form" className="space-y-6 md:space-y-8 rounded-2xl bg-surface/20 backdrop-blur-md border-2 border-[var(--accent)]/30 p-6 md:p-8 shadow-2xl shadow-[var(--accent)]/20">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-body">Send us a message</h2>
                <p className="mt-2 text-sm md:text-base text-muted">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-body mb-2">
                      Full Name *
                    </label>
                     <input
                       type="text"
                       id="name"
                       name="name"
                       required
                       value={formData.name}
                       onChange={handleChange}
                       className="w-full rounded-lg bg-surface/20 backdrop-blur-sm border border-[var(--accent)]/20 px-4 py-3 text-body placeholder-muted focus:bg-surface/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:shadow-xl focus:shadow-[var(--accent)]/30 focus:border-[var(--accent)]/50 transition-all duration-200 shadow-lg hover:shadow-xl hover:border-[var(--accent)]/30"
                       placeholder="Your full name"
                     />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-body mb-2">
                      Email Address *
                    </label>
                     <input
                       type="email"
                       id="email"
                       name="email"
                       required
                       value={formData.email}
                       onChange={handleChange}
                       className="w-full rounded-lg bg-surface/20 backdrop-blur-sm border border-[var(--accent)]/20 px-4 py-3 text-body placeholder-muted focus:bg-surface/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:shadow-xl focus:shadow-[var(--accent)]/30 focus:border-[var(--accent)]/50 transition-all duration-200 shadow-lg hover:shadow-xl hover:border-[var(--accent)]/30"
                       placeholder="your@email.com"
                     />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-body mb-2">
                    Subject *
                  </label>
                   <input
                     type="text"
                     id="subject"
                     name="subject"
                     required
                     value={formData.subject}
                     onChange={handleChange}
                     className="w-full rounded-lg bg-surface/20 backdrop-blur-sm border border-[var(--accent)]/20 px-4 py-3 text-body placeholder-muted focus:bg-surface/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:shadow-xl focus:shadow-[var(--accent)]/30 focus:border-[var(--accent)]/50 transition-all duration-200 shadow-lg hover:shadow-xl hover:border-[var(--accent)]/30"
                     placeholder="What's this about?"
                   />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-body mb-2">
                    Message *
                  </label>
                   <textarea
                     id="message"
                     name="message"
                     required
                     rows={6}
                     value={formData.message}
                     onChange={handleChange}
                     className="w-full rounded-lg bg-surface/20 backdrop-blur-sm border border-[var(--accent)]/20 px-4 py-3 text-body placeholder-muted focus:bg-surface/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:shadow-xl focus:shadow-[var(--accent)]/30 focus:border-[var(--accent)]/50 transition-all duration-200 resize-none shadow-lg hover:shadow-xl hover:border-[var(--accent)]/30"
                     placeholder="Tell us more about your project or question..."
                   />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/90 px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl shadow-[var(--accent)]/30 hover:shadow-[var(--accent)]/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm">We'll get back to you soon.</p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 md:space-y-8 rounded-2xl bg-surface/20 backdrop-blur-md border-2 border-[var(--accent)]/30 p-6 md:p-8 shadow-xl shadow-[var(--accent)]/20">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-body">Get in Touch</h2>
                <p className="mt-2 text-sm md:text-base text-muted">
                  We're based in Lahore, Pakistan, but serve clients worldwide.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-body">Address</h3>
                    <p className="text-muted">
                      Lahore, Pakistan<br />
                      Sindh Province, 75000
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-body">Email</h3>
                    <p className="text-muted">hello@blogsquare.com</p>
                  </div>
                </div>

                {/* Map Section */}
                <div className="mt-6 md:mt-8">
                  <h3 className="font-medium text-body mb-3 md:mb-4 flex items-center text-sm md:text-base">
                    <svg className="h-4 w-4 md:h-5 md:w-5 text-[var(--accent)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Our Location
                  </h3>
                  <div className="relative rounded-xl overflow-hidden border-2 border-[var(--accent)]/30 shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.6470734764897!2d74.35874731513147!3d31.520369681392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s&output=embed"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-48 md:h-64"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12  sm:py-16 md:pb-12 bg-gradient-to-br from-surface/5 via-transparent to-surface/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-body mb-4">Frequently Asked Questions</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-muted max-w-2xl mx-auto">Quick answers to common questions about our services and processes</p>
          </div>
          
          {/* FAQ Grid */}
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {/* FAQ Item 1 */}
            <div className="group">
              <div className="rounded-2xl bg-gradient-to-br from-surface/30 via-surface/20 to-surface/10 backdrop-blur-xl border-2 border-[var(--accent)]/20 p-6 md:p-8 shadow-xl hover:shadow-2xl hover:border-[var(--accent)]/40 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-body mb-2 md:mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">How quickly do you respond?</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-muted leading-relaxed">We typically respond to all inquiries within 24 hours during business days. For urgent matters, we offer priority support with same-day responses.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="group">
              <div className="rounded-2xl bg-gradient-to-br from-surface/30 via-surface/20 to-surface/10 backdrop-blur-xl border-2 border-[var(--accent)]/20 p-6 md:p-8 shadow-xl hover:shadow-2xl hover:border-[var(--accent)]/40 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-body mb-2 md:mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">Do you offer custom solutions?</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-muted leading-relaxed">Yes! We specialize in creating custom blogging solutions tailored to your specific needs. From unique designs to advanced functionality, we bring your vision to life.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="group">
              <div className="rounded-2xl bg-gradient-to-br from-surface/30 via-surface/20 to-surface/10 backdrop-blur-xl border-2 border-[var(--accent)]/20 p-6 md:p-8 shadow-xl hover:shadow-2xl hover:border-[var(--accent)]/40 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-body mb-2 md:mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">What are your business hours?</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-muted leading-relaxed">We're available Monday-Friday 9 AM-6 PM and Saturday 10 AM-4 PM (Pakistan Standard Time). We also offer emergency support for critical issues.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="group">
              <div className="rounded-2xl bg-gradient-to-br from-surface/30 via-surface/20 to-surface/10 backdrop-blur-xl border-2 border-[var(--accent)]/20 p-6 md:p-8 shadow-xl hover:shadow-2xl hover:border-[var(--accent)]/40 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-body mb-2 md:mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">Can I schedule a call?</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-muted leading-relaxed">Absolutely! Mention your preferred time in your message and we'll arrange a call. We also offer video consultations for complex projects.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="inline-flex items-center space-x-2 text-[var(--accent)] font-semibold text-sm md:text-base">
              <span className="cursor-pointer">Still have questions?</span>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-muted">Chat with your personal assistant.</p>
          </div>
        </div>
    </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-surface/10 via-surface/5 to-surface/10 border-t border-[var(--accent)]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-muted">
              © 2025 Muhammad Kamran. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


