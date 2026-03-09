import { useQuery } from '@tanstack/react-query';
import { getKierunki, getKierunek } from '../api/strapi';

export function useKierunki(filters = {}) {
  return useQuery({
    queryKey: ['kierunki', filters],
    queryFn: () => getKierunki(filters),
  });
}

export function useKierunek(slug) {
  return useQuery({
    queryKey: ['kierunek', slug],
    queryFn: () => getKierunek(slug),
    enabled: !!slug,
  });
}
