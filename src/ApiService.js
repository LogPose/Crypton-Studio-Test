export default class ApiService{

    _apiBase = 'https://swapi.dev/api'

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} received ${res.status}`)
        }
        const body = await res.json()
        return body
    }

    async getAllPeople(count) {
        const res = await this.getResource(`/people/?page=${count}`)
        return res.results.map(this._transformPerson)
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}`)
        return this._transformPerson(person)
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
            homeworld: person.homeworld,
        }
    }

    async getPlanet(el) {
        const regExp = /\/([0-9]*)\/$/
        const planetID = el.match(regExp)[1]
        const planet = await this.getResource(`/planets/${planetID}`)
        return planet.name
    }
}