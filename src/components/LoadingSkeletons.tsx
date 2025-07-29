import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Book card skeleton for library
export function BookCardSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-12" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 flex-1 sm:flex-initial sm:w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Inspiration card skeleton
export function InspirationCardSkeleton() {
  return (
    <Card className="border-l-4 border-l-gray-300">
      <CardContent className="p-3 md:p-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-3" />
            <div className="flex flex-wrap gap-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
          <Skeleton className="h-8 w-16 flex-shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}

// Genre selection skeleton
export function GenreSkeletons() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Form field skeleton
export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Book generation progress component
export function BookGenerationProgress({ 
  progress, 
  currentStep 
}: { 
  progress: number; 
  currentStep: string; 
}) {
  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-blue-900">Generating Your Book</h3>
            <span className="text-sm font-medium text-blue-700">{progress}%</span>
          </div>
          
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-sm text-blue-700">
            <span className="animate-pulse">✨</span> {currentStep}
          </p>
          
          {progress < 100 && (
            <div className="flex items-center gap-2 text-xs text-blue-600">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
              <span>This may take a few minutes...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Loading state for entire sections
export function SectionLoadingSkeleton({ 
  title, 
  description 
}: { 
  title: string; 
  description?: string; 
}) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        {description && <Skeleton className="h-4 w-96" />}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}