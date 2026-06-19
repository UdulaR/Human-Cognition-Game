import {useState} from "react"

export const Home = ({onStart}) => {
    const [diff, setDiff] = useState("easy");
    const [theme, setTheme] = useState("animals");
    const [timed, setTimed] = useState("timed");

    const handleStart = () =>{
        onStart({
            diff, theme, timed:timed==="timed",
        });
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-900 to-slate-700">
            <h1 className="text-white text-6xl font-bold text-center mb-8">Memory Quest</h1>
            <div className="bg-slate-600 p-8 rounded-lg w-80 flex flex-col gap-5 shadow-lg">
                <select 
                    value={diff}
                    onChange={(e)=>setDiff(e.target.value)}
                    className="p-3 rounded bg-slate-300 text-slate-900 text-center">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                <select 
                    value={theme}
                    onChange={(e)=>setTheme(e.target.value)}
                    className="p-3 rounded bg-slate-300 text-slate-900 text-center">
                        <option value="animals">Animals</option>
                        <option value="fish">Fish</option>
                        <option value="birds">Birds</option>
                    </select>
                    <select 
                    value={timed}
                    onChange={(e)=>setTimed(e.target.value)}
                    className="p-3 rounded bg-slate-300 text-slate-900 text-center">
                        <option value="timed">Timed</option>
                        <option value="not-timed">Not Timed</option>
                        
                    </select>
                    <button onClick={handleStart} className="p-3 rounded bg-emerald-600 hover:bg-emerald-700">
                        Play!
                    </button>

                
                
            </div>

        </div>
    )
}