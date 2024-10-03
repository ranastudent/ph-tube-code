
// const isVerified = true;

// if (isVerified === true) {
//       console.log('user is verified')
// }else{
//       console.log('user is verified')
// }

// console.log(`${isVerified ===true? 'user is verified' : 'user is verified' }`)

function getTimeString(time){
      // get hour and rest seconds 

      const hour = parseInt(time / 3600);
      let remainingSecond = parseInt(time % 3600)
      const minute = parseInt(remainingSecond / 60)
      remainingSecond = parseInt(remainingSecond % 60)

      return `${hour}  hour ${minute} minute ${remainingSecond} second ago`
}

console.log(getTimeString(4000))