/*This page.tsx is for the Ligue 1 standings section*/ 

import Image from "next/image";
import { Della_Respira } from "next/font/google";

const dellaRespira = Della_Respira({

  subsets: ["latin"],
  weight: "400",
})

// Get the  laliga standings
async function getLigue1Standings(){

    const res = await fetch(
    "https://api.football-data.org/v4/competitions/FL1/standings",
    {
        headers: {
        "X-Auth-Token": process.env.SOCCER_DATA_API_KEY!,
        },
        next: { revalidate: 60 }, // refresh every 60 seconds
    }
    );

    if (!res.ok) {
    // Log the error body so you can see what went wrong
    const errorText = await res.text();
    console.error("Football-Data error:", res.status, errorText);
    throw new Error("Failed to fetch standings");
    }

    const data = await res.json();

    const table = data.standings[0].table as any[];

    return table.map((row) => {
    const played = row.playedGames as number;
    const wins = row.won as number;
    const draws = row.draw as number;
    const losses = row.lost as number;
    const points = row.points as number;

    const winPct =
        played > 0 ? ((wins / played) * 100).toFixed(1) : "0.0";

    return {
        position: row.position,
        team: row.team.name,
        crest: row.team.crest,
        played,
        wins,
        draws,
        losses,
        points,
        winPct,
    };
    });
}

// Get the year of the season
export async function getSeasonYear() {
  
    const res = await fetch(
    "https://api.football-data.org/v4/competitions/FL1/standings",
    {
        headers: {
        "X-Auth-Token": process.env.SOCCER_DATA_API_KEY!,
        },
        next: { revalidate: 60 }, // optional caching
    }
    );

    if (!res.ok) {
    // Log the error body so you can see what went wrong
    const errorText = await res.text();
    console.error("Football-Data error:", res.status, errorText);
    throw new Error("Failed to fetch standings");
    }

    const data = await res.json();

    const season = data.filters.season;

    return season;

}

export default async function ligue1() {
    const ligue1Standings = await getLigue1Standings();
        
    const season = await getSeasonYear();
    
    return (
    <main className={`${dellaRespira.className} flex justify-center pt-10 bg-gray-900 min-h-screen`}>
        
        <div className="w-full max-w-5xl bg-gray-700 shadow-lg rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-center text-yellow-200 mb-4">
            Ligue 1 Standings {season}
        </h2>

        <div className="grid grid-cols-[0.5fr_0.7fr_2.5fr_1fr_1fr_1fr_1fr_1fr_1fr] 
        bg-black text-pink-400 font-bold text-center py-3 rounded-t-xl 
        border-b border-gray-700 divide-x divide-gray-700">

            <div>Pos</div>
            <div>Crest</div>
            <div>Team</div>
            <div>PL</div>
            <div>W</div>
            <div>D</div>
            <div>L</div>
            <div>Win Rate</div>
            <div>Pts</div>
        </div>
        

        {ligue1Standings.map((team) => (
            <div
            key={team.position}
            className="grid grid-cols-[0.5fr_0.7fr_2.5fr_1fr_1fr_1fr_1fr_1fr_1fr]
                        text-gray-200 text-center py-2 border-b border-gray-700 
                        divide-x divide-gray-800"
            >
            <div>{team.position}</div>

            <div className="flex justify-center items-center">
                <img 
                src={team.crest} 
                alt={team.team} 
                className="w-6 h-6 object-contain"
                />
            </div>

            <div>{team.team}</div>
            <div>{team.played}</div>
            <div>{team.wins}</div>
            <div>{team.draws}</div>
            <div>{team.losses}</div>
            <div>{team.winPct}%</div>
            <div className="font-bold text-yellow-400">{team.points}</div>
            </div>
        ))}


        </div>
    </main>
    );
}