import dynamoose from 'dynamoose'

export async function playground() {
  const Cat = dynamoose.model('Cat', {
    id: Number,
    name: String
  })

  const garfield = new Cat({
    id: 666,
    name: 'Garfield'
  })


  return garfield.save()
}
