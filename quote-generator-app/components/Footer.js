import React from 'react';

export default function Footer() {
  return (
    <footer className="py-6 text-center text-stone-400 text-sm">
      <p>© {new Date().getFullYear()} Quote Generator | Built with Next.js & ShadcN UI</p>
    </footer>
  );
}
