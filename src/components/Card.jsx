export const Card = ({card, onCardClick}) => {
    return(
        <button onClick={()=>onCardClick(card)} disabled={card.flipped || card.matched}
        className={`h-28 rounded-xl flex items-center justify-center text-4xl shadow-lg transition ${card.flipped || card.matched ? "bg-white" : "bg-emerald-700 hover:bg-emerald-600"}` }>
            {card.flipped || card.matched ? card.icon : "?"}
        </button>
    )
}