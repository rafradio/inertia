import AppLayout from '@/Layouts/AppLayout';
import MenuItem from '@/Components/MenuItem';

export default function MenuIndex({ menuTree }) {
  return (
    <AppLayout menuTree={menuTree}>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Добро пожаловать в приложение
          </h2>
          <p className="text-lg text-gray-500">
            Выберите нужный раздел в меню слева
          </p>
        </div>
      </div>
    </AppLayout>
  );
}