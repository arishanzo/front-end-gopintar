
import {  useRef } from 'react';

const Card = () => {


  const scrollRef = useRef(null);

  const data = [
    { id: 1, 
      judul: 'Total Tugas', 
     jumlah: ' 1' 
    },


     { id: 2, 
      judul: 'Total Studi', 
      jumlah: '1' 
    },
   
     { id: 3, 
      judul: 'Langganan', 
      jumlah: 'Aktif' 
    },

     
     { id: 4, 
      judul: 'Total Feedback', 
      jumlah: '5' 
    },

     { id: 5, 
      judul: 'Guru Aktif', 
      jumlah: '5' 
    },

      { id: 6, 
      judul: 'Total Jadwal', 
      jumlah: '2' 
    },
     
]


const colors = [
  "bg-green-100",
  "bg-blue-100",
  "bg-yellow-100",
  "bg-pink-100",
  "bg-purple-100",
  "bg-red-100"
];


    return (

         <div 
        ref={scrollRef}
        className="flex gap-8 mb-8 overflow-x-auto scrollbar-hide cursor-grab scroll-smooth sm:px-6 lg:px-8 focus:outline-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        tabIndex={0}
      >
        {data.map((data, i) => (
          <div key={i} className="relative group flex-shrink-0 w-40 py-2">
            <div className="relative overflow-hidden group bg-white rounded-xl shadow-sm transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
              
              <div class={`${colors[i % colors.length]} overflow-hidden shadow sm:rounded-lg`}>
                <div class="px-4 py-2 sm:p-6">
                    <dl>
                        <dt class="text-md mb-2 leading-5 font-medium text-gray-500 truncate ">{data.judul}</dt>
                        <dd class="mt-1 text-xl leading-9 font-bold text-indigo-900 ">{data.jumlah}</dd>
                    </dl>
                </div>
            </div>

            </div>
          </div>
        ))}



        
      </div>



    )
}

export default Card;