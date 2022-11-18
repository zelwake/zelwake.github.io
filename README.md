# Space Transporter

Let's imagine that it's 2050 and we are able to travel through space.

Build a cool application that will be able to transport people anywhere in the
endless space.

## Database

Feel free to use [the provided SQL file](assets/space-transporter.sql).

## Frontend (`index.html`)

![main](assets/main.png)

- a heading with the title of the site

- create the table as depicted above

  - you should render the table dynamically with JS on page load

- buttons to move the spaceship to any planet

  - if you click 'move here', the table should re-render

- arrows to move the people

  - you can use buttons instead of links
  - consider using unicode characters for the arrows

- use AJAX/XHR to send requests to the backend

## Backend

- there should be only one spaceship and more planets

- when **Move here** button is clicked the backend should:

  - update the spaceship so it will move to the given planet
  - spaceship can be only at one planet at a time
  - save the changes to the database

- when **to planet** link is clicked the backend should

  - increase the population of the planet and in contrast decrease the
    utilization of the spaceship with the same amount

  - save the changes to the database

- when **to ship** link is clicked the backend should

  - increase the utilization of the spaceship and in contrast decrease the
    population of the planet with the same amount

  - save the changes to the database

- *the max capacity of the spaceship* is 60, it's fine to hard code it somewhere

  - it can *NOT* transport more people then this number
  - and it can *NOT* hold more people in the spaceship than the max capacity

### GET `/api/planets`

- it should return the list of planets with the population

```json
[
    {
     "id": 1,
     "name": "Moon",
     "population": 50
    },
    ...
]
```

### PATCH `/api/spaceship`

- this endpoint should be responsible for moving the ship around

- you should check if the `id` of the planet equals to the `planetId` of the spaceship

- update the the spaceship with the target planet

#### Request format

```json
{
  "planetId": 2
}
```

#### Response format

```json
{"isSuccess": true}
```

OR:

```json
{"isSuccess": false}
```

### POST `/api/passengers/toship/{planet_id}`

- this endpoint should move the people to the ship

  - the max capacity of people can be moved on one click

  - if there is less people on the planet than the max capacity of the ship,
    move everybody to the ship

  - if there is less people on the spaceship than the max capacity, then only
    remove people from the planet that fills up the spaceship to the full
    capacity

### POST `/api/passengers/toplanet/{planet_id}`

- this endpoint should move all the people to the planet
- reset the spaceship utilization to zero
- increase planet population

## Question

You are working with following SQL table of 10 outstanding videogames:

| id | name                     | genre      | releaseDate | developer              | engine            | price | rating |
|---:|:-------------------------|:-----------|------------:|:-----------------------|:------------------|------:|-------:|
|  1 | The Witcher 3: Wild Hunt | RPG        |  2015-05-19 | CD Projekt Red         | REDengine 3       |  1499 |    9.2 |
|  2 | Half-Life 2              | FPS        |  2004-11-16 | Valve                  | Source            |   299 |    8.7 |
|  3 | The Sims                 | Simulation |  2000-01-31 | Maxis                  | Custom            |   199 |      9 |
|  4 | BioShock                 | FPS        |  2007-08-21 | 2K                     | Unreal Engine 2.5 |   350 |    9.1 |
|  5 | BioShock: Infinite       | FPS        |  2013-03-26 | Irrational Games       | Unreal Engine 3   |   699 |    8.4 |
|  6 | Quake                    | FPS        |  1996-07-22 | id Software            | Quake engine      |   299 |    8.6 |
|  7 | Diablo                   | RPG        |  1996-12-31 | Blizzard North         | DEngine           |   299 |    8.9 |
|  8 | World of Warcraft        | MMORPG     |  2004-11-23 | Blizzard Entertainment | Custom            |   499 |    8.8 |
|  9 | Grand Theft Auto V       | Advenure   |  2013-09-17 | Rockstar North         | RAGE              |   899 |    8.8 |
| 10 | Undertake                | Roleplay   |  2015-09-15 | Toby Fox               | GameMaker Studio  |   399 |    9.1 |

`1.` Write SQL query that will return top 2 rated FPS game's 
titles and developers.

`2.` Write SQL query that will make every game released in 20th century 
go on sale (reduce its price by 200).
