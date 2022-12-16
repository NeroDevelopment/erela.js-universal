const { Plugin } = require('erela.js')
const resolver = require("./util/resolver")

const regex = /^https:\/\/[^ "]+$/;
const blacklisted = ["youtube", "souncloud", "deezer", "twitch", "vimeo", "bandcamp", "getyarn", "clyp", "reddit", "mixcloud", "soundgasm", "spotify", "deezer", "apple", "yandex", "pornhub"] 

class Universal extends Plugin {
  constructor(){
    super()
  }

  async search(query, requester){
    const finalQuery = query?.query || query;
    if(!regex.test(finalQuery) || blacklisted.includes(finalQuery.toLowerCase())) return this._search(query, requester)
    const data = await resolver(finalQuery)
    if(!data){
      return this._search(query, requester)
    }
    return this._search({...query, query: data}, requester)
  }

  load(manager){
    this.manager = manager;
    this._search = manager.search.bind(manager)
    manager.search = this.search.bind(this)
  }
}

module.exports = { Universal }