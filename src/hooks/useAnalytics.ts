import { useQuery } from '@tanstack/react-query'
import { analyticsService } from '@/services/analytics'
import type {
  TeacherAnalytics,
  SchoolAnalytics,
  ActivityAnalytics,
} from '@/types/analytics'

export function useTeacherAnalytics() {
  return useQuery<TeacherAnalytics>({
    queryKey: ['analytics', 'teacher'],
    queryFn: analyticsService.getTeacherAnalytics,
  })
}

export function useSchoolAnalytics(schoolId: string) {
  return useQuery<SchoolAnalytics>({
    queryKey: ['analytics', 'school', schoolId],
    queryFn: () => analyticsService.getSchoolAnalytics(schoolId),
    enabled: !!schoolId,
  })
}

export function useActivityAnalytics(activityId: string) {
  return useQuery<ActivityAnalytics>({
    queryKey: ['analytics', 'activity', activityId],
    queryFn: () => analyticsService.getActivityAnalytics(activityId),
    enabled: !!activityId,
  })
}

export function useRegionalAnalytics(region: {
  state: string
  district?: string
}) {
  return useQuery({
    queryKey: ['analytics', 'regional', region],
    queryFn: () => analyticsService.getRegionalAnalytics(region),
    enabled: !!region.state,
  })
}

export function useUsageReport(params: {
  startDate: string
  endDate: string
  type: 'teacher' | 'school' | 'activity'
  id?: string
}) {
  return useQuery({
    queryKey: ['analytics', 'report', params],
    queryFn: () => analyticsService.generateUsageReport(params),
    enabled: !!params.startDate && !!params.endDate,
  })
}
