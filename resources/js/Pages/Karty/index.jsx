import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function KartyIndex() {
  const { data, setData, post, processing, errors, reset } = useForm({
    fio: '',
    type_card: '',
  });
  
  const submit = (e) => {
    e.preventDefault();
    post('/cardsrequest', {
      preserveScroll: true,
      onSuccess: (page) => {
          reset();
           console.log('✅ Тестовая переменная:', page.props.testVariable); 
      }
    });
  };
  
  return (
    <AppLayout>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Вы на странице "Платежные карты"
          </h2>
          <p className="text-lg text-gray-500">
            Хотите получить новую карту?
          </p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
              <input
                type="text"
                value={data.fio}
                onChange={(e) => setData('fio', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.fio ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Иванов Иван Иванович"
              />
              {errors.fio && <p className="text-red-500 text-xs mt-1">{errors.fio}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Тип карты</label>
              <select
                value={data.type_card}
                onChange={(e) => setData('type_card', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.type_card ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Выберите тип</option>
                <option value="debit">Дебетовая</option>
                <option value="credit">Кредитная</option>
                <option value="business">Бизнес</option>
              </select>
              {errors.type_card && <p className="text-red-500 text-xs mt-1">{errors.type_card}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Отправка...
                </>
              ) : (
                'Отправить заявку'
              )}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
