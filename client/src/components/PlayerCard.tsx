import { Player } from '@/lib/playersData';

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const getPositionBadgeColor = (category: string) => {
    switch (category) {
      case 'pitcher':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'infielder':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'outfielder':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
      case 'catcher':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'pitcher':
        return '投手';
      case 'infielder':
        return '内野手';
      case 'outfielder':
        return '外野手';
      case 'catcher':
        return '捕手';
      case 'coach':
        return 'コーチ';
      case 'staff':
        return 'スタッフ';
      default:
        return '';
    }
  };

  return (
    <div className="gold-border-left hover-lift bg-card text-card-foreground rounded-lg p-6 shadow-lg hover:shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div style={{ fontSize: '3.5rem', fontFamily: 'Playfair Display, serif', fontWeight: 800, lineHeight: 1 }} className="text-primary">{player.number}</div>
        {player.positionCategory && (
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getPositionBadgeColor(player.positionCategory)}`}>
            {getCategoryLabel(player.positionCategory)}
          </span>
        )}
        {player.category === 'coach' && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
            コーチ
          </span>
        )}
        {player.category === 'staff' && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            スタッフ
          </span>
        )}
      </div>

      <h3 style={{ fontSize: '1.5rem', fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }} className="mb-2">{player.name}</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">ポジション</span>
          <span className="font-medium">{player.position}</span>
        </div>

        {player.age > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">年齢</span>
            <span className="font-medium">{player.age}歳</span>
          </div>
        )}

        {player.draft && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">ドラフト</span>
            <span className="font-medium">{player.draft}</span>
          </div>
        )}
      </div>
    </div>
  );
}
