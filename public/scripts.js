const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

const formDelete = document.querySelector("#form-delete")
    formDelete.addEventListener("submit", function(event) {
        const confirmation = confirm("Deseja Deletar?")
        if(!confirmation) {
            event.preventDefault()
        }
})

let totalPage = 20,
    selectedPage = 5,
    pages = [],
    oldPage

for(let currentPage = 1; currentPage <= totalPage; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPage
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

    if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
        pages.push(currentPage)

        if (oldPage && currentPage - oldPage > 2){
            pages.push("...")
        }

        if(oldPage && currentPage - oldPage == 2) {
            pages.push(oldPage + 1)
        }

        oldPage = currentPage
    }
}
console.log(pages)