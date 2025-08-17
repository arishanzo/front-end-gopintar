const Category = () => {
  const data = [
    { 
      id: 1, 
      judul: 'Matematika', 
      icon: '🔢',
      gradient: 'from-blue-400 to-blue-600'
    },
    { 
      id: 2, 
      judul: 'Sains / IPA', 
      icon: '🧪',
      gradient: 'from-green-400 to-green-600'
    },
    { 
      id: 3, 
      judul: 'IPS', 
      icon: '🌍',
      gradient: 'from-yellow-400 to-orange-500'
    },
    { 
      id: 4, 
      judul: 'Bahasa Inggris', 
      icon: '🇺🇸',
      gradient: 'from-purple-400 to-purple-600'
    },
    { 
      id: 5, 
      judul: 'Bahasa Indonesia', 
      icon: '🇮🇩',
      gradient: 'from-red-400 to-red-600'
    },
    { 
      id: 6, 
      judul: 'Mapel Umum', 
      icon: '📚',
      gradient: 'from-indigo-400 to-indigo-600'
    },
    { 
      id: 7, 
      judul: 'UTBK', 
      icon: '🎯',
      gradient: 'from-pink-400 to-pink-600'
    },
    { 
      id: 8, 
      judul: 'Ujian Nasional', 
      icon: '📝',
      gradient: 'from-teal-400 to-teal-600'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex mx-auto px-2 md:px-8 items-center justify-between mb-6">
        <h2 className="text-md md:text-xl font-bold text-green-800">📚 Kategori Pelajaran</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Lihat Semua →
        </button>
      </div>

      <div className="grid grid-cols-2 mx-auto px-2 md:px-8 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer"
          >
            <div className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}>
              <div className="text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-sm leading-tight">
                  {item.judul}
                </h3>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="relative -mt-2 mx-auto w-fit">
              <div className="bg-white rounded-full px-3 py-1 shadow-md border border-gray-100">
                <span className="text-xs font-medium text-gray-600">
                  {Math.floor(Math.random() * 50) + 10}+ guru
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popular categories */}
      <div className="mt-6 flex mx-auto px-2 md:px-8 flex-wrap gap-2">
        <span className="text-sm text-gray-500">Populer:</span>
        {['Matematika', 'Fisika', 'Kimia', 'Bahasa Inggris'].map((cat) => (
          <span
            key={cat}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 cursor-pointer transition-colors"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Category;