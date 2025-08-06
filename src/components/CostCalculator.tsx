import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  Info, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Zap
} from "lucide-react";
import { BookFormat, CostEstimate, QualityLevel } from "@/types";
import { calculateEstimatedCost, getFormatDetails } from "@/lib/costCalculator";

interface CostCalculatorProps {
  pages: number;
  format: BookFormat;
  genre: string;
  qualityLevel?: QualityLevel;
  options?: {
    perspective?: string;
    bigTwist?: boolean;
    romanticSubplot?: boolean;
    happyEnding?: boolean;
    specialRequests?: string;
    illustrationCount?: number;
  };
  className?: string;
}

const CostCalculator = ({ 
  pages, 
  format = 'novel', 
  genre, 
  qualityLevel = 'premium',
  options = {},
  className = ""
}: CostCalculatorProps) => {
  const [estimate, setEstimate] = useState<CostEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    const calculateCost = async () => {
      setIsLoading(true);
      try {
        // Add small delay to debounce rapid changes
        await new Promise(resolve => setTimeout(resolve, 100));
        const newEstimate = calculateEstimatedCost(
          pages, 
          format, 
          genre, 
          qualityLevel, 
          options
        );
        setEstimate(newEstimate);
      } catch (error) {
        console.error('Error calculating cost:', error);
      } finally {
        setIsLoading(false);
      }
    };

    calculateCost();
  }, [pages, format, genre, qualityLevel, options]);

  const formatDetails = getFormatDetails(format);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getQualityBadgeColor = (quality: QualityLevel) => {
    switch (quality) {
      case 'basic': return 'bg-gray-100 text-gray-700';
      case 'premium': return 'bg-blue-100 text-blue-700';
      case 'professional': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (!estimate) {
    return (
      <Card className={`bg-gray-50 border-gray-200 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            <span className="text-sm text-gray-600">Calculating cost...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <h3 className="font-semibold text-green-800">Estimated Cost</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={getQualityBadgeColor(qualityLevel)}
            >
              {qualityLevel}
            </Badge>
            <Badge 
              variant="outline" 
              className={getConfidenceColor(estimate.confidence)}
            >
              {estimate.confidence} confidence
            </Badge>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-pulse">
              <div className="h-8 bg-green-200 rounded w-32 mx-auto mb-2"></div>
              <div className="h-4 bg-green-100 rounded w-24 mx-auto"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                ${estimate.range.min.toFixed(2)} - ${estimate.range.max.toFixed(2)}
              </div>
              <div className="text-sm text-green-600">
                Best estimate: ${estimate.estimated.toFixed(2)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">{formatDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Length:</span>
                  <span className="font-medium">{pages} pages</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Word count:</span>
                  <span className="font-medium">{formatDetails.wordRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Est. time:</span>
                  <span className="font-medium">{formatDetails.estimatedTime}</span>
                </div>
              </div>
            </div>

            {showBreakdown && (
              <div className="space-y-2 text-sm border-t pt-3">
                <div className="flex justify-between">
                  <span>Base generation:</span>
                  <span>${estimate.breakdown.base.toFixed(2)}</span>
                </div>
                {estimate.breakdown.enhancements > 0 && (
                  <div className="flex justify-between">
                    <span>Enhancements:</span>
                    <span className="text-blue-600">+${estimate.breakdown.enhancements.toFixed(2)}</span>
                  </div>
                )}
                {estimate.breakdown.illustrations > 0 && (
                  <div className="flex justify-between">
                    <span>Illustrations:</span>
                    <span className="text-purple-600">+${estimate.breakdown.illustrations.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 font-medium">
                  <span>Retry buffer:</span>
                  <span className="text-amber-600">+20-40%</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="text-xs text-green-700 hover:text-green-800 hover:bg-green-100"
              >
                {showBreakdown ? 'Hide' : 'Show'} breakdown
              </Button>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-green-600 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="space-y-2 text-sm">
                      <div className="font-medium border-b pb-1">How we calculate costs</div>
                      <div>• Based on OpenAI GPT-4o pricing</div>
                      <div>• Includes token usage for all AI agents</div>
                      <div>• Accounts for format complexity</div>
                      <div>• Includes 20-40% buffer for retries</div>
                      <div className="text-xs text-muted-foreground pt-1">
                        * Actual cost may vary ±20% based on content complexity
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="text-xs text-green-600 text-center bg-green-100/50 rounded p-2">
              <Zap className="w-3 h-3 inline mr-1" />
              Cost updates automatically as you modify options
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CostCalculator;