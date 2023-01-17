import headerStyle from "../styles/Layout.module.css"

const Header = () => {
    return (
        <div>
            <h1 className={headerStyle.title}>
                <span>Next JS practice</span>
            </h1>

            <p className={headerStyle.description}>Keep up to date with latest NEXT</p>
        </div>
    )
}

export default Header
