import logo from '../images/logo/Vector.svg'

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип с надписью Mesto" />
        </header>
    )
}

export default Header;