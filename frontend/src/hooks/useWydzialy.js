import { useQuery } from '@tanstack/react-query';
import { getWydzialy } from '../api/strapi';

export function useWydzialy() {
  return useQuery({
    queryKey: ['wydzialy'],
    queryFn: getWydzialy,
  });
}
