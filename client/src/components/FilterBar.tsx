import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedPosition: string | null;
  onPositionChange: (position: string | null) => void;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPosition,
  onPositionChange,
}: FilterBarProps) {
  const categories = [
    { value: 'player', label: '選手' },
    { value: 'coach', label: 'コーチ' },
    { value: 'staff', label: 'スタッフ' },
  ];

  const positions = [
    { value: 'pitcher', label: '投手' },
    { value: 'infielder', label: '内野手' },
    { value: 'outfielder', label: '外野手' },
    { value: 'catcher', label: '捕手' },
  ];

  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg border-l-4 border-primary space-y-4">
      <div className="space-y-2">
        <label style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }} className="text-sm text-muted-foreground">検索</label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="選手名や背番号で検索..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }} className="text-sm text-muted-foreground">カテゴリ</label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(null)}
            className="transition-all duration-300 ease-out"
          >
            すべて
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(selectedCategory === cat.value ? null : cat.value)}
              className="transition-all duration-300 ease-out"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }} className="text-sm text-muted-foreground">ポジション</label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedPosition === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPositionChange(null)}
            className="transition-all duration-300 ease-out"
          >
            すべて
          </Button>
          {positions.map((pos) => (
            <Button
              key={pos.value}
              variant={selectedPosition === pos.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPositionChange(selectedPosition === pos.value ? null : pos.value)}
              className="transition-all duration-300 ease-out"
            >
              {pos.label}
            </Button>
          ))}
        </div>
      </div>

      {(searchQuery || selectedCategory || selectedPosition) && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onSearchChange('');
            onCategoryChange(null);
            onPositionChange(null);
          }}
          className="w-full transition-all duration-300 ease-out"
        >
          <X className="h-4 w-4 mr-2" />
          フィルタをリセット
        </Button>
      )}
    </div>
  );
}
