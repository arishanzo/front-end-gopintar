const ProfilGuru = ( { datamentor }) => {

    return (

       <>
            
      <h2 className="md:text-xl text-md text-green-700 font-bold mb-4">Profil Guru Private</h2>
              <div class="bg-white pt-8 mb-4 shadow shadow-md shadow-green-100 rounded-xl transition-all duration-300 animate-fade-in">
        <div class="flex flex-col md:flex-row p-2">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
            <div className="md:w-80 w-full col-span-1 text-center mb-2">
                <img
                src={datamentor.img}
                alt="Profile Picture"
                className="w-20 h-20 md:w-32 md:h-32 object-cover object-center rounded-xl mx-auto mb-4 transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="md:w-80 w-full col-span-1 text-start md:text-center ">
                 <h1 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
                {datamentor.Name}
                </h1>
                <p className="text-gray-600">{datamentor.subject}</p>
                </div>
            </div>
            <div class="md:w-2/3 pl-8">
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
     
</>
    )
}

export default ProfilGuru;