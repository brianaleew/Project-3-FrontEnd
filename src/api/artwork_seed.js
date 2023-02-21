const axios = require('axios')

// populate this array with search params
// either artist last name or a 'culture' name, like 'french' or 'egyptian' will work
// let queryParams = ['Picasso', 'VanGogh', 'Dali', 'DaVinci', 'Klimt']
// let objectArr = []

// // let urls = queryParams.map(
// //     param =>
// //         `https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=${param}`
// // )
// // axios call to pull data from the metropolitan museun public api
// export const retrieveData = urls => {
//     return Promise.all(urls.map(populateData))
//     //now take the array of objectId's returned in the res and maop over them to push into the artwork subdoc
// }

// const populateData = url => {
//     return axios
//         .get(url)
//         .then(res => {
//             let indexArr = []
//             const numberOfDataToPull = 5
//             const randomIndex = () => Math.floor(Math.random() * res.data.total)
//             for (let i = 0; i < numberOfDataToPull; i++) {
//                 console.log('random pick: ', res.data.objectIDs[randomIndex()])
//                 indexArr.push(res.data.objectIDs[randomIndex()])
//             }
//             console.log('the array of random picks: ', indexArr)
//             indexArr.map
//             return indexArr
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

// retrieveData(urls)
//     .then(res => console.log('res is: ', res))
//     .catch(err => console.log(err))

// Promise.all(async )
// first we connect to the db
// then remove all pets
// then add the start pets
// and always close the connection, whether its a success or failure

// mongoose
//     .connect(db, {
//         useNewUrlParser: true,
//     })
//     .then(() => {
//         Gallery.deleteMany()
//             .then(deletedGalleries => {
//                 console.log('the deleted pets:', deletedGalleries)
//                 // now we add our pets to the db
//                 Gallery.create(starterGalleries)
//                     .then(newGalleries => {
//                         console.log('the new pets', newGalleries)
//                         mongoose.connection.close()
//                     })
//                     .catch(error => {
//                         console.log(error)
//                         mongoose.connection.close()
//                     })
//             })
//             .catch(error => {
//                 console.log(error)
//                 mongoose.connection.close()
//             })
//     })
//     .catch(error => {
//         console.log(error)
//         mongoose.connection.close()
//     })
