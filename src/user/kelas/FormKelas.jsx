import { useState } from "react";
import { getDataMentor } from "../../assets/data/datatentor";
import { useNavigate } from "react-router-dom";
import FormBooking from "./form/FormBooking";
import ProfilGuru from "./form/ProfilGuru";
import ReviewForm from "./form/ReviewForm";


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
           <div className=" flex  justify-between bg-gray-50">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8 w-full max-w-6xl">
          {steps.map((_, i) => (
            <div key={i} className="relative flex-1 flex items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 z-10 ${
                  i <= currentStep
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {i + 1}
              </div>
             
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-6xl bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Step Forms */}
        <form>
          {currentStep === 0 && (<ProfilGuru datamentor={datamentor}/>)}

          {currentStep === 1 && (  <FormBooking formData={formData} handleChange={handleChange} />)}

          {currentStep === 2 && (<ReviewForm formData={formData} />  )}

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
      </div>
    </div>
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