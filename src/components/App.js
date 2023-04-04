
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'
import { useState } from 'react';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})

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

    return (
        <div className='page'>
            <div className="page__container">
                <Header />
                <Main
                    onEditAvatar={hadleEditAvatarPopupOpen}
                    onEditProfile={hadleEditProfilePopupOpen}
                    onAddPlace={hadleAddPlacePopupOpen}
                    onCardClick={setSelectedCard}
                />
                <Footer />
                <PopupWithForm
                    name='edit-card'
                    title='Редактировать профиль'
                    button='Сохранить'
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllpopups}
                    children={
                        <>
                            <input type="text" id="username" name="name" className="popup__input popup__input_type_name"
                                placeholder="Имя" required minLength="2" maxLength="40" />
                            <span className="popup__error username-input-error"></span>
                            <input type="text" id="job" name="about" className="popup__input popup__input_type_about"
                                placeholder="Вид деятельности" required minLength="2" maxLength="200" />
                            <span className="popup__error job-input-error"></span>
                        </>
                    }
                />
                <PopupWithForm
                    name='add-card'
                    title='Новое место'
                    button='Сохранить'
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllpopups}
                    children={
                        <>
                            <input type="text" id="name" name="name" className="popup__input popup__input_type_title"
                                placeholder="Название" required minLength="2" maxLength="30" />
                            <span className="popup__error name-input-error"></span>
                            <input type="url" id="about" name="link" className="popup__input popup__input_type_link"
                                placeholder="Ссылка на картинку" required />
                            <span className="popup__error about-input-error"></span>
                        </>
                    }
                />
                <PopupWithForm
                    name='avatar'
                    title='Обновить аватар'
                    button='Сохранить'
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllpopups}
                    children={
                        <>
                            <input type="url" id="useravatar" name="link" className="popup__input popup__input_type_avatar"
                                placeholder="Ссылка на аватар" required />
                            <span className="popup__error useravatar-input-error"></span>
                        </>
                    }
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
    );
}

export default App;
