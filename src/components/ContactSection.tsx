import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Youtube, Phone, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { LegalModal } from './LegalModal';

export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [legalModal, setLegalModal] = useState<{ type: 'privacy' | 'terms' | null }>({ type: null });

  const PRIVACY_POLICY = `Privacy Policy

Your privacy is important to me. This Privacy Policy explains how I handle any information when you visit my portfolio.

1. Information Collection
I do not collect any personal data from visitors to this site unless you voluntarily provide it through the contact form (Name, Email, Message).

2. Use of Information
Any information provided through the contact form is used solely to respond to your inquiries and will never be shared with third parties.

3. Cookies
This site may use basic technical cookies to ensure the website functions correctly. No tracking or advertising cookies are used.

4. Third-Party Links
This site contains links to YouTube. Please be aware that YouTube has its own privacy policies which you should review when visiting their platform.`;

  const TERMS_OF_SERVICE = `Terms of Service

By accessing this portfolio, you agree to the following terms:

1. Intellectual Property
All video edits, graphics, and content displayed on this site are the intellectual property of MRFISHY.CC unless otherwise stated. Unauthorized use or reproduction is prohibited.

2. Usage License
You are granted a limited license to view the content for personal, non-commercial purposes.

3. Disclaimer
The content is provided "as is" without any warranties. I am not responsible for any issues arising from the use of this website.

4. External Content
Videos are hosted on YouTube. Your interaction with the video player is subject to YouTube's Terms of Service.`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter"
            >
              Let's create something <span className="text-accent italic">extraordinary</span> together.
            </motion.h2>
            
            <div className="space-y-6 text-white/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Mail className="w-5 h-5" />
                </div>
                <span>mrfishhasnoname@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Youtube className="w-5 h-5" />
                </div>
                <span>youtube.com/@MrFishyCC</span>
              </div>
            </div>
          </div>

          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 md:p-12 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Message</label>
              <textarea 
                rows={4} 
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none" 
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <button 
              disabled={status === 'loading'}
              className="w-full py-4 bg-accent text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-accent/80 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>

            {status === 'success' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-emerald-400 text-sm justify-center">
                <CheckCircle2 className="w-4 h-4" />
                <span>Message sent successfully!</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-rose-400 text-sm justify-center">
                <AlertCircle className="w-4 h-4" />
                <span>Failed to send message. Please try again.</span>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
      
      <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
        <p>© 2026 MRFISHY.CC. All rights reserved.</p>
        <div className="flex gap-8">
          <button 
            onClick={() => setLegalModal({ type: 'privacy' })}
            className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setLegalModal({ type: 'terms' })}
            className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold"
          >
            Terms of Service
          </button>
        </div>
      </div>

      <LegalModal
        isOpen={legalModal.type === 'privacy'}
        onClose={() => setLegalModal({ type: null })}
        title="Privacy Policy"
        content={PRIVACY_POLICY}
      />

      <LegalModal
        isOpen={legalModal.type === 'terms'}
        onClose={() => setLegalModal({ type: null })}
        title="Terms of Service"
        content={TERMS_OF_SERVICE}
      />
    </section>
  );
};
