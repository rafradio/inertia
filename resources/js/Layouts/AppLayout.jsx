import MenuItem from '@/Components/MenuItem';

export default function AppLayout({ children, menuTree }) {
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