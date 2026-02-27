import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
  Clock,
  Coins,
  Info,
  X,
} from "lucide-react";
import { BookResult, Chapter } from "@/types";

interface ManuscriptViewerProps {
  result: BookResult;
  onClose?: () => void;
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins < 60) return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  const hours = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hours}h ${remainMins}m`;
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

const ManuscriptViewer = ({ result, onClose }: ManuscriptViewerProps) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const totalWordCount = result.chapters.reduce(
    (sum, ch) => sum + ch.wordCount,
    0
  );
  const currentChapter: Chapter | undefined =
    result.chapters[currentChapterIndex];

  const goToChapter = (index: number) => {
    if (index >= 0 && index < result.chapters.length) {
      setCurrentChapterIndex(index);
    }
  };

  const handleDownloadTxt = () => {
    const fullText = [
      result.title,
      "",
      ...result.chapters.flatMap((ch) => [
        `Chapter ${ch.number}: ${ch.title}`,
        "",
        ch.content,
        "",
        "",
      ]),
    ].join("\n");

    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // NOTE: PDF and EPUB export require backend format conversion support.
  // These buttons are wired up but will show a message until the backend is ready.
  const handleDownloadFormat = (format: string) => {
    // For now, fall back to txt download with a note
    handleDownloadTxt();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Left Sidebar - Chapter Navigation */}
      <div className="lg:w-64 flex-shrink-0">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Chapters</CardTitle>
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <p>{formatNumber(totalWordCount)} words total</p>
              <p>{result.chapters.length} chapters</p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-64 lg:h-96">
              <div className="p-2 space-y-0.5">
                {result.chapters.map((chapter, index) => (
                  <button
                    key={chapter.number}
                    onClick={() => goToChapter(index)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      index === currentChapterIndex
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="block truncate">
                      Ch. {chapter.number}: {chapter.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatNumber(chapter.wordCount)} words
                    </span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-4">
        {/* Cover / Title Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Cover Image */}
              {result.coverImageUrl && (
                <img
                  src={result.coverImageUrl}
                  alt={`Cover for ${result.title}`}
                  className="w-24 h-36 object-cover rounded-md shadow-sm"
                />
              )}
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-bold">{result.title}</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {formatNumber(totalWordCount)} words
                  </Badge>
                  <Badge variant="secondary">
                    {result.chapters.length} chapters
                  </Badge>
                </div>
              </div>
              {/* Download Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTxt}
                >
                  <Download className="w-3 h-3 mr-1" />
                  TXT
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadFormat("pdf")}
                  title="PDF export requires backend support"
                >
                  <Download className="w-3 h-3 mr-1" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadFormat("epub")}
                  title="EPUB export requires backend support"
                >
                  <Download className="w-3 h-3 mr-1" />
                  EPUB
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chapter Content */}
        {currentChapter && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Chapter {currentChapter.number}: {currentChapter.title}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {formatNumber(currentChapter.wordCount)} words
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[50vh]">
                <div className="whitespace-pre-wrap text-sm leading-relaxed pr-4">
                  {currentChapter.content}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Previous / Next Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={currentChapterIndex === 0}
            onClick={() => goToChapter(currentChapterIndex - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentChapterIndex + 1} of {result.chapters.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentChapterIndex >= result.chapters.length - 1}
            onClick={() => goToChapter(currentChapterIndex + 1)}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Generation Metadata Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Info className="w-4 h-4 mr-1" />
              Generation Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generation Metadata</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(
                      result.generationMetadata.generationDuration
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Total Tokens</p>
                  <p className="font-medium">
                    {formatNumber(
                      result.generationMetadata.totalTokensUsed
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Cost</p>
                  <p className="font-medium flex items-center gap-1">
                    <Coins className="w-3 h-3" />$
                    {result.generationMetadata.actualCost.toFixed(4)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Model</p>
                  <p className="font-medium">
                    {result.generationMetadata.model}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Phase Breakdown</p>
                {result.generationMetadata.phases.map((phase) => (
                  <div
                    key={phase.phase}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="capitalize">{phase.phase}</span>
                    <div className="flex gap-4 text-muted-foreground">
                      <span>{formatDuration(phase.duration)}</span>
                      <span>{formatNumber(phase.tokensUsed)} tokens</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ManuscriptViewer;
