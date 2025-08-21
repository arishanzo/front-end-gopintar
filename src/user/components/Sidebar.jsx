import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
      {
      path: "/cari-guru",
      name: "Guru",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v7m0 0H9m3 0h3m-3-7a5 5 0 100-10 5 5 0 000 10zm7-7l-7-3-7 3m14 0v6a2 2 0 01-2 2h-2m-8-8v6a2 2 0 002 2h2" />
        </svg>
      )
    },
    {
      path: "/berlangganan",
      name: "Berlangganan",
      icon: (
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },

     {
      path: "/pembayaran",
      name: "Pembayaran",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
  
    {
      path: "/kelas-saya",
      name: "Kelas Saya",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      path: "/jadwal",
      name: "Jadwal",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
      {
      path: "/riwayat",
      name: "Riwayat",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

 
  
  return (
    <div className={`hidden md:flex flex-col z-50 bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img className="w-8 h-8" src="./img/logo/logogopintar.png" alt="Go-Pintar" />
            <span className="text-lg font-bold text-green-600">Go-Pintar</span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

    

      {/* Main Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
              isActive(item.path)
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className={`${isActive(item.path) ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
              {item.icon}
            </div>
            {!isCollapsed && (
              <>
                <span className="font-medium">{item.name}</span>
                {item.notification && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {item.notification}
                  </span>
                )}
              </>
            )}
            {isCollapsed && item.notification && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.notification}
              </span>
            )}
          </Link>
        ))}

        
      <div className="p-4 border-t border-gray-200 space-y-2">
         {/* Profile Link */}
        <Link
          to="/profil"
          className={`flex items-start space-x-3  py-2.5 rounded-lg transition-all duration-200 group ${
            isActive('/profil')
              ? 'bg-green-100 text-green-700 shadow-sm'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <div className={`${isActive('/profil') ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {!isCollapsed && <span className="font-medium">Profil</span>}
        </Link>
      </div>
      </nav>

        
       
      </div>
 
  );
};

export default Sidebar;