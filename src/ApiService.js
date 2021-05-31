export default class ApiService{

    state = {
        planets: []
    }

    async getResource(url) {
        const res = await fetch(`https://swapi.dev/api${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} received ${res.status}`)
        }
        const body = await res.json()
        return body
    }

    async getPeoplesNumber() {
        const res = await this.getResource(`/people/`)
        return this._getNumber(res)
    }

    async getPlanetsNumber() {
        const res = await this.getResource(`/planets/`)
        return this._getNumber(res)
    }

    _getNumber(number){
        return {
            num: number.count
        }
    }

    async getAllPeople(count) {
        const res = await this.getResource(`/people/?page=${count}`)
        return res.results.map(this._transformPerson)
    }

    _extractId(item) {
        const regExp = /\/([0-9]*)\/$/
        return item.url.match(regExp)[1]
    }
    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            liked: false,
            homeworld: person.homeworld,
        }
    }

    getAllPlanets = async (count) => {
        const res = await this.getResource(`/planets/?page=${count}`);
        return res.results
          .map(this._transformPlanet)
      };

      _transformPlanet = (planet) => {
        return {
          name: planet.name,
          url: planet.url
        };
      };

}