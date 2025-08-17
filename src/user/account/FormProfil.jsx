import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import axiosClient from "../../lib/axios";

const FormProfil = () => {
  const { user } = useAuth();
   const [preview, setPreview] = useState("https://github.com/gaearon.png");
    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // bikin preview dari file lokal
    }
  };


// set wilayah
   const [provinsi, setProvinsi] = useState("");
   const [kabupaten, setKabupaten] = useState("");
   const [kecamatan, setKecamatan] = useState("");
   
   const [Kelurahan, setKelurahan] = useState("");

  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKabupaten, setListKabupaten] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);
  
  const [listKelurahan, setListKelurahan] = useState([]);


// form

 const [formData, setFormData] = useState({
    namauser: "",
    foto_profil: "",
    alamatlengkap: "",
    no_telp: "",
    kelurahanform: "",
    kecamatanform: "",
    kabupatenform: "",
    provinsiform: "",
    kode_pos: "",
    nama_anak: "",
    usia_anak: "",
  });


  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Simpan Perubahan");

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));


    const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setTextButton("Prosess");
    setErrors({}); // reset

    try {
        
      const response = await axiosClient.post("/api/editprofil", formData);
      
      console.log("Form response:", response.data);
      setStatus("Ubah Data berhasil.");
      
    } catch (err) {
      console.error("Ubah Data error:", err);
      const data = err.response?.data || {};
      setErrors(data.errors || { general: [data.message || "Ubah Data gagal."] });
      setStatus("Ubah Data gagal. Silakan coba lagi.");
    } finally {
      setDisabled(false);
      setTextButton("Simpan Perubahan");
      setTimeout(() => setStatus(""), 3000);
    }
  };





     // Ambil provinsi saat pertama kali render
  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => res.json())
      .then((data) => setListProvinsi(data));
  }, []);


   // Ambil kabupaten ketika provinsi dipilih
  useEffect(() => {
    if (provinsi) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsi}.json`
      )
        .then((res) => res.json())
        .then((data) => setListKabupaten(data));
    } else {
      setListKabupaten([]);
      setKabupaten("");
    }
  }, [provinsi]);

    // Ambil kecamatan ketika kabupaten dipilih
        useEffect(() => {
            if (kabupaten) {
            fetch(
                `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabupaten}.json`
            )
                .then((res) => res.json())
                .then((data) => setListKecamatan(data));
            } else {
            setListKecamatan([]);
            setKecamatan("");
            }
        }, [kabupaten]);


         // Ambil kelurahan ketika kecamatan dipilih
  useEffect(() => {
    if (kecamatan) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatan}.json`
      )
        .then((res) => res.json())
        .then((data) => setListKelurahan(data));
    } else {
      setListKelurahan([]);
      setKelurahan("");
    }
  }, [kecamatan]);
        

    return (
        <>

         {/* Profile Header */}
         
              <div className="flex items-center space-x-6 p-8">
                <div className="relative">
                  <img
                    className="h-24 w-24 rounded-full object-cover"
                     src={preview}
                    alt="Profile"
                  />
                  <label className="absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-2 hover:bg-green-700 cursor-pointer">
                    <input type="file" accept="image/*"  onChange={handleFileChange}  className="hidden" />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </label>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user?.nama_user || "Guest"}</h2>
                  <p className="text-gray-600">Student Premium</p>
                  <div className="flex items-center mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Verified
                    </span>
                  </div>
                </div>
              </div>

                   {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }



 <form  onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6  p-8">
        <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan nama lengkap"
                    value={user?.nama_user || formData.namauser}
                   onChange={handleChange}
                   readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={user?.email || "Guest"}
                    className="w-full px-4 bg-gray-100 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan email"
                    readOnly
                    defaultValue="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan nomor telepon"
                       value={formData.no_telp}
                   onChange={handleChange}
                   
                  />

                   {errors?.no_telp?.[0] && <small style={{color: 'red'}}>{errors.no_telp[0]}</small>}

                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
                  <select 
                  value={provinsi}
                  onChange={(e) => {setProvinsi(e.target.value); handleChange}}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                     <option value="">Pilih Provinsi</option>
                        {listProvinsi.map((prov) => (
                            <option key={prov.id} value={prov.id}>
                            {prov.name}
                            </option>
                        ))}
                        </select>

                        
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kabupaten/Kota</label>
                  <select 
                   value={kabupaten}
                    onChange={(e) => {setKabupaten(e.target.value); handleChange}}
                    disabled={!provinsi}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                     <option value="">Pilih Kabupaten</option>
                    {listKabupaten.map((kab) => (
                        <option key={kab.id} value={kab.id}>
                        {kab.name}
                        </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan</label>
                  <select 
                     value={kecamatan}
                    onChange={(e) => {setKecamatan(e.target.value); handleChange }}
                    disabled={!kabupaten}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">Pilih Kecamatan</option>
                    {listKecamatan.map((kec) => (
                        <option key={kec.id} value={kec.id}>
                        {kec.name}
                        </option>
                    ))}
                  </select>
                </div>



                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kelurahan</label>
                  <select 
                     value={Kelurahan}
                    onChange={(e) => {setKelurahan(e.target.value); handleChange }}
                    disabled={!kabupaten}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">Pilih Kecamatan</option>
                    {listKelurahan.map((kel) => (
                        <option key={kel.id} value={kel.id}>
                        {kel.name}
                        </option>
                    ))}
                  </select>
                </div>

             <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
                  <input 
                    value={formData.kode_pos}
                    onChange={handleChange}
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan nomor telepon"
                  />

                    {errors?.kode_pos?.[0] && <small style={{color: 'red'}}>{errors.kode_pos[0]}</small>}

                </div>

                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Anak</label>
                  <input 
                    value={formData.nama_anak}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan nama anak"
                  />
                    {errors?.nama_anak?.[0] && <small style={{color: 'red'}}>{errors.nama_anak[0]}</small>}

                </div>
              
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Usia Anak</label>
                  <input 
                    value={formData.usia_anak}
                    onChange={handleChange}
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan usia anak"
                  />

                    {errors?.usia_anak?.[0] && <small style={{color: 'red'}}>{errors.usia_anak[0]}</small>}

                </div>
              
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                  <textarea 
                    value={formData.alamatlengkap}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    rows="3"
                    placeholder="Masukkan alamat lengkap"
                  ></textarea>

                    {errors?.alamatlengkap?.[0] && <small style={{color: 'red'}}>{errors.alamatlengkap[0]}</small>}

                </div>
         

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-2">
             
                <button
               
                type="submit"

                disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } mt-5 tracking-wide font-semibold bg-green-700 text-white w-[50%] py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>                 
                     
                     {textButton}
                </button>
              </div>


              </div>
              </form>
         </>
    )
}

export default FormProfil;