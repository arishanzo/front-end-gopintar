
import { useState} from "react"

import { getDataMentor } from "../../assets/data/datatentor";
import {  useRef } from 'react';
import { useNavigate } from "react-router-dom";

const DaftarGuru = () => {
  const datamentor = getDataMentor();

  const scrollRef = useRef(null);


     const Navigate = useNavigate();


  
      const handleSubmit = async (idguru) => {
        localStorage.setItem('selectedGuruId', idguru);
        Navigate('/kelas/buatkelas');
      }


    
  const data = [
    { id: 1, 
      judul: 'Matematika', 
      icon: 'http://svgrepo.com/show/362863/math-operations-bold.svg' 
    },


     { id: 2, 
      judul: 'Mapel Sains / IPA', 
      icon: 'https://www.svgrepo.com/show/455758/laboratory-test-tube.svg' 
    },
   
     { id: 3, 
      judul: 'Mapel IPS', 
      icon: 'https://www.svgrepo.com/show/454211/history-log-manuscript.svg' 
    },

     
     { id: 4, 
      judul: 'Bahasa Inggris', 
      icon: 'https://www.svgrepo.com/show/535472/language.svg' 
    },

       { id: 5, 
      judul: 'Bahasa Indonesia', 
      icon: 'https://www.svgrepo.com/show/403413/flag-for-indonesia.svg' 
    },

       { id: 6, 
      judul: 'Mapel Umum', 
      icon: 'https://www.svgrepo.com/show/502515/bar-chart.svg' 
    },

       { id: 7, 
      judul: 'Persiapan UTBK', 
      icon: 'https://www.svgrepo.com/show/282517/studying-exam.svg' 
    },

       { id: 8, 
      judul: 'Persiapan Ujian Nasional', 
      icon: 'https://www.svgrepo.com/show/282517/studying-exam.svg' 
    },


]


  const [selectedCategory, setSelectedCategory] = useState('All');
   


    const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredGallery = selectedCategory === 'All' ? datamentor : datamentor.filter(item => item.category === selectedCategory);
    

    return (

        <>


<div class=" md:py-16 sm:py-8 lg:py-12 pt-2  overflow-x-hidden" id='mentor'>
  
    <div class="mx-auto "  >
        <div className="mb-4 text-center md:px-8">
            <div className="flex items-center justify-between gap-12 mb-2">
               <h2 className="text-sm font-bold text-green-800 lg:text-xl">Daftar Guru</h2>
       
            </div>
         
          <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide cursor-grab scroll-smooth focus:outline-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        tabIndex={0}
      >
        
        {data.map((category) => (
             <div key={category.id} className="relative group flex-shrink-0 w-30 py-8 justify-start text-start">
            <div className="relative overflow-hidden group  rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
              
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.judul)}
            className={`px-4 py-2 text-sm rounded-full transition 
              ${selectedCategory === category.judul 
                ? 'bg-indigo-600 text-white hover:bg-green-700' 
                : 'bg-white text-green-600 border border-green-600 hover:bg-indigo-50'
              }`}
          >
            {category.judul}
          </button>

            
        </div>
        </div>
        
        ))}
      
        
</div>
       
        </div>



    <div className="md:px-8">
      <div 
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5"
       
      >
        {filteredGallery.map((mentor, i) => (
          <div key={i} className="relative group flex-shrink-0 w-40 py-2 p-2 md:p-0">
            <div className="relative overflow-hidden group bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
              <div className="bg-gray-200 rounded-xl overflow-hidden relative h-40 w-40">
                <img 
                  src={mentor.img || 'https://via.placeholder.com/300'}
                  alt={mentor.Name || "Mentor"}
                  className="w-full h-full object-cover object-center"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xs font-semibold mb-2">{mentor.Name|| "Mentor Name"}</h3>
                <p className="text-green-600 mb-4">{mentor.subject || "Subject Expert"}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out shadow-lg rounded-t-lg">
                <p className="text-sm text-gray-700 mb-3">
                  {mentor.text || "Experienced mentor with years of teaching expertise."}
                </p>
               <button 
                type="button"
                onClick={() => handleSubmit(mentor?.id || '')}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200">
                  Pilih Guru
                </button>
              </div>
            </div>
          </div>
        ))}



        
      </div>
    </div>


</div>


</div>   
      
    </>
    );
}

export default DaftarGuru;