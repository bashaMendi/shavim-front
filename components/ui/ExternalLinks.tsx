'use client';

import { ExternalLink, Globe } from 'lucide-react';
import { ExternalLink as ExternalLinkType } from '@/features/lectures/types';

interface ExternalLinksProps {
  links: ExternalLinkType[];
  className?: string;
}

export default function ExternalLinks({ links, className = '' }: ExternalLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">קישורים וכתבות נוספות</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 bg-white"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                    {link.title}
                  </h4>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  מקור: <span className="font-medium text-blue-600">{link.source}</span>
                </p>
                
                {link.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {link.description}
                  </p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}