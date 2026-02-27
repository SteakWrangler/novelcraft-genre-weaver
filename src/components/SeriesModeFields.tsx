import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookCopy } from "lucide-react";
import { SeriesFields, SeriesBible } from "@/types";
import { useSeriesBibles } from "@/hooks/useSeriesBibles";

interface SeriesModeFieldsProps {
  seriesFields: SeriesFields;
  onChange: (fields: SeriesFields) => void;
  errors?: Record<string, string>;
}

const SeriesModeFields = ({
  seriesFields,
  onChange,
  errors,
}: SeriesModeFieldsProps) => {
  const { seriesBibles, loading: biblesLoading } = useSeriesBibles();

  const handleToggle = (enabled: boolean) => {
    onChange({
      ...seriesFields,
      seriesMode: enabled,
      // Reset fields when toggling off
      ...(enabled
        ? {}
        : {
            seriesPosition: undefined,
            seriesName: undefined,
            seriesBibleId: undefined,
            seriesArc: undefined,
          }),
    });
  };

  const showBibleSelector =
    seriesFields.seriesMode &&
    seriesFields.seriesPosition !== undefined &&
    seriesFields.seriesPosition > 1;

  const selectedBible = seriesFields.seriesBibleId
    ? seriesBibles.find((b) => b.id === seriesFields.seriesBibleId)
    : null;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <BookCopy className="w-4 h-4" />
            Series Mode
          </CardTitle>
          <Switch
            checked={seriesFields.seriesMode}
            onCheckedChange={handleToggle}
          />
        </div>
      </CardHeader>

      {seriesFields.seriesMode && (
        <CardContent className="space-y-4 pt-0">
          {/* Series Name */}
          <div className="space-y-2">
            <Label htmlFor="series-name" className="text-sm font-medium">
              Series Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="series-name"
              placeholder='e.g. "The Shadow Garden Trilogy"'
              value={seriesFields.seriesName || ""}
              onChange={(e) =>
                onChange({ ...seriesFields, seriesName: e.target.value })
              }
              maxLength={200}
              className={
                errors?.seriesName
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }
            />
            {errors?.seriesName && (
              <p className="text-sm text-red-600">{errors.seriesName}</p>
            )}
          </div>

          {/* Book Position */}
          <div className="space-y-2">
            <Label htmlFor="series-position" className="text-sm font-medium">
              Book Position <span className="text-red-500">*</span>
            </Label>
            <Select
              value={
                seriesFields.seriesPosition?.toString() || ""
              }
              onValueChange={(val) =>
                onChange({
                  ...seriesFields,
                  seriesPosition: parseInt(val),
                  // Clear bible selection if switching to Book 1
                  ...(parseInt(val) === 1
                    ? { seriesBibleId: undefined }
                    : {}),
                })
              }
            >
              <SelectTrigger
                className={
                  errors?.seriesPosition
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }
              >
                <SelectValue placeholder="Select book number" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    Book {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.seriesPosition && (
              <p className="text-sm text-red-600">{errors.seriesPosition}</p>
            )}
          </div>

          {/* Series Bible Selector (for Book 2+) */}
          {showBibleSelector && (
            <div className="space-y-2">
              <Label
                htmlFor="series-bible"
                className="text-sm font-medium"
              >
                Existing Series Bible
              </Label>
              {biblesLoading ? (
                <p className="text-sm text-muted-foreground">
                  Loading series bibles...
                </p>
              ) : seriesBibles.length > 0 ? (
                <Select
                  value={seriesFields.seriesBibleId || ""}
                  onValueChange={(val) =>
                    onChange({
                      ...seriesFields,
                      seriesBibleId: val || undefined,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a series bible" />
                  </SelectTrigger>
                  <SelectContent>
                    {seriesBibles.map((bible) => (
                      <SelectItem key={bible.id} value={bible.id}>
                        {bible.seriesName} ({bible.books.length}{" "}
                        {bible.books.length === 1 ? "book" : "books"})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No series bibles available yet. Generate Book 1 first to
                  create one.
                </p>
              )}

              {/* Series Bible Preview */}
              {selectedBible && (
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="p-3 space-y-1 text-sm">
                    <p className="font-medium">{selectedBible.seriesName}</p>
                    <p className="text-muted-foreground">
                      {selectedBible.books.length} book(s) &middot;{" "}
                      {selectedBible.characters.length} characters
                    </p>
                    {selectedBible.overallArc && (
                      <p className="text-muted-foreground line-clamp-2">
                        {selectedBible.overallArc}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Series Arc */}
          <div className="space-y-2">
            <Label htmlFor="series-arc" className="text-sm font-medium">
              Series Arc (Optional)
            </Label>
            <Textarea
              id="series-arc"
              placeholder="Describe the overarching story across the entire series..."
              value={seriesFields.seriesArc || ""}
              onChange={(e) =>
                onChange({ ...seriesFields, seriesArc: e.target.value })
              }
              rows={3}
              maxLength={2000}
              className="resize-none"
            />
            <span className="text-xs text-muted-foreground">
              {(seriesFields.seriesArc || "").length}/2000 characters
            </span>
          </div>

          {/* Summary badges */}
          {seriesFields.seriesName && seriesFields.seriesPosition && (
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                {seriesFields.seriesName}
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Book {seriesFields.seriesPosition}
              </Badge>
              {selectedBible && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Bible linked
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default SeriesModeFields;
