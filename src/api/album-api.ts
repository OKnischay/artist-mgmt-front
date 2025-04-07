
const API_BASE_URL = "http://localhost:8000/api/apps/albums";


export const createAlbum = async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to create albums");
    }
  
    return response.json();
  };
  