
document.querySelector("#button").addEventListener("click", e => {
    e.preventDefault()

    const name = document.querySelector("input[name='name']")
    const amount = document.querySelector("input[name='amount']")
    const id = document.querySelector("select").value

    fetch(`/api/items/${id}/bids`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            amount: amount.value
        })
    })
        .then(response => response.json())
        .then(data => {

            const m = data.message
            const p = document.querySelector("p")

            console.log(m);

            switch (m) {
                case "Your bid is below the highest bid!":
                    p.innerText = m
                    break;

                case "The auction is over!":
                    p.innerText = m
                    name.value = ""
                    amount.value = ""
                    fetchItems()

                    break;

                default:
                    p.innerText = ""
                    name.value = ""
                    amount.value = ""
                    fetchItems()
                    break;
            }


        })
})

const fetchItems = () => {
    fetch("/api/items")
        .then(response => response.json())
        .then(json => {
            console.log(json)

            const ul = document.querySelector("ul")
            ul.innerHTML = ""
            const select = document.querySelector("select")
            select.innerHTML = ""

            for (const item of json) {
                ul.innerHTML +=
                    `
                <li>${item.itemName} (highest bid: ${item.highestBid}, ${item.highestBidderName})</li>
                `
                select.innerHTML +=
                    `
                <option value="${item.id}">${item.itemName}</option>
                `
            }
        })
}

fetchItems()