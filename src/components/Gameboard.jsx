import { useEffect,useState } from "react";
import {Card} from "./Card";

//add icons
const themeIcons = {
    animals:["🐯","🦧","🐵","🦁","🐆","🦥","🐘","🐻"],
    fish: ["🐟", "🐠", "🐡", "🦈", "🐬", "🐳", "🦀", "🐙"],
    birds: ["🦅", "🦉", "🦜", "🐦", "🐧", "🦆", "🐤", "🦢"],
}

export const Gameboard = ({settings, onBackHome}) =>{
    const [cards,setCards] = useState([]);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [moves, setMoves]= useState(0);

    useEffect(()=>{
        createCards();
    },[]);

    const getPairCount = () =>{
        if (settings.diff === "easy") return 4;
        if (settings.diff === "medium") return 6;
        return 8;
    };

    const getGridClass = () => {
        if (settings.diff === "easy") return "grid-cols-4";
        if (settings.diff === "medium") return "grid-cols-4";
        return "grid-cols-4";
    };

    const createCards = () =>{
        const pairCount = getPairCount();
        const selectedIcons = themeIcons[settings.theme].slice(0,pairCount);

        const cardPairs = [...selectedIcons,...selectedIcons].map((icon,index) =>({
            id: index,
            icon,
            flipped:false,
            matched:false,
        }));

        const shuffledCards = cardPairs.sort(()=>Math.random()-0.5);
        setCards(shuffledCards);

        setFirstCard(null);
        setSecondCard(null);
        setMoves(0);
    };

    const handleCardClick = (card) =>{
        if (firstCard && secondCard) return;

        setCards((prevCards)=>
            prevCards.map((c)=> c.id === card.id ? {...c, flipped:true}:c)
        );

        if (!firstCard){
            setFirstCard(card);
        }else{
            setSecondCard(card);
            setMoves((prev)=>prev+1);
        }
    };

    useEffect(()=>{
        if (!firstCard || !secondCard) return;

        if (firstCard.icon === secondCard.icon){
            setCards((prevCards)=> prevCards.map((card)=> card.icon===firstCard.icon ? {...card, matched: true}: card));
            resetTurn();

        }else{
            setTimeout(()=>{
                setCards((prevCards)=>prevCards.map((card)=>card.id === firstCard.id || card.id === secondCard.id ? {...card, flipped:false}:card));
                resetTurn();


            },900);
        }
    },[secondCard]);

    const resetTurn = () => {
        setFirstCard(null);
        setSecondCard(null);
    };
    const allMatched = cards.length > 0 && cards.every((card)=>card.matched);

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-700 text-white p-8">
      <h1 className="text-5xl font-bold mb-4">Memory Quest</h1>

      <div className="flex gap-6 mb-6">
        <p>Difficulty: {settings.diff}</p>
        <p>Theme: {settings.theme}</p>
        <p>Moves: {moves}</p>
      </div>

      {allMatched && (
        <div className="mb-6 bg-white text-slate-900 p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold">You won!</h2>
          <p>You completed the game in {moves} moves.</p>
          <button
            onClick={createCards}
            className="mt-3 mr-3 bg-emerald-600 text-white px-4 py-2 rounded"
          >
            Play Again
          </button>
          <button
            onClick={onBackHome}
            className="mt-3 bg-slate-700 text-white px-4 py-2 rounded"
          >
            Change Settings
          </button>
        </div>
      )}

      <div className={`grid ${getGridClass()} gap-4 w-full max-w-xl`}>
        {cards.map((card) => (
          <Card key={card.id} card={card} onCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );














};