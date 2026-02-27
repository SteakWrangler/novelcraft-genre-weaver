import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  CheckCircle2,
  Circle,
  XCircle,
  Layers,
  LayoutList,
  PenTool,
  RefreshCw,
  Image,
  FileOutput,
} from "lucide-react";
import { JobProgress, GenerationPhase } from "@/types";

interface GenerationProgressProps {
  progress: JobProgress | null;
  onCancel?: () => void;
  showCancel?: boolean;
}

const PHASE_CONFIG: {
  phase: GenerationPhase;
  label: string;
  icon: React.ElementType;
}[] = [
  { phase: "foundation", label: "Foundation", icon: Layers },
  { phase: "structure", label: "Structure", icon: LayoutList },
  { phase: "drafting", label: "Drafting", icon: PenTool },
  { phase: "revision", label: "Revision", icon: RefreshCw },
  { phase: "image", label: "Image", icon: Image },
  { phase: "output", label: "Output", icon: FileOutput },
];

function formatTimeRemaining(seconds: number): string {
  if (seconds < 60) return `${Math.ceil(seconds)}s remaining`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.ceil(seconds % 60);
  return secs > 0 ? `${mins}m ${secs}s remaining` : `${mins}m remaining`;
}

const GenerationProgress = ({
  progress,
  onCancel,
  showCancel = true,
}: GenerationProgressProps) => {
  if (!progress) return null;

  const { status, currentPhase, currentStep, percentComplete, estimatedTimeRemaining, completedPhases, errors } = progress;

  return (
    <Card className="border-2 border-blue-200 bg-blue-50/80">
      <CardContent className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-blue-900">
            {status === "completed"
              ? "Generation Complete"
              : status === "failed"
              ? "Generation Failed"
              : status === "cancelled"
              ? "Generation Cancelled"
              : "Generating Your Book"}
          </h3>
          <Badge
            variant={
              status === "completed"
                ? "default"
                : status === "failed"
                ? "destructive"
                : "secondary"
            }
            className={
              status === "completed"
                ? "bg-green-100 text-green-800"
                : status === "running"
                ? "bg-blue-100 text-blue-800"
                : ""
            }
          >
            {status === "running"
              ? `${Math.round(percentComplete)}%`
              : status}
          </Badge>
        </div>

        {/* Phase Indicators */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {PHASE_CONFIG.map(({ phase, label, icon: Icon }) => {
            const isCompleted = completedPhases.includes(phase);
            const isCurrent = currentPhase === phase && status === "running";
            const isUpcoming = !isCompleted && !isCurrent;

            return (
              <div
                key={phase}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                  isCompleted
                    ? "bg-green-100"
                    : isCurrent
                    ? "bg-blue-100"
                    : "bg-gray-50"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                ) : (
                  <Circle
                    className={`w-5 h-5 ${
                      isUpcoming ? "text-gray-300" : "text-gray-400"
                    }`}
                  />
                )}
                <span
                  className={`text-xs font-medium text-center leading-tight ${
                    isCompleted
                      ? "text-green-700"
                      : isCurrent
                      ? "text-blue-700"
                      : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                status === "completed"
                  ? "bg-green-500"
                  : status === "failed"
                  ? "bg-red-500"
                  : "bg-blue-600"
              }`}
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-blue-600">
            <span>{currentStep}</span>
            {estimatedTimeRemaining != null && status === "running" && (
              <span>{formatTimeRemaining(estimatedTimeRemaining)}</span>
            )}
          </div>
        </div>

        {/* Errors */}
        {errors && errors.length > 0 && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              {errors.map((err, i) => (
                <p key={i}>{err}</p>
              ))}
            </AlertDescription>
          </Alert>
        )}

        {/* Cancel Button */}
        {showCancel && status === "running" && onCancel && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Cancel Generation
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GenerationProgress;
