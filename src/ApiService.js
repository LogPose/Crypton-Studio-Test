export default class ApiService{
    async getResource(url) {
        const res = await fetch(`https://swapi.dev/api${url}`)
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
        }
    }
}