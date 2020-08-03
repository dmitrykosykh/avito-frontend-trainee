import { v4 as uuidv4 } from 'uuid'

export default class Comment {
  constructor (name, comment) {
    this.id = uuidv4()
    this.name = name
    this.description = comment
    this.date = new Date()
  }
}
