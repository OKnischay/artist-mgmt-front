import { useQuery } from '@tanstack/react-query';
import { getArtists } from '@/api/artist-api';

export const useArtistsQuery = () => {
  const {data, isLoading,error} = useQuery({
    queryKey: ['artists'],
    queryFn: getArtists,
  });
  return {
    data,
    isLoading,
    error
  };         
}