import { useState, useEffect, useRef } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function CitySelector() {
  const { geo: { cities, selectedCity } = {} } = usePage().props; // cities можно тоже зашарить
  console.log('selectedCity = ', selectedCity);
  const [isOpen, setIsOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState();
  const currentCityRef = useRef(null);
  
  useEffect(() => {
    console.log('🟢 CitySelector MOUNTED');
    return () => console.log('🔴 CitySelector UNMOUNTED');
  }, []);

  useEffect(() => {
    console.log('🔄 currentCity изменился:', currentCity);
  }, [currentCity]);

  const handleSelect = (cityId) => {
    
    router.patch('/city', { city_id: cityId }, {
      preserveState: true, // Не перезагружать весь лейаут
      preserveScroll: true,
      onSuccess: () => setIsOpen(false),
    });
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
      >
      {currentCityRef.current?.name || selectedCity?.name || 'Выберите город'}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
       {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
          {cities?.map(city => (
            <button
              key={city.id}
              onClick={() => {
                  currentCityRef.current = city;
                  setIsOpen(false);
                  handleSelect(city.id);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                selectedCity?.id === city.id ? 'bg-blue-50 text-blue-700 font-medium' : ''
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
       )}
    </div>
  );
}