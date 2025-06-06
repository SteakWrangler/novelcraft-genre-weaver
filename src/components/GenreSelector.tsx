
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface GenreSelectorProps {
  selectedGenres: string[];
  onGenreChange: (genres: string[]) => void;
}

const GenreSelector = ({ selectedGenres, onGenreChange }: GenreSelectorProps) => {
  const genres = [
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
    { name: "Dystopian", color: "bg-zinc-100 text-zinc-800 hover:bg-zinc-200" }
  ];

  const toggleGenre = (genreName: string) => {
    if (selectedGenres.includes(genreName)) {
      onGenreChange(selectedGenres.filter(g => g !== genreName));
    } else {
      onGenreChange([...selectedGenres, genreName]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Genre Selection</CardTitle>
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
                className={`${genre.color} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
              >
                {isSelected && <X className="w-3 h-3 mr-1" />}
                {!isSelected && <Plus className="w-3 h-3 mr-1" />}
                {genre.name}
              </Button>
            );
          })}
        </div>

        {selectedGenres.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Selected Genres:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map((genre) => (
                <Badge key={genre} variant="secondary" className="px-3 py-1">
                  {genre}
                  <X 
                    className="w-3 h-3 ml-2 cursor-pointer hover:text-red-500" 
                    onClick={() => toggleGenre(genre)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GenreSelector;
