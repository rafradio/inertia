import MenuItem from '@/Components/MenuItem';

export default function MenuIndex({ menuTree }) {
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

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Добро пожаловать в приложение
          </h2>
          <p className="text-lg text-gray-500">
            Выберите нужный раздел в меню слева
          </p>
        </div>
      </main>
    </div>
  );
}