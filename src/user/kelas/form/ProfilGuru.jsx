const ProfilGuru = ( { datamentor }) => {

    return (
 <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: Profil Guru</h2>

     
              <div class="bg-white  rounded-xl  p-8 transition-all duration-300 animate-fade-in">
        <div class="flex flex-col md:flex-row ">
            <div class="md:w-1/3 w-full text-center mb-8 md:mb-0">
                <img src={datamentor.img} alt="Profile Picture" class="w-48 h-48 object-cover object-center rounded-xl mx-auto mb-4  transition-transform duration-300 hover:scale-105"/>
                <h1 class="text-2xl font-bold text-green-800  mb-2">{datamentor.Name}</h1>
                <p class="text-gray-600 ">{datamentor.subject}</p>
             
            </div>
            <div class="md:w-2/3 md:pl-8">
                <h2 class="text-xl font-semibold text-green-800  mb-4">About Me</h2>
                <p class="text-gray-700 text-sm md:text-lg mb-6">
                    {datamentor.about}
                </p>
                <h2 class="text-xl font-semibold text-green-800  mb-4">Skills</h2>
                <div class="flex flex-wrap text-sm md:text-lg gap-2 mb-6">
                    {datamentor.skills.map((skill, i) => (
                        <span key={i} class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{skill}</span>
                    ))}
               </div>
               
            </div>
        </div>
        </div>
     

        </div>
    )
}

export default ProfilGuru;