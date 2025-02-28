import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { activityService } from '@/services/activities'
import type { Activity, ActivityFilter } from '@/types/activity'

export function useActivities(filters?: ActivityFilter) {
  return useQuery({
    queryKey: ['activities', filters],
    queryFn: () => activityService.getActivities(filters),
  })
}

export function useActivity(id: string) {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: () => activityService.getActivityById(id),
    enabled: !!id,
  })
}

export function useStartActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: activityService.startActivity,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.invalidateQueries({ queryKey: ['activity', data.activityId] })
    },
  })
}

export function useCompleteActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      activityId,
      data,
    }: {
      activityId: string
      data: Parameters<typeof activityService.completeActivity>[1]
    }) => activityService.completeActivity(activityId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.invalidateQueries({ queryKey: ['activity', data.activityId] })
    },
  })
}

export function useActivitySearch(query: string) {
  return useQuery({
    queryKey: ['activities', 'search', query],
    queryFn: () => activityService.searchActivities(query),
    enabled: query.length > 2,
  })
}

export function useRecommendedActivities() {
  return useQuery({
    queryKey: ['activities', 'recommended'],
    queryFn: activityService.getRecommendedActivities,
  })
}
