import { usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import MenuItem from '@/Components/MenuItem';
import CitySelector from '@/Components/CitySelector';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export default function AppLayout({ children }) {
  const { menuTree, flash } = usePage().props;
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    console.log('🟢 AppLayout MOUNTED');
    return () => console.log('🔴 AppLayout UNMOUNTED');
  }, []);

  useEffect(() => {
    setIsVisible(true);
    if (flash?.success?.message) {
      Toast.fire({ icon: 'success', title: flash.success.message });
    }
    if (flash?.error?.message) {
      Toast.fire({ icon: 'error', title: flash.error.message });
    }
    const timer = setTimeout(() => setIsVisible(false), 3000); 
    return () => clearTimeout(timer);
  }, [flash?.success?.id, flash?.error?.id]);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-1/5 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <CitySelector key="city-selector" />
          <h1 className="text-lg font-bold text-gray-800">Навигация</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {(menuTree || []).map(item => (
                <MenuItem key={item.id} item={item} />
              ))}
            </ul>
        </div>
      </aside>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}