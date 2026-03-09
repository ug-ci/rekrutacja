import { useQuery } from '@tanstack/react-query';
import { getFaq } from '../api/strapi';

export function useFaq() {
  return useQuery({
    queryKey: ['faq'],
    queryFn: getFaq,
  });
}
