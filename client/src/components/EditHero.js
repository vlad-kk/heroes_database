import React from "react";
import {FormErrors} from "./FormErrors";

const EditHero = props => {

    if (props.selectedHero) {
        return (
            <form className="col s12 m10 l12 xl10">
                <div className="form-err-panel" >
                    <FormErrors formErrors={props.formErrors}/>
                </div>
                <div className="editfields">
                    <div>
                        <label>Имя:* </label>
                        <input
                            name="nickname"
                            value={props.selectedHero.nickname}
                            placeholder="Имя героя"
                            onChange={props.onChange}
                        />
                    </div>
                    <div>
                        <label>Настоящее имя:** </label>
                        <input
                            name="real_name"
                            value={props.selectedHero.real_name}
                            placeholder="Настоящее имя героя"
                            onChange={props.onChange}
                        />
                    </div>
                    <div>
                        <label>Биография:** </label>
                        <input
                            name="origin_description"
                            value={props.selectedHero.origin_description}
                            placeholder="Краткое описание героя"
                            onChange={props.onChange}
                        />
                    </div>
                    <div>
                        <label>Способности:** </label>
                        <input
                            name="superpowers"
                            value={props.selectedHero.superpowers}
                            placeholder="Способности героя"
                            onChange={props.onChange}
                        />
                    </div>
                    <div>
                        <label>Фразы:** </label>
                        <input
                            name="catch_phrase"
                            value={props.selectedHero.catch_phrase}
                            placeholder="Любимая фраза"
                            onChange={props.onChange}
                        />
                    </div>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Картинка</span>
                            <input type="file" name="file" onChange={props.onFile} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Выбрать картинку" />
                        </div>
                    </div>
                </div>

                <button onClick={props.onCancel}>Отменить</button>
                <button className="save" onClick={props.onSave} disabled={!props.isValid}>Сохранить</button>
            </form>
        );
    } else if (props.heroDetails) {
        return (
            <div className="col s12 m10 l12 xl10">
                <div>
                    <h5>Имя: </h5><span>{props.heroDetails.nickname}</span>
                    <h5>Настоящее имя: </h5><span>{props.heroDetails.real_name?props.heroDetails.real_name:"Нет информации"}</span>
                    <h5>Биография: </h5>
                    <p>{props.heroDetails.origin_description?props.heroDetails.origin_description:"Нет информации"}</p>
                    <h5>Способности: </h5>
                    <p>{props.heroDetails.superpowers?props.heroDetails.superpowers:"Нет информации"}</p>
                    <h5>Фразы: </h5>
                    <p>{props.heroDetails.catch_phrase?props.heroDetails.catch_phrase:"Нет информации"}</p>
                </div>
                <hr/>
                <h5>Картинки: </h5>
                <div className="image-details">
                    {
                        props.heroDetails.images.length>0?props.heroDetails.images.map((image, index) => {
                            return <div key={index} className="btn-img-del-container">
                                    <div className="btn-img-delete" onClick={(e)=>props.imageDelete(e, image, props.heroDetails._id)}><span>&times;</span></div>
                                    <img src={image}  alt=""/>
                                </div>
                        }):"Нет картинок"
                    }
                </div>
            </div>
        )
    } else {
        return <div />;
    }
};

export default EditHero