
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value= "${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    console.log(event.target.value)
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
        .then(res => res.json())
        .then(cities => {
            citySelect.innerHTML = "<option value> Selecione a cidade </option>"
            citySelect.disabled = true
            for (const city of cities) {
                citySelect.innerHTML += `<option value= "${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })


}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name= items]")

let SelectedItems = []
function handleSelectedItem(event) {
    const itemId = event.target.dataset.id
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    const alreadySelected = SelectedItems.findIndex(function (item) {
        const itemFound = item == itemId
        return itemFound
    })
    if (alreadySelected >= 0) {
        const filteredItems = SelectedItems.filter(item => {
           const itemIsDifferent = item != itemId
            return itemIsDifferent       
         })
         SelectedItems = filteredItems
    } else{
        SelectedItems.push(itemId)
    }
    collectedItems.value = SelectedItems
}

