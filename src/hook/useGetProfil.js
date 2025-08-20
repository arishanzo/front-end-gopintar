import { useEffect, useState } from "react";
import { getProfil } from "../lib/services/profileService";

export const UseGetProfil = (iduser) => {
     const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() => {
         let isMounted = true;

          if (!iduser) return;
        const fetchProfil = async () => {
            try {
                const result = await getProfil(iduser);
                setProfil(result.data);
         if (isMounted) setProfil(result.data || {});
            } catch (error) {
            if (isMounted) setError(error?.response?.data?.message || error?.message || "Gagal memuat profil");
            } finally {
            if (isMounted) setLoading(false);
            }
        };

        fetchProfil();

          return () => {
    isMounted = false;
  };
}, [iduser])

return { profil, loading, error};

};