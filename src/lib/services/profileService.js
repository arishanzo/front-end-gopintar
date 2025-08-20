import axiosClient  from "../axios";

export const getProfil = async (iduser) => {

    try {
     const respone = await axiosClient.get(`/api/profile/${iduser}`);
     return respone.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}