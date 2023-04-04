import { useEffect, useState } from "react";
import { api } from "../utils/Api";
import Card from "./Card.js";

function Main(props) {
    const [userName, setUserName] = useState('')
    const [userDescription, setUserDescription] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([])
    useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setUserName(res.name)
                setUserDescription(res.about)
                setUserAvatar(res.avatar)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <main className="contant">
            <section className="profile">
                <div className="profile__info">
                    <button className="profile__icon-edit" type="button" onClick={props.onEditAvatar}>
                        <img className="profile__avatar" name="avatar" src={userAvatar} alt="аватар профиля" />
                    </button>
                    <h1 className="profile__title">{userName}</h1>
                    <p className="profile__subtitle">{userDescription}</p>
                    <button type="button" className="profile__edit" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" className="profile__add" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main;