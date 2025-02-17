import React from 'react';
import style from "./PricesCard.module.css";

const PricesCard = ({ priceCard }) => {
    const { name } = priceCard;
    return (
        <div className={style.priceCard}>
            <h3>{name}</h3>
            <div>
                <div className={style.pricesSection}>
                    <h4>Prices</h4>
                    <div className={style.iterationsContainer}>
                        <IterationsSection iteration={priceCard} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const IterationsSection = ({ iteration }) => {
    const { available_from, available_to } = iteration;
    return (
        <div className={style.iterationsSection}>
            {available_from !== undefined && available_from !== null && <h5>{available_from} - {available_to}</h5>}
            <div className={style.detailsContainer}>
                <IterationDetails detail={iteration} />
            </div>
        </div>
    )
}

const IterationDetails = ({ detail }) => {
    const { from, to, total_price } = detail;
    return (
        <div className={style.detailsCard}>
            {from === 1 && to === 0 ? (
                <p>1 person : {total_price}</p>
            ) : (
                <p>{from} : {to} persons = {total_price}</p>
            )}
        </div>
    )
}

const HotelCard = ({ hotel }) => {
    const { image, name, link, rating } = hotel;
    return (
        <div className={style.hotelCard}>
            <img src={image} alt="" />
            <a href={link}>{name}</a>
            <div className={style.ratingStart} title="Rated 5 out of 5">
                <span style={{ width: rating }}></span>
            </div>
        </div>
    )
}

export default PricesCard;
