import { NextItemData } from '@/modules/FormBlock/components/Progress';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance, collectionAdress } from '../global/Global.variables';
import { Query } from '../types/query';

const getNextItemIndex = async () => {
  const { data } = await axiosInstance.get<NextItemData>(`blockchain/accounts/${collectionAdress}/methods/get_collection_data`);
  return data;
};

export const useGetNextItemIndex = (): Query<NextItemData> => {
  return useQuery({
    queryKey: ['next_item'],
    queryFn: getNextItemIndex,
    staleTime: 80 * 1000,
  });
};
