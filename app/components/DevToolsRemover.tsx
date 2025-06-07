"use client";

import { useEffect } from 'react';

export function DevToolsRemover() {
  useEffect(() => {
    // Function to specifically find and remove the Next.js "N" marker
    const removeNMarker = () => {
      // Method 1: Direct element selection
      document.querySelectorAll('div').forEach(el => {
        if (el.textContent === 'N' && 
            (getComputedStyle(el).backgroundColor.includes('rgb(0, 0, 0)') ||
            getComputedStyle(el).backgroundColor.includes('rgb(51, 51, 51)'))) {
          (el as HTMLElement).style.display = 'none';
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      });

      // Method 2: Target the specific structure of Next.js dev tools
      const devContainer = document.querySelector('body > div:last-child');
      if (devContainer && devContainer.children.length === 1) {
        const child = devContainer.children[0];
        if (child.textContent === 'N') {
          (devContainer as HTMLElement).style.display = 'none';
          if (devContainer.parentNode) {
            devContainer.parentNode.removeChild(devContainer);
          }
        }
      }

      // Method 3: Target fixed position elements at bottom right (common for Next.js indicators)
      document.querySelectorAll('body > div').forEach(el => {
        const style = getComputedStyle(el);
        if (style.position === 'fixed' && 
            style.bottom === '10px' && 
            style.right === '10px') {
          (el as HTMLElement).style.display = 'none';
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      });

      // Method 4: Use mutation observer to catch newly added elements
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(node => {
              if (node.nodeType === 1) { // Element node
                const element = node as Element;
                if (element.textContent === 'N') {
                  (element as HTMLElement).setAttribute('style', 'display: none !important');
                  if (element.parentNode) {
                    element.parentNode.removeChild(element);
                  }
                }
              }
            });
          }
        });
      });

      // Start observing the body for changes
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });

      return observer;
    };

    // Call immediately and set up interval
    const observer = removeNMarker();
    const interval = setInterval(removeNMarker, 500);

    // Cleanup
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return null;
} 