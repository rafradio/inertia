import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import MenuItem from '@/Components/MenuItem';

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
      <aside className="w-1/5 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h1 className="text-xl font-bold mb-6 text-gray-800">Навигация</h1>
        <ul className="space-y-2">
          {(menuTree || []).map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>
      </aside>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}