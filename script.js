let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-btn';
let totalCount = document.getElementById('totalCount');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');
let totalJobs = document.getElementById('job-number');

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');

const allCard = document.getElementById('all-cards');
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')


function calculateCount() {
    const total = allCard.children.length;
    const interview = interviewList.length;
    const rejected = rejectedList.length;

    totalCount.innerText = total;
    interviewCount.innerText = interview;
    rejectedCount.innerText = rejected;

    if (currentStatus === 'interview-btn') {
        totalJobs.innerText = `${interview} of ${total}`;
    } else if (currentStatus === 'rejected-btn') {
        totalJobs.innerText = `${rejected} of ${total}`;
    } else {
        totalJobs.innerText = total;
    }
}

calculateCount();

function toggleStyle(id) {
    allBtn.classList.add('bg-white', 'text-gray-600');
    interviewBtn.classList.add('bg-white', 'text-gray-600');
    rejectedBtn.classList.add('bg-white', 'text-gray-600');

    allBtn.classList.remove('bg-blue-700', 'text-white');
    interviewBtn.classList.remove('bg-blue-700', 'text-white');
    rejectedBtn.classList.remove('bg-blue-700', 'text-white');

    const selected = document.getElementById(id);
    currentStatus = id
    console.log(currentStatus);

    selected.classList.remove('bg-white', 'text-gray-600')
    selected.classList.add('bg-blue-700', 'text-white')

    if (id == 'interview-btn') {
        allCard.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview()
    } else if (id == 'all-btn') {
        allCard.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-btn') {
        allCard.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderRejected()
    }
    calculateCount();

}



mainContainer.addEventListener('click', function (event) {

    const parentNode = event.target.closest('.card');
    if (!parentNode) return;

    const cardName = parentNode.querySelector(".card-title").innerText;
    if (event.target.classList.contains('dlt-btn') || event.target.closest('.dlt-btn')) {

        parentNode.remove();

        interviewList = interviewList.filter(item => item.cardName !== cardName);
        rejectedList = rejectedList.filter(item => item.cardName !== cardName);


        const allCardNode = Array.from(allCard.children).find(c =>
            c.querySelector(".card-title").innerText === cardName
        );
        if (allCardNode) allCardNode.remove();

        calculateCount();
        return;
    }


    if (event.target.classList.contains('btn-interview')) {
        const parentNode = event.target.closest('.card');

        parentNode.querySelector('.status').innerText = 'INTERVIEW';
        parentNode.querySelector('.status').className = 'status inline-block px-3 py-2 bg-white border-1 font-semibold rounded-md border-green-400 text-green-400';


        const cardInfo = {
            cardName: parentNode.querySelector(".card-title").innerText,
            titleText: parentNode.querySelector(".title-text")?.innerText,
            jobDesc: parentNode.querySelector(".job-desc")?.innerText,
            description: parentNode.querySelector(".description")?.innerText,
            status: "INTERVIEW"
        };

        const cardExist = interviewList.find(item => item.cardName == cardInfo.cardName)

        if (!cardExist) {
            interviewList.push(cardInfo)
        }
        rejectedList = rejectedList.filter(item => item.cardName != cardInfo.cardName)

        if (currentStatus == 'rejected-btn') {
            renderRejected();
        }



        calculateCount();

    } else if (event.target.classList.contains('btn-reject')) {
        const parentNode = event.target.closest('.card');
        parentNode.querySelector('.status').innerText = 'REJECTED';
        parentNode.querySelector('.status').className = 'status inline-block px-3 py-2 bg-white border-1 font-semibold rounded-md border-red-400 text-red-400';


        const cardInfo = {
            cardName: parentNode.querySelector(".card-title").innerText,
            titleText: parentNode.querySelector(".title-text")?.innerText,
            jobDesc: parentNode.querySelector(".job-desc")?.innerText,
            description: parentNode.querySelector(".description")?.innerText,
            status: "REJECTED"
        };

        const cardExist = rejectedList.find(item => item.cardName == cardInfo.cardName);


        if (!cardExist) {
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.cardName != cardInfo.cardName)
        if (currentStatus == "interview-btn") {
            renderInterview();
        }
        if (currentStatus == "rejected-btn") {
            renderRejected();
        }

        calculateCount()

    }

})

function renderInterview() {
    filterSection.innerHTML = ''
    for (let inter of interviewList) {
        console.log(inter);

        let div = document.createElement('div');
        div.className = 'card border-1 border-slate-200 rounded-md p-6 mt-4 space-y-5'
        div.innerHTML = `
                <div class="flex justify-between">
                    <div>
                        <p class="card-title font-bold text-[#002C5C]">${inter.cardName}</p>
                        <p class=" title-text text-gray-400 text-[16px] ">${inter.titleText}</p>
                    </div>
                    <div class="py-2">
                        <button class="dlt-btn py-[9px] px-[10px] border-1 border-gray-200 rounded-full"><i
                                class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>
                <div>
                    <p class=" job-desc text-gray-400">${inter.jobDesc}</p>
                </div>
                <div>
                    <p class="status inline-block px-3 py-2 bg-white border-1 font-semibold rounded-md border-green-400 text-green-400">${inter.status}</p>
                    <p class="description text-[#323B49]">${inter.description}</p>
                </div>

                <div class="flex gap-2">
                    <button
                        class="btn-interview px-3 py-2 bg-white border-1 font-semibold rounded-md border-green-400 text-green-400">INTERVIEW</button>
                    <button
                        class="btn-reject px-3 py-2 bg-white border-1 font-semibold rounded-md border-red-400 text-red-400">REJECTED</button>
                </div>
        
        `
        filterSection.appendChild(div)


    }


}

function renderRejected() {

    filterSection.innerHTML = ''

    for (let reject of rejectedList) {
        console.log(reject);
        let div = document.createElement('div');
        div.className = 'card border-1 border-slate-200 rounded-md p-6 mt-4 space-y-5'
        div.innerHTML = `
                <div class="flex justify-between">
                    <div>
                        <p class="card-title font-bold text-[#002C5C]">${reject.cardName}</p>
                        <p class=" title-text text-gray-400 text-[16px] ">${reject.titleText}</p>
                    </div>
                    <div class="py-2">
                        <button class="dlt-btn py-[9px] px-[10px] border-1 border-gray-200 rounded-full"><i
                                class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>
                <div>
                    <p class=" job-desc text-gray-400">${reject.jobDesc}</p>
                </div>
                <div>
                    <p class=" status inline-block px-3 py-2 bg-white border-1 font-semibold rounded-md border-red-400 text-red-400 ">${reject.status}</p>
                    <p class="description text-[#323B49]">${reject.description}</p>
                </div>

                <div class="flex gap-2">
                    <button
                        class="btn-interview px-3 py-2 bg-white border-1 font-semibold rounded-md border-green-400 text-green-400">INTERVIEW</button>
                    <button
                        class="btn-reject px-3 py-2 bg-white border-1 font-semibold rounded-md border-red-400 text-red-400">REJECTED</button>
                </div>
        
        `
        filterSection.appendChild(div)

    }
}

