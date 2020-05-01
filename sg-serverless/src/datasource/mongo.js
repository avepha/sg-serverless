import mongoose from 'mongoose'

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const mongoConnection = mongoose.createConnection(
  'mongodb+srv://alfarie01:Alfarie01@smartgrobot-production-miawt.mongodb.net/test?retryWrites=true&w=majority',
  {useNewUrlParser: true}
)

export default mongoConnection
