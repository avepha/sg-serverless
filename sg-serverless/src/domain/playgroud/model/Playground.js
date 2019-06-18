import MongoDAO from '../../../mongoDAO'

import {Schema} from 'mongoose'

const playgroundSchema = new Schema({
  number: Number,
  name: String
})

export default class Playground extends MongoDAO {
  constructor(connection) {
    super(connection.model('Playground', playgroundSchema))
  }

  create({number, name}) {
    const newPlayground = new this.Model({
      number,
      name
    })

    return newPlayground.save()
  }
}
