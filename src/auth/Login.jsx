
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axiosClient from "../lib/axios";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email_user: "",
    password_user: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Sign In");

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setTextButton("Sedang Masuk…");
    setErrors({}); // reset

    try {
      // 1) ambil CSRF cookie
      await axiosClient.get("/sanctum/csrf-cookie");
      const response = await axiosClient.post("/api/login", formData);
      
      console.log("Login response:", response.data);
      setStatus("Login berhasil.");
      
      // Delay sedikit sebelum navigate
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
      
    } catch (err) {
      console.error("Login error:", err);
      const data = err.response?.data || {};
      setErrors(data.errors || { general: [data.message || "Login gagal."] });
      setStatus("Login gagal. Silakan coba lagi.");
    } finally {
      setDisabled(false);
      setTextButton("Sign In");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  // Google Login (Sanctum cookie)
  const logingoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setDisabled(true);
        setTextButton("Loading…");
        await axiosClient.get("/sanctum/csrf-cookie");
        await axiosClient.post("/api/auth/google/callback", {
          token: tokenResponse.access_token,
        });
        navigate("/dashboard");
      } catch (err) {
        const data = err.response?.data || {};
        setErrors(data.errors || { general: [data.message || "Login Google gagal."] });
        setStatus("Login Google gagal.");
      } finally {
        setDisabled(false);
        setTextButton("Sign In");
        setTimeout(() => setStatus(""), 3000);
      }
    },
    onError: (error) => {
      setStatus("Login Google dibatalkan/gagal.");
      console.error(error);
    },
  });


    return (
        <>
 <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 ">
          <div className="flex items-center mb-4">
            <a
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
       
              <span className="text-2xl w-10 h-10 mr-2">
              ⭠
              </span>
            </a>
          </div>
          <div>
            <img
              src="./img/logo/logogopintar.png"
              className="mx-auto h-80"
              alt="Logo"
            />

            
          </div>
        

        


          <div className=" flex flex-col items-center">
            <div className="w-full flex-1 ">
                <h1 className="text-2xl font-bold text-center mb-2">
                    Login Aplikasi Go-Pintar
                    </h1>
   <p className="text-center text-gray-600 mb-6"> 
                    Les Privat Terbaik di Indonesia & No. 1
                </p>
                               {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }


              <div className="mx-auto max-w-xs">


            <form  onSubmit={handleSubmit}>

                 <div className="mb-4">
                   <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="namalengkap">
                     Email
                  </label>

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  value={formData.email_user}
                   onChange={handleChange}
                  placeholder="Masukan Email Anda"
                  name="email_user"
                />
            {errors?.email_user?.[0] && <small style={{color: 'red'}}>{errors.email_user[0]}</small>}

                </div>

                
                <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700" htmlFor="namalengkap">
              Password
              </label>    
             <input
                                                     value={formData.password_user}
                                         onChange={handleChange}

                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                              type="password"
                                name='password_user'
                              placeholder="Masukan Password Anda"
                            />

              {errors?.password_user?.[0] && <small style={{color: 'red'}}>{errors.password_user[0]}</small>}
            </div>
                <button 
                type="submit"
                  disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-4">{textButton}</span>
                </button>

</form>

                <div className="flex mt-4 flex-col items-center">

                 
                                 
                <button 
                  onClick={() => logingoogle()}
                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign In with Google</span>
                </button>



              </div>


               <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a className="inline-block text-sm text-green-600 align-baseline hover:text-green-800"
                                        href="/daftar">
                                        Belum Punya Akun? Daftar Sekarang
                                    </a>
                                </div>

                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Cartesian Kinetics{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-green-50 text-center hidden lg:flex">
                
            <iframe
              src="https://lottie.host/embed/5379c4d6-adc3-4bbd-ae5b-30fc983dae79/0d8Yeofcqa.lottie"
              className=" xl:m-16 w-full h-full border-0"
              title="Animation"
            ></iframe>
       
        </div>
      </div>
    </div>
 </>
    );
};

export default Login;