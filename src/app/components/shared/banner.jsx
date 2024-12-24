const Banner = ({ children, innerBanner }) => {
    return (
        <section className="inner-banner-wrap">
            <div className="inner-baner-container" style={{ backgroundImage: `url(${innerBanner})` }}>
                <div className="container">
                    <div className="inner-banner-content">
                        <h1 className="inner-title">{children}</h1>
                    </div>
                </div>
            </div>
            <div className="inner-shape"></div>
        </section>
    )
}

export default Banner