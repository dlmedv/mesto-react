function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }
    return (
        <div className="element" >
            <button type="button" className="element__button-photo">
                <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} /></button>
            <button type="button" className=" element__icon-trash"></button>
            <div className="element__group">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__group2">
                    <button type="button" className="element__icon"></button>
                    <p className="element__numbers">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;