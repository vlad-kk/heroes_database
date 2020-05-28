import React from "react";

export const Hero = props => {

    return (

        <div className="col s12 m5 l3 xl2">
            <div className="hero-info" id={props.hero._id}>
                <div className="my-card-image">
                    <img src={props.hero.images[0]} alt="hero-avatar"/>
                </div>
                <div className="hero-titles">
                    <p><strong>Имя:</strong><br/>{props.hero.nickname}</p>
                    <div className="more" onClick={() => props.onRead(props.hero)}>Подробнее...</div>
                </div>
                <div className="hero-buttons">
                    <button className="waves-effect waves-light btn-small"
                            onClick={(e) => props.onDelete(e, props.hero)}>
                        <i className="material-icons small">delete</i>
                    </button>
                    <button className="waves-effect waves-light btn-small"
                            onClick={() => props.onSelect(props.hero)}>
                        <i className="material-icons small">create</i>
                    </button>
                </div>

            </div>

        </div>
    )
};