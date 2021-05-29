import React, { Component } from 'react'
import ApiService from './ApiService'
import Spinner from './Spinner'
import './App.css'

export default class CharacterList extends Component {
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
        count: 1,
        likedCharacters: [],
        visible: true,
        term: '',
    }

    search(event) {
        const newTerm = event.target.value
        this.setState({
            term: newTerm
        })
    }

    onError = () => {

    }

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
    }

    render () {
        const {peopleListPage1, peopleListPage2,
               peopleListPage3, peopleListPage4,
               peopleListPage5, peopleListPage6,
               peopleListPage7, peopleListPage8,
               count, likedCharacters, visible, term,
               loading} = this.state
        
        if (!peopleListPage1) {
            return null 
        }

        if (loading) {
            return <Spinner />
        }

            const characterList = (arr) => {

                const {likedCharacters} = this.state
        
                const makeLiked = (el) => {
                    const newLiked = likedCharacters
                    newLiked.push(el)
                    this.setState({
                        likedCharacters: newLiked
                    })
                }
                try {
                    return arr.map((el) => {
                        return(
                            <div key={el.id} className='char'>
                                <img className='charImg' 
                                    alt={el.name} src={`https://starwars-visualguide.com/assets/img/characters/${el.id}.jpg`}>
                                    </img>
                                    <br></br>
                                    <h1>{el.name}</h1>
                                    <br></br>
                                <button id='likeButton' className='likeButton' onClick={() => makeLiked(el)}>&#128154;</button>
                            </div>
                        )
                    })
                } catch (err) {
                    console.log(err)
                }
               
            }


        const incrementCount = () => {
            count === 8 ? alert('Упс! Кажется, туда нельзя!') : 
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
        
        const onSearch = (items, term) => {
            if (term.length === 0) {
                return items
              }
              return items.filter((el) => {
                return el.props.children[2].props.children.toLowerCase().indexOf(term.toLowerCase()) > -1;
              })
        }

        const liked = characterList(likedCharacters)

        const content = (visible === true) ? showedContent(count) : liked

        const visibleContent = onSearch(content, term)

        return(
            <div className='general'>
                <div className='header'>
                    <button className='lovedButton' onClick={() => this.setState({visible: !visible})}>Любимые персонажи</button>
                    <input className='searchPanel' type='text' placeholder='Search' onChange={this.search.bind(this)}></input>
                </div>   
                <div className='charBlock'>
                    {visibleContent}
                </div>
                <div className='footer'>
                    <button className='lovedButton' onClick={() => decrementCount()}>Предыдущая страница</button>
                    <button className='lovedButton' onClick={() => incrementCount()}>Следующая страница</button>
                </div>
                
            </div>
        )
    }   
}