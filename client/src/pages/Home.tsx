import { useState, useMemo } from 'react';
import PlayerCard from '@/components/PlayerCard';
import FilterBar from '@/components/FilterBar';
import { playersData, type Player, type TeamId } from '@/lib/playersData';

/**　
 * Design Philosophy: モダン・スポーツエレガンス
 * 深紺とゴールドを基調とした高級感のあるデザイン
 * 背番号を大きく表示し、各選手をカード型で表現
 * インタラクティブなフィルタリング機能を提供
 */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [teamFilter, setTeamFilter] = useState<"all" | TeamId>("all");

  const filteredPlayers = useMemo(() => {
    return playersData.filter((player) => {
      const matchesSearch =
        searchQuery === '' ||
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.number.includes(searchQuery);

      const matchesTeam = teamFilter === "all" || player.teamId === teamFilter;

      const matchesCategory = selectedCategory === null || player.category === selectedCategory;

      const matchesPosition =
        selectedPosition === null ||
        (selectedPosition === 'pitcher' && player.positionCategory === 'pitcher') ||
        (selectedPosition === 'infielder' && player.positionCategory === 'infielder') ||
        (selectedPosition === 'outfielder' && player.positionCategory === 'outfielder') ||
        (selectedPosition === 'catcher' && player.positionCategory === 'catcher');

      return matchesSearch && matchesTeam && matchesCategory && matchesPosition;
    });
  }, [searchQuery, teamFilter, selectedCategory, selectedPosition]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative w-full h-96 bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/aqCJqEB3RgnJcc0gWrN14u/sandbox/mKnVNwlxUYPksln7E2gNdl-img-1_1771047559000_na1fn_ZHJhZ29ucy1oZXJvLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYXFDSnFFQjNSZ25KY2MwZ1dyTjE0dS9zYW5kYm94L21LblZOd2x4VVlQa3NsbjdFMmdOZGwtaW1nLTFfMTc3MTA0NzU1OTAwMF9uYTFmbl9aSEpoWjI5dWN5MW9aWEp2TFdKbi5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=f4PYVGpWMXDY70-qBJkLgdVQ~UgVxtnDtM0V5oGV7rIjfdEThgn1c1o24EOuyfSr4umR2o59XB-rWKPeb~hQclTWC487jfE5TYUF4E77AQC13S0qGAPKCugyYyg7dZV-EENWpVzl0IHpbF-tNpEbWm4XcHtN-0YDcv9YWxwC5ShKR476sYqxEbX8GlMLJfvGFbMuDKhwcftu-32vcgWrhZph3AiVrB2ejkUiCvzHOggzQNbk5wardd4oddQCvHea0m5pWe1LW9UQPBSmWkpzDnsAvq-bCylhdt1W9MsfTPu6V~J1GvgI0ABycL2Zn1ysFlwnUTceNE9zMegadIz-5Q__)',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white">
          <h1 style={{ fontSize: '5rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }} className="mb-4">2026年</h1>
          <h2 style={{ fontSize: '3rem', fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="mb-2">中日ドラゴンズ</h2>
          <p className="text-lg font-light">選手・スタッフ名鑑</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gradient-to-b from-background via-background to-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filter */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                {/* Team Filter */}
                <div className="mb-4 rounded-lg border border-border bg-card p-3 shadow-sm">
                  <div className="mb-2 text-sm font-semibold text-foreground">球団</div>

                  <div className="flex flex-wrap gap-2">
  {/* All */}
  <button
    className={`rounded px-3 py-1 text-sm ${
      teamFilter === "all"
        ? "bg-foreground text-background"
        : "bg-muted text-foreground"
    }`}
    onClick={() => setTeamFilter("all")}
    type="button"
  >
    All
  </button>

  {/* Teams auto-generated */}
  {Object.entries(TEAMS).map(([teamId, teamName]) => (
    <button
      key={teamId}
      className={`rounded px-3 py-1 text-sm ${
        teamFilter === teamId
          ? "bg-foreground text-background"
          : "bg-muted text-foreground"
      }`}
      onClick={() => setTeamFilter(teamId as TeamId)}
      type="button"
    >
      {teamName}
    </button>
  ))}
</div>                </div>

                <FilterBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedPosition={selectedPosition}
                  onPositionChange={setSelectedPosition}
                />
              </div>
            </div>

            {/* Players Grid */}
            <div className="lg:col-span-3">
              <div className="mb-8 pb-6 border-b border-border">
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }} className="text-foreground">
                  {filteredPlayers.length} 件の結果
                </h3>
              </div>

              {filteredPlayers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
                  {filteredPlayers.map((player, index) => (
                    <div
                      key={`${player.number}-${player.name}`}
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                      }}
                    >
                      <PlayerCard player={player} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-card text-card-foreground rounded-lg p-12 text-center shadow-md">
                  <p className="text-muted-foreground text-lg">
                    検索条件に該当する選手がいません
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}