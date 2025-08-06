import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface OptionWithCostImpactProps {
  costDelta: number;
  children: React.ReactNode;
  className?: string;
}

const OptionWithCostImpact = ({ costDelta, children, className = "" }: OptionWithCostImpactProps) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex-1">
        {children}
      </div>
      {costDelta !== 0 && (
        <div className="flex items-center gap-1 ml-3">
          {costDelta > 0 ? (
            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 text-xs px-2 py-0.5">
              <TrendingUp className="w-3 h-3 mr-1" />
              +${Math.abs(costDelta).toFixed(2)}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs px-2 py-0.5">
              <TrendingDown className="w-3 h-3 mr-1" />
              -${Math.abs(costDelta).toFixed(2)}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionWithCostImpact;