import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, DollarSign, Clock, BookOpen } from "lucide-react";
import { CostEstimate, BookFormat } from "@/types";
import { getFormatDetails } from "@/lib/costCalculator";

interface CostConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  estimate: CostEstimate | null;
  bookDetails: {
    title: string;
    format: BookFormat;
    pages: number;
    genre: string;
    qualityLevel: string;
  };
  isGenerating?: boolean;
}

const CostConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  estimate,
  bookDetails,
  isGenerating = false
}: CostConfirmationModalProps) => {
  if (!estimate) return null;

  const formatDetails = getFormatDetails(bookDetails.format);
  
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'low': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Confirm Generation Cost
          </DialogTitle>
          <DialogDescription>
            Review the estimated cost before proceeding with book generation
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Cost Display */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700 mb-1">
                ${estimate.range.min.toFixed(2)} - ${estimate.range.max.toFixed(2)}
              </div>
              <div className="text-sm text-blue-600 mb-2">
                Best estimate: ${estimate.estimated.toFixed(2)}
              </div>
              <Badge 
                variant="outline" 
                className={getConfidenceColor(estimate.confidence)}
              >
                {estimate.confidence} confidence
              </Badge>
            </div>
          </div>
          
          {/* Book Details */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Title:</span>
                  <span className="font-medium text-right max-w-24 truncate" title={bookDetails.title}>
                    {bookDetails.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">{formatDetails.name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Length:</span>
                  <span className="font-medium">{bookDetails.pages} pages</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quality:</span>
                  <span className="font-medium capitalize">{bookDetails.qualityLevel}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded p-2">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-gray-600">Est. time:</span>
              </div>
              <span className="font-medium">{formatDetails.estimatedTime}</span>
            </div>
          </div>
          
          {/* Cost Breakdown */}
          {estimate.breakdown && (
            <div className="text-xs space-y-1 bg-gray-50 rounded p-3">
              <div className="font-medium text-gray-700 mb-2">Cost Breakdown:</div>
              <div className="flex justify-between">
                <span>Content generation:</span>
                <span>${(estimate.breakdown.plotting + estimate.breakdown.characters + estimate.breakdown.writing).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Quality assurance:</span>
                <span>${(estimate.breakdown.editing + estimate.breakdown.review + estimate.breakdown.polish).toFixed(2)}</span>
              </div>
              {estimate.breakdown.enhancements > 0 && (
                <div className="flex justify-between">
                  <span>Enhancements:</span>
                  <span>${estimate.breakdown.enhancements.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-1 font-medium">
                <span>Subtotal:</span>
                <span>${estimate.breakdown.base.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          {/* Warning */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-sm">Cost Estimate</AlertTitle>
            <AlertDescription className="text-xs">
              This is an estimate based on your selections. Actual costs may vary by ±20% depending on content complexity and the number of AI iterations required.
            </AlertDescription>
          </Alert>
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isGenerating}
            size="sm"
          >
            Modify Settings
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            size="sm"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                Generating...
              </div>
            ) : (
              <>
                <BookOpen className="w-4 h-4 mr-1" />
                Generate Book • ${estimate.estimated.toFixed(2)}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CostConfirmationModal;