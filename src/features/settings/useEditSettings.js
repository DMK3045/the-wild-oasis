import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingAPI } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useEditSettings() {
  const queryClient = useQueryClient();
  const { isLoading: isEditingSettings, mutate: updateSettings } = useMutation({
    mutationFn: (newSettings) => updateSettingAPI(newSettings),
    onSuccess: () => {
      toast('Settings updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEditingSettings, updateSettings };
}
