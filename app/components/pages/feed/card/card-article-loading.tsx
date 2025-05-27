import { Skeleton } from '~/components/ui/skeleton'

export default function CardArticleLoading() {
  return (
    <div className="flex flex-col border border-gray-300 bg-[#F9FAFB] gap-4 rounded-lg p-4 h-[500px]">
      <Skeleton className="w-full h-2/3 rounded-lg" />
      <div className="flex flex-col gap-2 justify-start">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-[250px] " />
          <Skeleton className="h-5 w-[100px] " />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  )
}
