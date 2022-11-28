const express = require("express")
const app = express()
const PORT = 3000;

const con = require("./db")                     //* propojení databáze

app.set("view engine", "ejs")                   //* view engine ejs místo klasického html

app.use(express.urlencoded({ extended: true })) //* HTML form format
app.use(express.json())                         //* json body format

app.use(express.static('public'))               //* statická složka public v root


const databaseQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        con.query(query, params, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}


app.listen(PORT, () => console.log(`Running at @localhost:${PORT}`))

app.get("/", (q, s) => {
    s.sendFile(__dirname + "/index.html")
})

app.get("/api/items", (q, s) => {
    databaseQuery("SELECT * FROM auction", [])
        .then(data => {
            // console.log(data)

            result = data.map(item => {
                const r = {}
                r.id = item.id
                r.itemName = item.name
                r.expiryDate = item.expiration_date
                r.highestBid = item.highest_bid
                r.highestBidderName = item.bidder

                return r
            })

            // console.log(result)

            s.send(result)
        })
})

app.post("/api/items", (q, s) => {
    const par = {
        name: q.body.name,
        highest_bid: q.body.bid,
        bidder: q.body.bidder
        // date_js: Math.floor(Date.now() / 1000)
    }

    databaseQuery("INSERT INTO auction SET ?", par)
        .then(() => s.sendStatus(200))
        .catch(err => s.sendStatus(500))
})

app.post("/api/items/:id/bids", async (q, s) => {
    const { name, amount } = q.body
    const { id } = q.params

    const dateNow = new Date()

    const item = await databaseQuery("SELECT * FROM auction WHERE id = ?", id)
        .then(data => data[0])

    if (item.highest_bid >= Number(amount))
        return s.json({ "message": "Your bid is below the highest bid!" })

    if (dateNow > new Date(item.expiration_date)) {
        return s.json({ "message": "The auction is over!" })
    }

    s.json({ "message": "Successful!" })

    databaseQuery("UPDATE auction SET highest_bid = ?, bidder = ? WHERE id = ?", [amount, name, id])
})