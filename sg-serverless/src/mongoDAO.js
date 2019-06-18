import _ from 'lodash'
export default class MongoDAO {
  constructor(Model) {
    this.Model = Model
  }

  findOne(id) {
    return this.Model.find({_id: id}).then(data => {
      return !_.isNil(data) && data.length > 0 ? data[0] : null
    })
  }

  __queryAfterBeforeLimit(__filter, projection, sortKey, {after, before, limit}) {
    if (limit === 0)
      return Promise.resolve([])

    if (!_.isNil(before) && !_.isNil(after)) {
      const filter = _.merge(__filter, {[sortKey]: {$lt: before, $gt: after}})

      return this.Model.find(filter, projection, {
        sort: {[sortKey]: -1},
        limit: Math.max(1, _.defaultTo(limit, 0)),
      })
    }
    else if (!_.isNil(after)) {
      const filter = _.merge(__filter, {[sortKey]: {$gt: after}})

      return this.Model.find(filter, projection, {
        sort: {[sortKey]: 1},
        limit: Math.max(1, _.defaultTo(limit, 0)),
      })
    }
    else if (!_.isNil(before)) {
      const filter = _.merge(__filter, {[sortKey]: {$lt: before}})

      return this.Model.find(filter, projection, {
        sort: {[sortKey]: -1},
        limit: Math.max(1, _.defaultTo(limit, 0)),
      })
    }
    else {
      return this.Model.find(__filter, projection, {
        sort: {[sortKey]: -1},
        limit: Math.max(1, _.defaultTo(limit, 0)),
      })
    }
  }
}
