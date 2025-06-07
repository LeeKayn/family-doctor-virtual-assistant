"use client";

import { useEffect } from 'react';

// Add TypeScript declarations for these global properties
declare global {
  interface Window {
    // For React DevTools
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      renderers: Map<string, unknown>;
      [key: string]: unknown;
    };
    // For Redux DevTools
    __REDUX_DEVTOOLS_EXTENSION__?: unknown;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: unknown;
    // For browser dev tools
    devToolsEnabled?: boolean;
    // For Next.js - removing specific Next.js type definition 
    // as it's causing typescript conflicts
  }
}

export function DisableAllDevTools() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Disable React DevTools
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        if (prop === 'renderers') {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map();
        } else if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] === 'function') {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = () => {};
        }
      }
    }

    // 2. Disable Redux DevTools
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      window.__REDUX_DEVTOOLS_EXTENSION__ = undefined;
    }
    
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = undefined;
    }

    // 3. Override console methods in non-development environment
    if (process.env.NODE_ENV !== 'development') {
      // Override console methods to prevent logging in production
      console.log = () => {};
      console.debug = () => {};
      console.info = () => {};
      console.warn = () => {};
      console.error = () => {};
      
      // Keep error logging for critical issues but don't show details
      window.onerror = () => {
        // Return true to prevent the default error handling
        return true;
      };
    }

    // 4. Remove Next.js dev tools and indicators
    const removeNextDevTools = () => {
      // Find and remove dev indicator elements
      const devIndicators = document.querySelectorAll('[data-nextjs-dialog-overlay], [data-nextjs-dialog], [data-nextjs-toast], [data-nextjs-build-indicator]');
      devIndicators.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });

      // Find and remove any element with an N icon (Next.js debug elements)
      const allElems = document.body.querySelectorAll('*');
      allElems.forEach(elem => {
        // Check for elements with dark circular background that might contain 'N'
        if (elem.textContent === 'N' && 
            (window.getComputedStyle(elem).backgroundColor.includes('rgb(0, 0, 0)') ||
            window.getComputedStyle(elem).backgroundColor.includes('rgb(51, 51, 51)'))) {
          if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
          }
        }
      });
    };

    // Run removal immediately and set up an interval to keep checking
    removeNextDevTools();
    const interval = setInterval(removeNextDevTools, 1000);

    // 5. Block keyboard shortcuts that open dev tools
    const blockDevToolsShortcuts = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I or Command+Option+I
      if ((e.ctrlKey && e.shiftKey && e.key === 'I') || 
          (e.metaKey && e.altKey && e.key === 'i')) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+J or Command+Option+J
      if ((e.ctrlKey && e.shiftKey && e.key === 'J') || 
          (e.metaKey && e.altKey && e.key === 'j')) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+C or Command+Option+C
      if ((e.ctrlKey && e.shiftKey && e.key === 'C') || 
          (e.metaKey && e.altKey && e.key === 'c')) {
        e.preventDefault();
        return false;
      }
    };
    
    // Add event listener for keydown events
    document.addEventListener('keydown', blockDevToolsShortcuts);
    
    // Clean up function
    return () => {
      document.removeEventListener('keydown', blockDevToolsShortcuts);
      clearInterval(interval);
    };
  }, []);

  // This component doesn't render anything
  return null;
} 