
const API_BASE_URL = "http://localhost:8000/api/apps/artists";


export const createArtist = async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to create artist");
    }
  
    return response.json();
  };
  
export const getArtists = async () => {
    const response = await fetch(`${API_BASE_URL}/`, {
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch artist");
    }
    const data = response.json()
    // console.log(data);
    return data;
  };
  
//  deleteArtist()
//   const handleDelete = async (artist: Artist) => {
//     if (!window.confirm("Are you sure you want to delete this artist?")) return;
    
//     try {
//       await axios.delete(`http://localhost:8000/api/apps/artists/${artist.id}/`);
//       setArtists(artists.filter(a => a.id !== artist.id));
//       toast.success("Artist deleted successfully");
//     } catch {
//       toast.error("Failed to delete artist");
//     }
//   };

export const deleteArtist = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/${id}/`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete artist");
    }
  
    return response.json();
  }