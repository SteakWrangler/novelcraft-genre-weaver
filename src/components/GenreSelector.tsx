
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { GenreSelectorProps, Genre } from "@/types";

interface ExtendedGenreSelectorProps extends GenreSelectorProps {
  error?: string;
}

const GenreSelector = ({ selectedGenres, onGenreChange, error }: ExtendedGenreSelectorProps) => {
  const genres: Genre[] = [
    { name: "Romance", color: "bg-pink-100 text-pink-800 hover:bg-pink-200" },
    { name: "Fantasy", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
    { name: "Science Fiction", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    { name: "Mystery", color: "bg-gray-100 text-gray-800 hover:bg-gray-200" },
    { name: "Thriller", color: "bg-red-100 text-red-800 hover:bg-red-200" },
    { name: "Horror", color: "bg-orange-100 text-orange-800 hover:bg-orange-200" },
    { name: "Historical Fiction", color: "bg-amber-100 text-amber-800 hover:bg-amber-200" },
    { name: "Contemporary Fiction", color: "bg-green-100 text-green-800 hover:bg-green-200" },
    { name: "Young Adult", color: "bg-teal-100 text-teal-800 hover:bg-teal-200" },
    { name: "Adventure", color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" },
    { name: "Comedy", color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
    { name: "Drama", color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200" },
    { name: "Western", color: "bg-stone-100 text-stone-800 hover:bg-stone-200" },
    { name: "Crime", color: "bg-slate-100 text-slate-800 hover:bg-slate-200" },
    { name: "Paranormal", color: "bg-violet-100 text-violet-800 hover:bg-violet-200" },
    { name: "Dystopian", color: "bg-zinc-100 text-zinc-800 hover:bg-zinc-200" },
    { name: "Literary Fiction", color: "bg-rose-100 text-rose-800 hover:bg-rose-200" },
    { name: "Magical Realism", color: "bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200" },
    { name: "Biographical", color: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200" },
    { name: "Memoir", color: "bg-lime-100 text-lime-800 hover:bg-lime-200" },
    { name: "Urban Fantasy", color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200" },
    { name: "Space Opera", color: "bg-sky-100 text-sky-800 hover:bg-sky-200" },
    { name: "Cyberpunk", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
    { name: "Steampunk", color: "bg-amber-100 text-amber-800 hover:bg-amber-200" },
    { name: "Post-Apocalyptic", color: "bg-gray-100 text-gray-800 hover:bg-gray-200" },
    { name: "Cozy Mystery", color: "bg-green-100 text-green-800 hover:bg-green-200" },
    { name: "Psychological Thriller", color: "bg-red-100 text-red-800 hover:bg-red-200" },
    { name: "Gothic", color: "bg-gray-100 text-gray-800 hover:bg-gray-200" },
    { name: "Satire", color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
    { name: "Alternate History", color: "bg-amber-100 text-amber-800 hover:bg-amber-200" }
  ];

  const toggleGenre = (genreName: string) => {
    if (selectedGenres.includes(genreName)) {
      onGenreChange(selectedGenres.filter(g => g !== genreName));
    } else {
      onGenreChange([...selectedGenres, genreName]);
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-base sm:text-lg">Genre Selection</CardTitle>
        <p className="text-sm text-muted-foreground">
          Mix and match genres to create unique stories
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => {
            const isSelected = selectedGenres.includes(genre.name);
            return (
              <Button
                key={genre.name}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => toggleGenre(genre.name)}
                className={`${genre.color} ${isSelected ? 'ring-2 ring-blue-500' : ''} text-xs sm:text-sm transition-all duration-200`}
              >
                {isSelected && <X className="w-3 h-3 mr-1 flex-shrink-0" />}
                {!isSelected && <Plus className="w-3 h-3 mr-1 flex-shrink-0" />}
                <span className="truncate">{genre.name}</span>
              </Button>
            );
          })}
        </div>

        {selectedGenres.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <h4 className="font-medium text-sm">Selected Genres ({selectedGenres.length}):</h4>
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map((genre) => {
                const genreInfo = genres.find(g => g.name === genre);
                return (
                  <Badge key={genre} variant="secondary" className={`px-3 py-1 ${genreInfo?.color || ''}`}>
                    <span className="truncate">{genre}</span>
                    <X 
                      className="w-3 h-3 ml-2 cursor-pointer hover:text-red-500 flex-shrink-0 transition-colors" 
                      onClick={() => toggleGenre(genre)}
                    />
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
        {error && (
          <div className="pt-2 border-t mt-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GenreSelector;
