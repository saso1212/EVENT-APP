import sampleData from './sampleData'

const delay=(ms)=>{

   // return new Promise(resolve=>setTimeout(resolve,ms))
   //setTimeout expects a reference to function.
      return new Promise(resolve=>setTimeout(()=>resolve(sampleData),ms))
}

// export const fatchSampleData=()=>{
//     return delay(1000).then(()=>{
//         //return Promise.resolve(sampleData)
//         return new Promise(resolve=>resolve(sampleData))
//     })
// }
export const fatchSampleData=()=>{
    return delay(1000)
}