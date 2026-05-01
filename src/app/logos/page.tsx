export default function LogoConcepts() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">Direction artistique</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Nouveaux concepts logo Speakli</h1>
          <p className="text-gray-500">L'éléphant reste — redessiné de A à Z. 4 directions stylistiques.</p>
        </div>

        <div className="space-y-8">

          {/* ── CONCEPT A ── Géométrique plat */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-5">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Option A</span>
              <h2 className="text-xl font-bold text-gray-900 mt-1">Géométrique Plat</h2>
              <p className="text-gray-500 text-sm mt-1">Formes pures, proportions modernes. Fonctionne à toutes les tailles, du favicon au panneau.</p>
            </div>
            {/* Logotype horizontal */}
            <div className="mb-5">
              <p className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">Logotype horizontal</p>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 inline-block">
                <svg width="220" height="48" viewBox="0 0 220 48" fill="none">
                  {/* Body */}
                  <ellipse cx="22" cy="31" rx="16" ry="13" fill="#1d4ed8"/>
                  {/* Ear — large, behind head */}
                  <ellipse cx="29" cy="20" rx="9" ry="11" fill="#1565C0" transform="rotate(-15 29 20)"/>
                  {/* Head */}
                  <circle cx="36" cy="22" r="13" fill="#1d4ed8"/>
                  {/* Trunk — curves down then forward */}
                  <path d="M47 28 Q54 34 50 41 Q47 46 43 42" stroke="#1d4ed8" strokeWidth="6" strokeLinecap="round" fill="none"/>
                  {/* Legs */}
                  <rect x="10" y="40" width="7" height="8" rx="3.5" fill="#1d4ed8"/>
                  <rect x="20" y="41" width="7" height="7" rx="3.5" fill="#1d4ed8"/>
                  <rect x="29" y="40" width="7" height="8" rx="3.5" fill="#1565C0"/>
                  {/* Tail */}
                  <path d="M6 28 Q2 25 4 30 Q2 35 6 32" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  {/* Eye */}
                  <circle cx="40" cy="19" r="2" fill="white"/>
                  {/* Speech bubble at trunk tip */}
                  <circle cx="40" cy="44" r="5" fill="white" stroke="#1d4ed8" strokeWidth="1.5"/>
                  <rect x="37.5" y="42" width="1.5" height="4" rx="0.75" fill="#1d4ed8"/>
                  <rect x="40" y="41" width="1.5" height="6" rx="0.75" fill="#1d4ed8"/>
                  <rect x="42.5" y="42" width="1.5" height="4" rx="0.75" fill="#1d4ed8"/>
                  {/* Wordmark */}
                  <text x="62" y="31" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="22" fill="#0f172a" letterSpacing="-0.8">Speakli</text>
                </svg>
              </div>
            </div>
            {/* Icône seule */}
            <div className="flex items-end gap-4 flex-wrap">
              <div>
                <p className="text-xs text-gray-400 mb-2">Sur blanc · 48px</p>
                <div className="bg-white border border-gray-100 rounded-2xl p-3">
                  <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
                    <ellipse cx="22" cy="35" rx="18" ry="14" fill="#1d4ed8"/>
                    <ellipse cx="31" cy="22" rx="10" ry="12" fill="#1565C0" transform="rotate(-15 31 22)"/>
                    <circle cx="40" cy="24" r="15" fill="#1d4ed8"/>
                    <path d="M53 31 Q62 39 57 48 Q53 54 48 48" stroke="#1d4ed8" strokeWidth="7" strokeLinecap="round" fill="none"/>
                    <rect x="10" y="45" width="8" height="9" rx="4" fill="#1d4ed8"/>
                    <rect x="22" y="46" width="8" height="8" rx="4" fill="#1d4ed8"/>
                    <rect x="32" y="45" width="8" height="9" rx="4" fill="#1565C0"/>
                    <path d="M5 32 Q0 28 3 34 Q0 40 5 37" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <circle cx="44" cy="20" r="2.5" fill="white"/>
                    <circle cx="45" cy="51" r="6" fill="white" stroke="#1d4ed8" strokeWidth="2"/>
                    <rect x="42.5" y="48.5" width="2" height="5" rx="1" fill="#1d4ed8"/>
                    <rect x="45.5" y="47.5" width="2" height="7" rx="1" fill="#1d4ed8"/>
                    <rect x="48.5" y="48.5" width="2" height="5" rx="1" fill="#1d4ed8"/>
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Sur bleu · 48px</p>
                <div className="bg-blue-700 rounded-2xl p-3">
                  <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
                    <ellipse cx="22" cy="35" rx="18" ry="14" fill="white" opacity="0.9"/>
                    <ellipse cx="31" cy="22" rx="10" ry="12" fill="white" opacity="0.7" transform="rotate(-15 31 22)"/>
                    <circle cx="40" cy="24" r="15" fill="white" opacity="0.9"/>
                    <path d="M53 31 Q62 39 57 48 Q53 54 48 48" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.9"/>
                    <rect x="10" y="45" width="8" height="9" rx="4" fill="white" opacity="0.9"/>
                    <rect x="22" y="46" width="8" height="8" rx="4" fill="white" opacity="0.9"/>
                    <rect x="32" y="45" width="8" height="9" rx="4" fill="white" opacity="0.7"/>
                    <circle cx="44" cy="20" r="2.5" fill="#1d4ed8"/>
                    <circle cx="45" cy="51" r="6" fill="#1d4ed8" stroke="white" strokeWidth="2"/>
                    <rect x="42.5" y="48.5" width="2" height="5" rx="1" fill="white"/>
                    <rect x="45.5" y="47.5" width="2" height="7" rx="1" fill="white"/>
                    <rect x="48.5" y="48.5" width="2" height="5" rx="1" fill="white"/>
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Favicon · 24px</p>
                <div className="bg-white border border-gray-100 rounded-lg p-2">
                  <svg width="24" height="24" viewBox="0 0 56 56" fill="none">
                    <ellipse cx="22" cy="35" rx="18" ry="14" fill="#1d4ed8"/>
                    <ellipse cx="31" cy="22" rx="10" ry="12" fill="#1565C0" transform="rotate(-15 31 22)"/>
                    <circle cx="40" cy="24" r="15" fill="#1d4ed8"/>
                    <path d="M53 31 Q62 39 57 48 Q53 54 48 48" stroke="#1d4ed8" strokeWidth="7" strokeLinecap="round" fill="none"/>
                    <circle cx="45" cy="51" r="6" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── CONCEPT B ── Badge arrondi */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-5">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Option B</span>
              <h2 className="text-xl font-bold text-gray-900 mt-1">Badge Arrondi</h2>
              <p className="text-gray-500 text-sm mt-1">L'éléphant dans un badge carré arrondi — format app icon. Très reconnaissable, déclinable partout.</p>
            </div>
            <div className="mb-5">
              <p className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">Logotype horizontal</p>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 inline-block">
                <svg width="220" height="48" viewBox="0 0 220 48" fill="none">
                  {/* Badge background */}
                  <rect width="48" height="48" rx="14" fill="#1d4ed8"/>
                  {/* Elephant white on blue */}
                  <ellipse cx="19" cy="32" rx="13" ry="10" fill="white" opacity="0.9"/>
                  <ellipse cx="27" cy="21" rx="8" ry="9" fill="white" opacity="0.75" transform="rotate(-10 27 21)"/>
                  <circle cx="34" cy="22" r="11" fill="white" opacity="0.9"/>
                  <path d="M43 27 Q49 33 46 39 Q43 43 40 39" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"/>
                  <rect x="10" y="39" width="5" height="7" rx="2.5" fill="white" opacity="0.9"/>
                  <rect x="18" y="40" width="5" height="6" rx="2.5" fill="white" opacity="0.9"/>
                  <rect x="26" y="39" width="5" height="7" rx="2.5" fill="white" opacity="0.75"/>
                  <circle cx="37" cy="19" r="2" fill="#1d4ed8"/>
                  {/* Speech bubble white */}
                  <circle cx="38" cy="41" r="4.5" fill="#1d4ed8"/>
                  <rect x="36" y="39" width="1.5" height="4" rx="0.75" fill="white"/>
                  <rect x="38.2" y="38" width="1.5" height="6" rx="0.75" fill="white"/>
                  <rect x="40.5" y="39" width="1.5" height="4" rx="0.75" fill="white"/>
                  {/* Wordmark */}
                  <text x="62" y="31" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="22" fill="#0f172a" letterSpacing="-0.8">Speakli</text>
                </svg>
              </div>
            </div>
            <div className="flex items-end gap-4 flex-wrap">
              <div>
                <p className="text-xs text-gray-400 mb-2">Icône · 48px</p>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="14" fill="#1d4ed8"/>
                  <ellipse cx="19" cy="32" rx="13" ry="10" fill="white" opacity="0.9"/>
                  <ellipse cx="27" cy="21" rx="8" ry="9" fill="white" opacity="0.7" transform="rotate(-10 27 21)"/>
                  <circle cx="34" cy="22" r="11" fill="white" opacity="0.9"/>
                  <path d="M43 27 Q49 33 46 39 Q43 43 40 39" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"/>
                  <rect x="10" y="39" width="5" height="7" rx="2.5" fill="white" opacity="0.9"/>
                  <rect x="18" y="40" width="5" height="6" rx="2.5" fill="white" opacity="0.9"/>
                  <rect x="26" y="39" width="5" height="7" rx="2.5" fill="white" opacity="0.7"/>
                  <circle cx="37" cy="19" r="2" fill="#1d4ed8"/>
                  <circle cx="38" cy="41" r="4" fill="#1d4ed8"/>
                  <rect x="36.2" y="39.2" width="1.5" height="3.6" rx="0.75" fill="white"/>
                  <rect x="38.2" y="38.2" width="1.5" height="5.6" rx="0.75" fill="white"/>
                  <rect x="40.2" y="39.2" width="1.5" height="3.6" rx="0.75" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Light · 48px</p>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="14" fill="#EFF6FF"/>
                  <ellipse cx="19" cy="32" rx="13" ry="10" fill="#1d4ed8" opacity="0.9"/>
                  <ellipse cx="27" cy="21" rx="8" ry="9" fill="#1565C0" opacity="0.8" transform="rotate(-10 27 21)"/>
                  <circle cx="34" cy="22" r="11" fill="#1d4ed8"/>
                  <path d="M43 27 Q49 33 46 39 Q43 43 40 39" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" fill="none"/>
                  <rect x="10" y="39" width="5" height="7" rx="2.5" fill="#1d4ed8" opacity="0.9"/>
                  <rect x="18" y="40" width="5" height="6" rx="2.5" fill="#1d4ed8" opacity="0.9"/>
                  <rect x="26" y="39" width="5" height="7" rx="2.5" fill="#1565C0"/>
                  <circle cx="37" cy="19" r="2" fill="white"/>
                  <circle cx="38" cy="41" r="4" fill="white" stroke="#1d4ed8" strokeWidth="1.5"/>
                  <rect x="36.2" y="39.2" width="1.5" height="3.6" rx="0.75" fill="#1d4ed8"/>
                  <rect x="38.2" y="38.2" width="1.5" height="5.6" rx="0.75" fill="#1d4ed8"/>
                  <rect x="40.2" y="39.2" width="1.5" height="3.6" rx="0.75" fill="#1d4ed8"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ── CONCEPT C ── Minimaliste tête de profil */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-5">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Option C</span>
              <h2 className="text-xl font-bold text-gray-900 mt-1">Tête Minimaliste</h2>
              <p className="text-gray-500 text-sm mt-1">Juste la tête de profil — plus épuré, plus premium. La trompe devient la bulle vocale.</p>
            </div>
            <div className="mb-5">
              <p className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">Logotype horizontal</p>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 inline-block">
                <svg width="220" height="48" viewBox="0 0 220 48" fill="none">
                  {/* Ear */}
                  <ellipse cx="14" cy="22" rx="10" ry="16" fill="#BFDBFE"/>
                  <ellipse cx="15" cy="22" rx="6" ry="11" fill="#1d4ed8"/>
                  {/* Head */}
                  <circle cx="30" cy="22" r="18" fill="#1d4ed8"/>
                  {/* Trunk curves down from nose */}
                  <path d="M46 30 Q52 36 52 44" stroke="#1d4ed8" strokeWidth="8" strokeLinecap="round" fill="none"/>
                  {/* Eye */}
                  <circle cx="36" cy="18" r="3" fill="white"/>
                  <circle cx="37" cy="17" r="1.2" fill="#1d4ed8"/>
                  {/* Tusk */}
                  <path d="M44 34 Q50 38 47 44 Q44 48 42 44" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                  {/* Speech bubble */}
                  <circle cx="52" cy="44" r="6" fill="white" stroke="#1d4ed8" strokeWidth="2"/>
                  <rect x="49.8" y="42" width="1.8" height="4" rx="0.9" fill="#1d4ed8"/>
                  <rect x="52.2" y="41" width="1.8" height="6" rx="0.9" fill="#1d4ed8"/>
                  <rect x="54.6" y="42" width="1.8" height="4" rx="0.9" fill="#1d4ed8"/>
                  {/* Wordmark */}
                  <text x="70" y="31" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="22" fill="#0f172a" letterSpacing="-0.8">Speakli</text>
                </svg>
              </div>
            </div>
            <div className="flex items-end gap-4 flex-wrap">
              <div>
                <p className="text-xs text-gray-400 mb-2">Icône · 48px</p>
                <div className="bg-white border border-gray-100 rounded-2xl p-3">
                  <svg width="48" height="48" viewBox="0 0 62 62" fill="none">
                    <ellipse cx="14" cy="26" rx="11" ry="18" fill="#BFDBFE"/>
                    <ellipse cx="15" cy="26" rx="7" ry="13" fill="#1d4ed8"/>
                    <circle cx="33" cy="26" r="20" fill="#1d4ed8"/>
                    <path d="M51 35 Q58 43 58 53" stroke="#1d4ed8" strokeWidth="9" strokeLinecap="round" fill="none"/>
                    <circle cx="37" cy="21" r="3.5" fill="white"/>
                    <circle cx="38" cy="20" r="1.5" fill="#1d4ed8"/>
                    <path d="M50 42 Q57 47 54 54 Q51 59 49 54" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.5"/>
                    <circle cx="58" cy="54" r="7" fill="white" stroke="#1d4ed8" strokeWidth="2"/>
                    <rect x="55.5" y="51.5" width="2" height="5" rx="1" fill="#1d4ed8"/>
                    <rect x="58" y="50.5" width="2" height="7" rx="1" fill="#1d4ed8"/>
                    <rect x="60.5" y="51.5" width="2" height="5" rx="1" fill="#1d4ed8"/>
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Sur bleu · 48px</p>
                <div className="bg-blue-700 rounded-2xl p-3">
                  <svg width="48" height="48" viewBox="0 0 62 62" fill="none">
                    <ellipse cx="14" cy="26" rx="11" ry="18" fill="white" opacity="0.3"/>
                    <ellipse cx="15" cy="26" rx="7" ry="13" fill="white" opacity="0.7"/>
                    <circle cx="33" cy="26" r="20" fill="white" opacity="0.9"/>
                    <path d="M51 35 Q58 43 58 53" stroke="white" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.9"/>
                    <circle cx="37" cy="21" r="3.5" fill="#1d4ed8"/>
                    <circle cx="58" cy="54" r="7" fill="#1d4ed8"/>
                    <rect x="55.5" y="51.5" width="2" height="5" rx="1" fill="white"/>
                    <rect x="58" y="50.5" width="2" height="7" rx="1" fill="white"/>
                    <rect x="60.5" y="51.5" width="2" height="5" rx="1" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── CONCEPT D ── Silhouette affinée (closest to original) */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-5">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Option D</span>
              <h2 className="text-xl font-bold text-gray-900 mt-1">Silhouette Affinée</h2>
              <p className="text-gray-500 text-sm mt-1">Le plus proche de l'original — mêmes proportions mais redessiné avec précision et la bulle mieux intégrée.</p>
            </div>
            <div className="mb-5">
              <p className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">Logotype horizontal</p>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 inline-block">
                <svg width="220" height="52" viewBox="0 0 220 52" fill="none">
                  {/* Tail */}
                  <path d="M7 30 Q3 26 5 32 Q3 38 8 35" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  {/* Body */}
                  <ellipse cx="26" cy="33" rx="19" ry="14" fill="#1d4ed8"/>
                  {/* Rear legs */}
                  <rect x="12" y="43" width="8" height="9" rx="4" fill="#1d4ed8"/>
                  <rect x="24" y="44" width="8" height="8" rx="4" fill="#1d4ed8"/>
                  {/* Ear — large, distinctive, slightly lighter */}
                  <path d="M32 12 Q24 6 18 14 Q14 20 20 26 Q26 30 34 24 Z" fill="#1565C0"/>
                  {/* Head */}
                  <circle cx="38" cy="22" r="16" fill="#1d4ed8"/>
                  {/* Front legs */}
                  <rect x="32" y="43" width="8" height="9" rx="4" fill="#1565C0"/>
                  <rect x="43" y="42" width="8" height="10" rx="4" fill="#1565C0"/>
                  {/* Trunk — distinctive S-curve */}
                  <path d="M52 28 Q60 32 58 40 Q56 46 50 44 Q46 43 48 38" stroke="#1d4ed8" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  {/* Eye */}
                  <circle cx="43" cy="18" r="2.5" fill="white"/>
                  <circle cx="44" cy="17" r="1" fill="#1d4ed8"/>
                  {/* Speech bubble — floats near trunk tip */}
                  <circle cx="52" cy="46" r="5.5" fill="white" stroke="#1d4ed8" strokeWidth="1.5"/>
                  <rect x="50" y="44" width="1.5" height="4" rx="0.75" fill="#1d4ed8"/>
                  <rect x="52.2" y="43" width="1.5" height="6" rx="0.75" fill="#1d4ed8"/>
                  <rect x="54.5" y="44" width="1.5" height="4" rx="0.75" fill="#1d4ed8"/>
                  {/* Wordmark */}
                  <text x="68" y="32" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="22" fill="#0f172a" letterSpacing="-0.8">Speakli</text>
                </svg>
              </div>
            </div>
            <div className="flex items-end gap-4 flex-wrap">
              <div>
                <p className="text-xs text-gray-400 mb-2">Icône · 48px</p>
                <div className="bg-white border border-gray-100 rounded-2xl p-2">
                  <svg width="48" height="52" viewBox="0 0 60 56" fill="none">
                    <path d="M7 30 Q3 26 5 32 Q3 38 8 35" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <ellipse cx="26" cy="33" rx="19" ry="14" fill="#1d4ed8"/>
                    <rect x="12" y="43" width="8" height="9" rx="4" fill="#1d4ed8"/>
                    <rect x="24" y="44" width="8" height="8" rx="4" fill="#1d4ed8"/>
                    <path d="M32 12 Q24 6 18 14 Q14 20 20 26 Q26 30 34 24 Z" fill="#1565C0"/>
                    <circle cx="38" cy="22" r="16" fill="#1d4ed8"/>
                    <rect x="32" y="43" width="8" height="9" rx="4" fill="#1565C0"/>
                    <rect x="43" y="42" width="8" height="10" rx="4" fill="#1565C0"/>
                    <path d="M52 28 Q60 32 58 40 Q56 46 50 44 Q46 43 48 38" stroke="#1d4ed8" strokeWidth="7" strokeLinecap="round" fill="none"/>
                    <circle cx="43" cy="18" r="2.5" fill="white"/>
                    <circle cx="52" cy="46" r="5.5" fill="white" stroke="#1d4ed8" strokeWidth="1.5"/>
                    <rect x="50" y="44" width="1.5" height="4" rx="0.75" fill="#1d4ed8"/>
                    <rect x="52.2" y="43" width="1.5" height="6" rx="0.75" fill="#1d4ed8"/>
                    <rect x="54.5" y="44" width="1.5" height="4" rx="0.75" fill="#1d4ed8"/>
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Fond bleu · 48px</p>
                <div className="bg-blue-700 rounded-2xl p-3">
                  <svg width="48" height="48" viewBox="0 0 60 56" fill="none">
                    <path d="M7 30 Q3 26 5 32 Q3 38 8 35" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7"/>
                    <ellipse cx="26" cy="33" rx="19" ry="14" fill="white" opacity="0.9"/>
                    <rect x="12" y="43" width="8" height="9" rx="4" fill="white" opacity="0.9"/>
                    <rect x="24" y="44" width="8" height="8" rx="4" fill="white" opacity="0.9"/>
                    <path d="M32 12 Q24 6 18 14 Q14 20 20 26 Q26 30 34 24 Z" fill="white" opacity="0.6"/>
                    <circle cx="38" cy="22" r="16" fill="white" opacity="0.9"/>
                    <rect x="32" y="43" width="8" height="9" rx="4" fill="white" opacity="0.6"/>
                    <rect x="43" y="42" width="8" height="10" rx="4" fill="white" opacity="0.6"/>
                    <path d="M52 28 Q60 32 58 40 Q56 46 50 44 Q46 43 48 38" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.9"/>
                    <circle cx="43" cy="18" r="2.5" fill="#1d4ed8"/>
                    <circle cx="52" cy="46" r="5.5" fill="#1d4ed8"/>
                    <rect x="50" y="44" width="1.5" height="4" rx="0.75" fill="white"/>
                    <rect x="52.2" y="43" width="1.5" height="6" rx="0.75" fill="white"/>
                    <rect x="54.5" y="44" width="1.5" height="4" rx="0.75" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
          <p className="text-sm text-blue-900 font-semibold mb-1">Tu as un favori ?</p>
          <p className="text-sm text-blue-700">
            Dis-moi lequel (A, B, C ou D) ou combine des éléments de plusieurs — je l'affine, crée toutes les déclinaisons (dark, light, favicon, OG image) et l'intègre sur le site.
          </p>
        </div>
      </div>
    </div>
  );
}
