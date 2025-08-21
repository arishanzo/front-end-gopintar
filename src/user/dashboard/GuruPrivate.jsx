

import { getDataMentor } from "../../assets/data/datatentor";
import {  useRef } from 'react';

const GuruPrivate = () => {
  const scrollRef = useRef(null);
  const datamentor = getDataMentor();


  
    

    return (

        <>


<div class="pt-8 md:py-2 sm:py-8 lg:py-28   overflow-x-hidden" id='mentor'>
  
    <div class="mx-auto px-2 md:px-8"  >
        <div className="mb-2 text-center">
            <div className="flex items-center justify-between gap-12">
               <h2 className="text-sm font-bold text-green-800 lg:text-xl">Guru Terdekat</h2>
       
            </div>
         

       
        </div>



    <div className="">
      <div 
        ref={scrollRef}
        className="flex gap-8 pt-8 overflow-x-auto scrollbar-hide cursor-grab scroll-smooth focus:outline-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        tabIndex={0}
      >
        {datamentor.map((mentor, i) => (
          <div key={i} className="relative group flex-shrink-0 w-40 ">
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
                <h3 className="text-sm font-semibold mb-2">{mentor.Name|| "Mentor Name"}</h3>
                <p className="text-green-600 mb-4">{mentor.subject || "Subject Expert"}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out shadow-lg rounded-t-lg">
                <p className="text-sm text-gray-700">
                  {mentor.text || "Experienced mentor with years of teaching expertise."}
                </p>
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

export default GuruPrivate;