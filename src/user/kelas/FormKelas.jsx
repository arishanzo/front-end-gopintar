import { useState } from "react";
import { getDataMentor } from "../../assets/data/datatentor";
import { useNavigate } from "react-router-dom";
import ProfilGuru from "./form/ProfilGuru";
import ReviewForm from "./form/ReviewForm";
import AturJadwalForm from "./form/AturJadwalForm";
import KalenderJadwal from "./form/KalenderJadwal";


const FormKelas = () => {
    const idguru = localStorage.getItem('selectedGuruId');
    const allMentors = getDataMentor();
    const datamentor = allMentors.find(mentor => mentor.id === parseInt(idguru));


    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    
    const [formData, setFormData] = useState({
        name: datamentor.Name,
        street: "",
        city: "",
        postal: ""
     });

    const [formTglDataBooking, setFormTglDataBooking] = useState({
      
      idguru : '',
      tglbooking : '',
      sesi: '',
      statusngajar: 'Belum Mulai',
    })

    console.log(formTglDataBooking);


        const steps = ["Profil Guru Private", "Address", "Review & Submit"];


        const handleRedirectToGuru = () => {
        
         localStorage.removeItem('selectedGuruId', idguru);
        navigate('/guru');
    };

        const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        };


        const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
        else alert("Form Submitted! ✅");
        };


        const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
        };

    return (
        <>

        {/* Step Forms */}
        <form>
          {currentStep === 0 && (<ProfilGuru datamentor={datamentor}/>)}
{/* 
          {currentStep === 1 && (  <AturJadwalForm formData={formData} handleChange={handleChange} />)} */}
          {currentStep === 1 && (<KalenderJadwal  setFormTglDataBooking={setFormTglDataBooking} />)}
          {currentStep === 2 && (<ReviewForm formData={formData} />  )}


           <div className="w-full max-w-6xl bg-white shadow-md rounded-xl p-8">

   

        {/* Progress Bar */}
        <div className="w-full max-w-6xl bg-green-100 rounded-full h-2 ">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

           </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
              >
                Previous
              </button>
            )}


          {currentStep === 0 && (
              <button
                type="button"
                onClick={handleRedirectToGuru}
                className="bg-gray-100 text-gray-900 px-6 py-2 rounded-lg"
              >
                 Pilih Guru Lain
              </button>
            )}
            
            <button
              type="button"
              onClick={nextStep}
              className="bg-green-600 text-white px-6 py-2 rounded-lg ml-auto"
            >
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
   
        </>
    )
}

export default FormKelas;


               {/* <div className="space-y-4">
            //     <input
            //       type="text"
            //       name="name"
            //       placeholder="Name"
            //       value={formData.name}
            //       onChange={handleChange}
            //       className="w-full border border-gray-300 rounded-lg p-3 focus:outline-purple-500"
            //     />
            //     <input
            //       type="email"
            //       name="email"
            //       placeholder="Email"
            //       value={formData.email}
            //       onChange={handleChange}
            //       className="w-full border border-gray-300 rounded-lg p-3 focus:outline-purple-500"
            //     />
            //   </div> */}