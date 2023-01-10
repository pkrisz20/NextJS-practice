import headerStyle from "../styles/Header.module.css"

const Header = () => {
    return (
        <div>
            <h1 className={headerStyle.title}>
                <span>Web Dev News</span>
            </h1>

            <p className={headerStyle.description}>Keep up to date with latest Web Dev News</p>
        </div>
    )
}

export default Header
