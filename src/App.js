import React, { Component } from 'react'
import ApiService from './ApiService'
import Spinner from './Spinner'
import './App.css'

export default class App extends Component {
    swapiService = new ApiService()

    state = {
        loading: true,
        peopleListPage1: null,
        peopleListPage2: null,
        peopleListPage3: null,
        peopleListPage4: null,
        peopleListPage5: null,
        peopleListPage6: null,
        peopleListPage7: null,
        peopleListPage8: null,
        count: 1, // Текущая отображаемая страница
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

    // Вызов одних и тех же функций подряд происходит из-за того,
    // что я не понял, как изменить peopleListPage1-2-3 и т.д. на 
    // peopleListPage${num}, чтобы вызывать функцию с новым каунтером,
    // а не писать всё тело функции каждый раз

    componentDidMount() {
        this.swapiService
            .getAllPeople(1)
            .then((peopleList) => 
                {this.setState({
                    peopleListPage1: peopleList
                },
                )
            }
            )
        .then(
            this.swapiService
            .getAllPeople(2)
            .then((peopleList) => 
                {this.setState({
                    peopleListPage2: peopleList
                },
                )
        })
        ).then(
            this.swapiService
            .getAllPeople(3)
            .then((peopleList) => 
                {this.setState({
                    peopleListPage3: peopleList
                },
                )
            })
        )
        .then(
            this.swapiService
            .getAllPeople(4)
            .then((peopleList) => 
                {this.setState({
                    peopleListPage4: peopleList
                },
                )
            })
        )
        .then(
            this.swapiService
            .getAllPeople(5)
            .then((peopleList) => 
                {this.setState({
                    peopleListPage5: peopleList
                },
                )
            })
        )
        .then(
            this.swapiService
            .getAllPeople(6)
            .then((peopleList) => 
                {this.setState({
                    peopleListPage6: peopleList
                },
                )
            })
        )
        .then(
            this.swapiService
            .getAllPeople(7)
            .then((peopleList) => 
                {this.setState({
                    peopleListPage7: peopleList
                },
                )
            })
        )
        .then(
            this.swapiService
            .getAllPeople(8)
            .then((peopleList) => 
                {this.setState({
                    peopleListPage8: peopleList
                },
                )
            })    
        )
        .then(() => {
            this.setState({loading: false})
        })
        .catch(() => {
            alert('Ошибка получения данных с сервера! Пожалуйста, перезагрузите страницу!')
        })
    }

    render () {
        const { peopleListPage1, peopleListPage2,
            peopleListPage3, peopleListPage4,
            peopleListPage5, peopleListPage6,
            peopleListPage7, peopleListPage8,
            count, likedCharacters, visible, term,
            loading, gender } = this.state
        
        if (!peopleListPage1) {
            return null 
        }

        if (loading) {
            return <Spinner />
        }

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

            const like = <span>&#128154;</span>
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
            count === 8? alert('Упс! Кажется, туда нельзя!') : 
            this.setState({count: count + 1})
            return count
        }

        const decrementCount = () => {
            count === 1 ? alert('Упс! Кажется, туда нельзя!') : 
            this.setState({count: count - 1})
            return count
        }
        
        const characters1 = characterList(peopleListPage1)
        const characters2 = characterList(peopleListPage2)
        const characters3 = characterList(peopleListPage3)
        const characters4 = characterList(peopleListPage4)
        const characters5 = characterList(peopleListPage5)
        const characters6 = characterList(peopleListPage6)
        const characters7 = characterList(peopleListPage7)
        const characters8 = characterList(peopleListPage8)

        function showedContent(count) {
            switch(count) {
                case 1: return characters1;
                case 2: return characters2;
                case 3: return characters3;
                case 4: return characters4;
                case 5: return characters5;
                case 6: return characters6;
                case 7: return characters7;
                case 8: return characters8;
                default: return characters1
            }
        }

        // Поиск по имени

        const onSearch = (items, term) => {
            if (term.length === 0) {
                return items
            }
            return items.filter((el) => {
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

        const content = (visible === true) ? showedContent(count) : liked
        const visibleContent = onSearch(content, term)
        const showedCharacters = visibleContent.length !== 0 ? 
                       visibleContent 
                       : <h1 className="title"> Кажется, на этой странице пусто!<br></br> Проверьте
                                                правильность написания имени или попробуйте поискать
                                                на другой странице!</h1>

        const footer =  <div className='footer'>
                                    <button className='lovedButton' onClick={() => decrementCount()}>Предыдущая страница</button>
                                    <button disabled={true} className='lovedButton'>{count}</button>
                                    <button className='lovedButton' onClick={() => incrementCount()}>Следующая страница</button>
                                </div>

        const genderButtons =   <div>
                                    <button className='lovedButtonMale' onClick={() => this.setState({gender: 'male'})}>Мужчины</button>
                                    <button className='lovedButtonFemale' onClick={() => this.setState({gender: 'female'})}>Женщины</button>
                                    <button className='lovedButtonAnother' onClick={() => this.setState({gender: 'n/a'})}>Иное</button>
                                    <button className='lovedButtonReset' onClick={() => this.setState({gender: 'all'})}>Сбросить</button>
                                </div>

        const showedGenderButtons = visible ? null : genderButtons

        const visibleFooter = visible ? footer : null

        return(
            <div className='general'>
                <div className='header'>
                    <button className='lovedButton' onClick={() => this.setState({visible: !visible})}>{buttonTitle}</button>
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
