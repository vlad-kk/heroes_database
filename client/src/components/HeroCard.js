import React, {Component} from "react";
import {Hero} from "./Hero";
import EditHero from "./EditHero";
import api from "../routes"
import {Pages} from "./Pages";
import validator from 'validator';

export class HeroCard extends Component{
    constructor (){
        super();
        this.state = {
            heroes: [],
            addingHero: false,
            loading: true,
            showOnPage: 5,
            currentPage: 1,
            file: "",
            formValidation: {
                inputs: {
                    "nickname": '',
                    "real_name": '',
                    "origin_description": '',
                    "superpowers": '',
                    "catch_phrase": '',
                },
                formErrors: {
                    "nickname": '',
                    "real_name": '',
                    "origin_description": '',
                    "superpowers": '',
                    "catch_phrase": '',
                },
                nicknameValid: false,
                realNameValid: true,
                originDescriptionValid: true,
                superpowersValid: true,
                catchPhraseValid: true,
                formValid: false
            }
        };

        this.handlerSelect = this.handlerSelect.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.pagination = this.pagination.bind(this);
        this.handleRead = this.handleRead.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentPage !== prevState.currentPage) {
            this.setState({
                loading: true
            });
            api.get(this.state.currentPage).then(json => {
                this.setState({
                    heroes: json.heroes,
                    totalHeroes: json.pages,
                    loading: false,
                })
            })
        }
    }

    componentDidMount() {
        api.get(this.state.currentPage).then(json => {
            this.setState({
                heroes: json.heroes,
                loading: false,
                totalPages: Math.ceil(json.pages / this.state.showOnPage)
            })
        })
    }

    handleSave(){
        let heroes = this.state.heroes;
        const formData = new FormData();
        formData.append('nickname', this.state.selectedHero.nickname);
        formData.append('real_name', this.state.selectedHero.real_name);
        formData.append('origin_description', this.state.selectedHero.origin_description);
        formData.append('superpowers', this.state.selectedHero.superpowers);
        formData.append('catch_phrase', this.state.selectedHero.catch_phrase);
        formData.append('file', this.state.file);
        if (this.state.addingHero){

            //this.state.selectedHero
            api.create(formData).then(hero => {
                heroes.push(this.state.selectedHero);
                this.setState({
                    heroes: heroes,
                    addingHero: false,
                    selectedHero: null
                })
            })
        }
        else{
            api.update(formData, this.state.selectedHero._id).then(() => {
                this.setState({
                    selectedHero: null
                })
            })
        }
    }

    handleCancel(){
        this.setState({ selectedHero: null, addingHero: false })
    }

    async handleFile(e){
        let file = e.target.files[0];
        await this.setState({ file: file })
    }

    handleChange(event){
        const selectedHero = {...this.state.selectedHero};
        const newValidState = {...this.state.formValidation};
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        newValidState.inputs[name] = value;
        selectedHero[name] = value;
        this.setState({
            formValidation: newValidState,
            selectedHero: selectedHero,
        },
            () => {this.validateField(name, value)})
    }
    validateForm(){
        let newValidState = {...this.state.formValidation};
        newValidState.formValid = this.state.formValidation.nicknameValid && this.state.formValidation.realNameValid && this.state.formValidation.originDescriptionValid && this.state.formValidation.superpowersValid && this.state.formValidation.catchPhraseValid;
        this.setState({
            formValidation: newValidState
        })
    }

    validateField(fieldName, value) {
        const newValidState = {...this.state.formValidation};
        let fieldValidationErrors = newValidState.formErrors;

        switch(fieldName) {
            case 'nickname':
                newValidState.nicknameValid = !validator.isEmpty(value);
                fieldValidationErrors.nickname = newValidState.nicknameValid ? '' : 'Поле "Имя" должно быть заполнено!';
                break;
            case 'real_name':
                newValidState.realNameValid = validator.isLength(value, {min:0, max: 250});
                fieldValidationErrors.real_name = newValidState.realNameValid ? '' : 'Поле "Настоящее имя" не должно содержать больше 250 символов!';
                break;
            case 'origin_description':
                newValidState.originDescriptionValid = validator.isLength(value, {min:0, max: 250});
                fieldValidationErrors.origin_description = newValidState.originDescriptionValid ? '' : 'Поле "Биография" не должно содержать больше 250 символов!';
                break;
            case 'superpowers':
                newValidState.superpowersValid = validator.isLength(value, {min:0, max: 250});
                fieldValidationErrors.superpowers = newValidState.superpowersValid ? '' : 'Поле "Способности" не должно содержать больше 250 символов!';
                break;
            case 'catch_phrase':
                newValidState.catchPhraseValid = validator.isLength(value, {min:0, max: 250});
                fieldValidationErrors.catch_phrase = newValidState.catchPhraseValid ? '' : 'Поле "Фразы" не должно содержать больше 250 символов!';
                break;
            default:
                break;
        }

        this.setState({
            formValidation: newValidState
        }, this.validateForm)

    }

    handlerSelect (hero) {
        let formValidation = {...this.state.formValidation};
        formValidation.formValid = true;
        this.setState({formValidation: formValidation, selectedHero: hero, detailsHero: null })
    }

    handleRead (hero) {
        this.setState({ detailsHero: hero, selectedHero: null })
    }

    handleAdd(){
        this.setState({
            addingHero: true,
            selectedHero: {
                "nickname": '',
                "real_name": '',
                "origin_description": '',
                "superpowers": '',
                "catch_phrase": '',
                "images": ""
            }
        })
    }

    handleDeleteImage(event, img, heroId){
        event.stopPropagation();
        api.destroyImage(img, heroId)
            .then(() => {
                let heroes = [...this.state.heroes];
                this.setState({heroes: heroes.map(hero => {
                        if (hero._id === heroId) {
                            hero.images = hero.images.filter(i => i != img)
                        }
                        return hero
                    })})
        })
    }

    handleDelete(event, hero){
        event.stopPropagation();
        api.destroy(hero).then(() => {
            let heroes = this.state.heroes;
            heroes = heroes.filter(h => h !== hero);
            this.setState({ heroes: heroes, selectedHero: null, detailsHero: null });

            if (this.selectedHero === hero) {
                this.setState({ selectedHero: null });
            }
        });
        if (this.state.heroes.length === 1) {
            this.setState({ currentPage: this.state.currentPage - 1, totalPages: this.state.totalPages - 1 })
        }
    }

    pagination(page) {
        this.setState({
            currentPage: page,
            detailsHero: null,
            selectedHero: false
        })
    }

    render (){
        if (this.state.loading) {
            return (
                <div className="progress">
                    <div className="indeterminate" />
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="add-btn" onClick={this.handleAdd}>Добавить нового героя
                        <div className="btn-floating pulse"><i className="material-icons">add</i></div>
                    </div>
                    <Pages
                        totalPages={this.state.totalPages}
                        showOnPage={this.state.showOnPage}
                        currentPage={this.state.currentPage}
                        onPagination={this.pagination}
                    />
                    <div className="">
                        <span className="title" />
                        <div className="">
                            {
                                this.state.heroes?this.state.heroes.map(hero => {
                                    return <Hero
                                                key={hero._id}
                                                hero={hero}
                                                onSelect={this.handlerSelect}
                                                onRead={this.handleRead}
                                                selectedHero={this.state.selectedHero}
                                                onDelete={this.handleDelete}
                                                isLoaded={this.state.loading}
                                            />
                                }):""
                            }
                        </div>
                    </div>
                    <EditHero
                        addingHero={this.state.addingHero}
                        selectedHero={this.state.selectedHero}
                        onFile={this.handleFile}
                        onChange={this.handleChange}
                        onSave={this.handleSave}
                        onCancel={this.handleCancel}
                        heroDetails={this.state.detailsHero}
                        formErrors={this.state.formValidation.formErrors}
                        isValid = {this.state.formValidation.formValid}
                        imageDelete = {this.handleDeleteImage}
                    />
                </div>
            </div>
        )
    }
}