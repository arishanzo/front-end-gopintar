import { useState, useEffect } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getOrder } from "../lib/services/orderService";

export const UseGetOrder = (iduser) => {
   
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

      useEffect(() => {
        let isMounted = true;
        if (!iduser) {
          setLoading(false);
          return;
        }
    
        const fetchOrder = async () => {
          try {
    
            setLoading(true);
            const resultget = await getFetchCache( () => getOrder(iduser), 5, 3000);
            console.log('getFetchCache result:', resultget);
            if (isMounted) setResult(resultget || null);
    
          } catch (error) {
    
            if (isMounted) {
              if (error?.response?.status === 404) {
                setResult(null);
              } else {
                setError(
                  error?.response?.data?.message ||
                    error?.message ||
                    "Gagal memuat Order"
                );
              }
            }
    
          } finally {
            if (isMounted) setLoading(false);
          }
    
        };
    
        const timer = setTimeout(() => {
          fetchOrder();
        }, 100);
    
        return () => {
          isMounted = false;
          clearTimeout(timer);
        };
      }, [iduser]);
    
      return { result, loading, error };



    // console.log('UseGetOrder - iduser:', iduser, 'loading:', loading, 'result:', result);

    // useEffect(() => {
    //     console.log('UseGetOrder useEffect - iduser:', iduser);
        
    //     if (!iduser) {
    //         console.log('No iduser, setting loading false');
    //         setLoading(false);
    //         setResult(null);
    //         return;
    //     }

    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const res = await axiosClient.get(`/api/midtrans/${iduser}`);
                
    //             console.log('API Response:', res.data);

    //             let status =
    //                 res.data?.statuspembayaran ||
    //                 res.data?.status ||
    //                 res.data?.transaction_status ||
    //                 null;

    //             const finalResult = {
    //                 ...res.data,
    //                 statuspembayaran: status,
    //             };
                
    //             setResult(finalResult);
    //         } catch (err) {
    //             console.error("Error fetch midtrans:", err);
    //             setResult(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [iduser]);

    // return { result, loading };
}

