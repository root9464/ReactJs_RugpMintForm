import { NextItemData } from '@/modules/FormBlock/components/Progress';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance, collectionAdress } from '../global/Global.variables';
import { Query } from '../types/query';

const getItemLimit = async () => {
  const { data } = await axiosInstance.get<NextItemData>(`blockchain/accounts/${collectionAdress}/methods/get_items_limit`);
  return data;
};

export const useGetItemLimit = (): Query<NextItemData> => {
  return useQuery({
    queryKey: ['item_limit'],
    queryFn: getItemLimit,
    staleTime: 80 * 1000,
  });
};
