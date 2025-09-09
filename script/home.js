const videosdetails = document.getElementById('video_details');
console.log(videosdetails)






const removeActiveClass = () =>{
    const categoriesContainer = document.getElementsByClassName('bg-[#FF1F3D]', 'text-white')
;
for(const cat of categoriesContainer){
    cat.classList.remove('bg-[#FF1F3D]', 'text-white')
    console.log(cat)
}}

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            document.getElementById('btn-all').classList.add('bg-[#FF1F3D]', 'text-white');
            displayVideos(data.videos)
        })
}


const loadVideoDetails = (id) => {
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then(res => res.json())
    .then(data => {
        displayVideosDetails(data.video)
    })
}

// displayVideosDetails 
const displayVideosDetails = (video) =>{
    console.log(video)
    // console.log('sharafat rohoamn')
    const videoDetails = document.getElementById('video_details');
    console.log(videoDetails)


    // const showModals = document.getElementById("video_details");
    // showModals.showModal();
}


const loadCategoriesVideos = (id) => {
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedCategory = document.getElementById(`category-${id}`);
            clickedCategory.classList.add('bg-[#FF1F3D]', 'text-white');
            console.log(clickedCategory)
            displayVideos(data.category)
        })

}


const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');

    for (let cat of categories) {
        console.log(cat)
        const catDiv = document.createElement('div');
        catDiv.innerHTML = `
        <button id='category-${cat.category_id}' onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoriesContainer.appendChild(catDiv)
    }


}

const displayVideos = (videos) => {
    // console.log(videos)
    const videosContainer = document.getElementById('videos-container');

    videosContainer.innerHTML = '';

    if (videos.length === 0) {
        videosContainer.innerHTML = `
            <div class="flex flex-col justify-center items-center col-span-4">
                <img src="asset/Icon.png" alt="">
                <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
        `;
        return;
    }

    /* 
    {
    "category_id": "1003",
    "video_id": "aaac",
    "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
    "title": "Laugh at My Pain",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
            "profile_name": "Kevin Hart",
            "verified": false
        }
    ],
    "others": {
        "views": "1.1K",
        "posted_date": "13885"
    },
    "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
}
    */

    videos.forEach(video => {
        // console.log(video)
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
                <figure class="relative">
                    <img class= 'w-full h-[150px] object-cover' src="${video.thumbnail}" alt="Shoes" />
                    <span class="absolute bottom-2 right-2 bg-black text-sm text-white rounded px-2">3hrs 56 min
                        ago</span>
                </figure>
                <div class="flex gap-3 p-4">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="intor">
                        <h2 class="text-sm font-semibold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name}<img class="w-5 h-5"
                                src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""> </p>
                                <p class="text-sm text-gray-400">${video.others.views}</p>
                    </div>
                </div>

                <button onclick="loadVideoDetails()" class="w-full btn btn-block">Show Details</button>
                
            </div>
    `;

        videosContainer.appendChild(videoCard);

    })



}







loadCategories();
