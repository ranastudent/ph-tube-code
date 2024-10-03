
// console.log('ankta lagsos?')
// time function

function getTimeString(time){
      // get hour and rest seconds 

      const hour = parseInt(time / 3600);
      let remainingSecond = parseInt(time % 3600)
      const minute = parseInt(remainingSecond / 60)
      remainingSecond = parseInt(remainingSecond % 60)

      return `${hour}  hour ${minute} minute ${remainingSecond} second ago`
}

const removeActiveClass = () =>{
      const buttons = document.getElementsByClassName("category-btn");
      // console.log(buttons)
      for (let btn of buttons){
            btn.classList.remove("active")
      } 
            
}



// 1. fetch, load and show catagories on html

// create loadCatagories

const loadCatagories = () => {
      // fetch the data

      fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
            .then(res => res.json())
            .then((data) => displayCatagories(data.categories))
            .catch((error) => console.log(error))
}
// create loadvideos
const loadvideos = (searchText ="") => {
      // fetch the data

      fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
            .then(res => res.json())
            .then((data) => displayVideos(data.videos))
            .catch((error) => console.log(error))
}

const loadCatagoriesVideo = (id) => {
      // alert(id)
      // fetch
      fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
            .then(res => res.json())
            .then((data) => {
                  // sonbai active class remove kro
                  removeActiveClass()
                  // id er class mumla dey
                  const activeBtn = document.getElementById(`btn-${id}`)
            //      console.log(activeBtn)
                 activeBtn.classList.add("active");
                  displayVideos(data.category)
                  
            })
            .catch((error) => console.log(error))
}

const loadDetails = async (videoId) =>{
      // console.log(videoId)
      const uri = `https://openapi.programming-hero.com/api/phero-tube/video/aaac${videoId}`
      const res = await fetch(uri);
      const data = await res.json();
      console.log(data)
}

const displayDetails = (video) => {
      // console.log(video);
      const displayContainer = document.getElementById('modal-content')

      displayContainer.innerHTML = `

      <img src=${video.thumbnail}/>
      <p>${video.description}</p>
      `
      document.getElementById('showModalData').click()

      document.getElementById("customModal").showModal()

};

// card object
//  const cardDemo = {
//       "category_id": "1003",
//       "video_id": "aaaf",
//       "thumbnail": "https://i.ibb.co/5LRQkKF/stick-and-stones.jpg",
//       "title": "Sticks & Stones",
//       "authors": [
//           {
//               "profile_picture": "https://i.ibb.co/rdTZrCM/dev.jpg",
//               "profile_name": "Dave Chappelle",
//               "verified": true
//           }
//       ],
//       "others": {
//           "views": "113K",
//           "posted_date": ""
//       },
//       "description": "Dave Chappelle's 'Sticks & Stones' has garnered 113K views and remains a controversial yet highly engaging piece of stand-up comedy. Known for his fearless approach, Dave dives into a wide range of topics, delivering his unique perspective with wit and sharp humor. As a verified artist, Dave's comedy is raw, honest, and unapologetically funny."
//   }
// create Displayvideos
const displayVideos = (videos) => {
      const videoContainer = document.getElementById("videos")
      videoContainer.innerHTML = ""
      if (videos.length == 0) {
            videoContainer.classList.remove("grid")
            videoContainer.innerHTML = `
                  <div class="min-h-[300px] w flex flex-col gap-5 justify-center items-center">
                  <img src="assets/Icon.png" />
                  <h2 class="text-center text-xl font-bold">
                  No content here in this category
                  </h2>
                  </div>
            `;
            return;
      }else{
            videoContainer.classList.add("grid")
      }
      videos.forEach((video) => {
            // console.log(video)
            const card = document.createElement("div")
            card.classList = "card card-compact "
            card.innerHTML = `
                   <figure class = "h-[200px] relative">
                        <img
                        src= ${video.thumbnail}
                        alt="Shoes"
                        class="h-full w-full object-cover" />

                        ${
                              video.others.posted_date?.length == 0? "" : `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white text-xs">${getTimeString(video.others.posted_date)}</span>`
                        }

                        
                  </figure>
                  <div class="px-0 py-2 flex gap-2">
                        <div>
                              <img class="w-10 h-10 rounded-full object-cover " src=${video.authors[0].profile_picture}/>
                        </div>
                       <div>
                              <h2 class="font-bold">${video.title}</h2>
                              <div class="flex items-center gap-2">
                                    <p class="text-gray-400 ">${video.authors[0].profile_name}</p>
                                    ${video.authors[0].verified === true? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />` : " " }
                                    
                              </div>
                              <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
                       </div>
                  </div>
            `
            videoContainer.append(card)
      })
}

// {
//       "category_id": "1001",
//             "category": "Music"
// }
// create DisplayCatagories

const displayCatagories = (categories) => {
      const categoryContainer = document.getElementById("categories")
      categories.forEach((item) => {
            // console.log(item);
            // create button
            const buttonContainar = document.createElement("button");
           buttonContainar.innerHTML = `
            <button id="btn-${item.category_id}" onclick ="loadCatagoriesVideo(${item.category_id})" class= "btn category-btn">
            ${item.category}
            </button>
           `
            
            // add button to category Container
            categoryContainer.append(buttonContainar)
      });
};

document.getElementById("search-input").addEventListener('keyup', (e)=>{
      console.log(e.target.value)
})

// call function
loadCatagories()
loadvideos()

// displayCatagories()