
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'
import { useEffect, useState } from 'react';
import { api } from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])

    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setCurrentUser(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function hadleEditProfilePopupOpen() {
        setIsEditProfilePopupOpen(true)
    }

    function hadleAddPlacePopupOpen() {
        setIsAddPlacePopupOpen(true)
    }

    function hadleEditAvatarPopupOpen() {
        setIsEditAvatarPopupOpen(true)
    }

    function closeAllpopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard({})
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(isLiked, card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardDelete(card) {
        const cardId = card._id
        api.deleteCard(cardId)
            .then(() => {
                setCards((state) => state.filter((card) => card._id !== cardId))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateUser(userInfo) {
        api.setInfoUser(userInfo)
            .then((res) => {
                setCurrentUser(res)
                closeAllpopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar({ avatar }) {
        api.setUserAvatar(avatar)
            .then((res) => {
                setCurrentUser(res)
                closeAllpopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddPlaceSubmit(card) {
        api.createNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllpopups()
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (

        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <div className="page__container">
                    <Header />
                    <Main
                        onEditAvatar={hadleEditAvatarPopupOpen}
                        onEditProfile={hadleEditProfilePopupOpen}
                        onAddPlace={hadleAddPlacePopupOpen}
                        onCardClick={setSelectedCard}
                        onCardLike={handleCardLike}
                        cards={cards}
                        onCardDelete={handleCardDelete}
                    />
                    <Footer />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllpopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllpopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllpopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <PopupWithForm
                        name='delete-card'
                        title='Вы уверены?'
                        button='Да'
                    />
                    <ImagePopup
                        onClose={closeAllpopups}
                        card={selectedCard}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
