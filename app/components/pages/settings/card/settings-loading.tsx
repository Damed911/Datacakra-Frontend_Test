import { Skeleton } from '~/components/ui/skeleton'

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-3 border border-gray-300 bg-[#F9FAFB] p-4 rounded-lg">
      <div className="flex items-center justify-end">
        <Skeleton className="h-10 w-[150px]" />
      </div>
      <div className="flex flex-col items-start p-2">
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  )
}
