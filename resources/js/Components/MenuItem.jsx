import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function MenuItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children?.length > 0;

  const handleClick = (e) => {
    if (hasChildren) {
      e.preventDefault(); // Отменяем переход по ссылке, чтобы переключить видимость
      setIsOpen(prev => !prev);
    }
  };

  return (
    <li className="relative">
      <Link
        href={item.href || '#'}
        onClick={handleClick}
        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <span>{item.title}</span>
        
        {hasChildren && (
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </Link>

      {hasChildren && isOpen && (
        <ul className="ml-4 mt-1 border-l-2 border-gray-200 pl-4 space-y-1">
          {item.children.map(child => (
            <MenuItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}