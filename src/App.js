import React, { Component } from 'react'
import ApiService from './ApiService'
import Spinner from './Spinner'
import './App.css'

export default class App extends Component {
    swapiService = new ApiService()

    state = {
        loading: true,
        peopleListPage: [],
        currentPage: 1, // Текущая отображаемая страница
        peoplesPerPage: 12,
        likedCharacters: [], 
        visible: true, // Отображение блоков основной/понравившиеся
        term: '', // Необходимое для поиска поле
        gender: 'all',
    }

    search(event) {
        const newTerm = event.target.value
        this.setState({
            term: newTerm
        })
    }

    componentDidMount() {
        for (let i = 1; i < 10; i++) {
            this.swapiService
            .getAllPeople(i)
            .then((peopleList) => 
                {this.setState(prev => ({
                    peopleListPage: [...prev.peopleListPage, ...peopleList]
                }),
                )
            }
            ) 
        .then(() => {
            this.setState({loading: false})
        })
        .catch(() => {
            alert('Ошибка получения данных с сервера! Пожалуйста, перезагрузите страницу!')
        })
        }
    }

    render () {
        const { peopleListPage, peoplesPerPage,
            currentPage, likedCharacters, visible, term,
            loading, gender } = this.state
        
        if (!peopleListPage) {
            return null 
        }

        if (loading) {
            return <Spinner />
        }

        const indexOfLastPeople = currentPage * peoplesPerPage;
        const indexOfFirstPeople = indexOfLastPeople - peoplesPerPage;
        const currentPeoples = peopleListPage.slice(indexOfFirstPeople, indexOfLastPeople);

        const characterList = (arr) => {

            const {likedCharacters} = this.state
        
            const makeLiked = (el) => {
                if (!el.liked) {
                    const newLiked = likedCharacters
                    newLiked.push(el)
                    this.setState({
                        likedCharacters: newLiked
                    })
                    el.liked = !el.liked
                } else {
                    alert('Персонаж уже был добавлен в раздел "Любимые"!')
                }
            }

            const like = <span>&#129505;</span>
            const cannotLike = <span>&#128153;</span>

            try {
                return arr.map((el) => {
                    return(
                        <div key={el.id} className='char'>
                            <img className='charImg' 
                                alt={el.name} src={`https://starwars-visualguide.com/assets/img/characters/${el.id}.jpg`}>
                                </img>
                                <br></br>
                                <h1>{el.name}</h1>
                            <button id='likeButton' className='likeButton' 
                            onClick={() => makeLiked(el)}>{el.liked ? like : cannotLike}</button>
                        </div>
                    )
                })
            } catch (err) {}
        }

        const likedCharacterList = (arr) => {
            try {
                return arr.map((el) => {
                    return(
                        <div key={el.id} className='charLiked'>
                            <img className='charImg' 
                                alt={el.name} src={`https://starwars-visualguide.com/assets/img/characters/${el.id}.jpg`}>
                                </img>
                                <br></br>
                                <h1>{el.name}</h1>
                                <h1>Gender: {el.gender}</h1>
                                <h1>Birth year: {el.birthYear}</h1>
                        </div>
                    )
                })
            } catch (err) {
                console.log(err)
            }
        }

        const incrementCount = () => {
            currentPage === 7? alert('Упс! Кажется, туда нельзя!') : 
            this.setState({currentPage: currentPage + 1})
            return currentPage
        }

        const decrementCount = () => {
            currentPage === 1 ? alert('Упс! Кажется, туда нельзя!') : 
            this.setState({currentPage: currentPage - 1})
            return currentPage
        }
        
        const characters = characterList(currentPeoples)
        const allCharacters = characterList(peopleListPage)

        // Поиск по имени

        const onSearch = (allCharacters, term, currentPeoples) => {
            if (term.length === 0) {
                return currentPeoples
            }
            return allCharacters.filter((el) => {
                return el.props.children[2].props.children.toLowerCase().indexOf(term.toLowerCase()) > -1;
            })
        }

        // Фильтр по полу в разделе "Любимые персонажи"

        const itemFilter = (items, gender) => {
            switch(gender) {
                case 'all': return items;
                case 'male' : return items.filter((item) => item.gender === 'male');
                case 'female' : return items.filter((item) => item.gender === 'female');
                case 'n/a' || 'none' : return items.filter((item) => item.gender === 'n/a');
                default: return items
            }
        }

        const liked = likedCharacters.length !== 0 ? 
                      likedCharacterList(itemFilter(likedCharacters, gender))
                      : likedCharacters

        const buttonTitle = (visible === true) ? 'Любимые персонажи' : 'Главная страница'

        const content = (visible === true) ? characters : liked
        const visibleContent = (visible) ? onSearch(allCharacters, term, content) : onSearch(liked, term, liked)
        const showedCharacters = visibleContent.length !== 0 ? 
                       visibleContent 
                       : <h1 className="title"> Кажется, на этой странице пусто!<br></br> Проверьте
                                                правильность написания имени или попробуйте поискать
                                                на другой странице!</h1>

        const footer =  <div className='footer'>
                                    <button className='lovedButton' onClick={() => decrementCount()}>Предыдущая страница</button>
                                    <button disabled={true} className='lovedButton'>{currentPage}</button>
                                    <button className='lovedButton' onClick={() => incrementCount()}>Следующая страница</button>
                                </div>

        const genderButtons =   <div>
                                    <button className='lovedButtonMale' onClick={() => this.setState({gender: 'male'})}>Мужчины</button>
                                    <button className='lovedButtonFemale' onClick={() => this.setState({gender: 'female'})}>Женщины</button>
                                    <button className='lovedButtonAnother' onClick={() => this.setState({gender: 'n/a'})}>Иное</button>
                                    <button className='lovedButtonReset' onClick={() => this.setState({gender: 'all'})}>Сбросить</button>
                                </div>

        const showedGenderButtons = visible ? null : genderButtons

        const visibleFooter = (visible === true && term === '') ? footer :  null

        const buttonStyle = visible ? 'lovedCharButton' : 'generalPageButton'

        return(
            <div className='general'>
                <div className='header'>
                    <button className={buttonStyle} onClick={() => this.setState({visible: !visible, gender: 'all'})}>{buttonTitle}</button>
                    <input className='searchPanel' type='text' placeholder='Search' onChange={this.search.bind(this)}></input>         
                </div>   
                <div className='charBlock'>
                        {showedGenderButtons}
                    {showedCharacters}
                </div>
                {visibleFooter}  
            </div>
        )
    }   
}
