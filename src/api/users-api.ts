const API_BASE_URL = "http://localhost:8000/api/apps/users/";

export const getUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/`, {
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = response.json()
    // console.log(data);
    return data;
  };