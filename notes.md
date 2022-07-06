# NOTES

nodejs : env d'exc de JS
=> des bibliothéques
=> npm : node package manager : gestionnaire de dépendences nodejs
biblio : library : package : dependence : dependency
gestion => installation <> désinstallation , màj

global , local => Global => @angular/cli

npm i esm-el-bibliotheque

npm = yarn : js package managers

express

- creation d'un serveur ( listen )
- creation des APIs ( GET , POST , PUT/PATCH , DELETE )

REST PROTOCOL => REST API => RESTful APIs

- RPC
- GRPC
- GraphQL
- SOAP ( xml )

REQUETTE HTTP :
-- METHODE => HEAD , PARAMS , BODY [ OBJECT ou ARRAY ] ( POST , PUT/PATCH )
-- XML , JSON

// APIS => METHODE + /ROUTE-NAME ++ FUNCTION
// p1 => object => Request
// p2 => object => Response

nodemon

- restart auto when ctrl + s

old version search
let user
        let trouve = false
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == myId) {
                user = users[i]
                trouve = true
                break;
            }
        }

        if (trouve == true) {
            res.status(200).send(user)
        } else {
            res.status(404).send({ message: "user not found" })
        }

----
main features

- Gestion des formateurs "/trainers"
- Gestion des formations "/trainings"
- Gestion des categories "/categories"
- Gestion des utilisateurs "/users"
- Gestion des messageries "/messages"

--- Gestion =>

-- Gestion =>
ajouter : POST "/" , <http://localhost:3000/trainer/>
afficher tous : GET "/" ,
afficher par id : GET "/:id",
modifier : PATCH "/:id",
supprimer : DELETE "/:id"

mongoose : ODM => object document mapping

API with then catch
app.get('/', (req, res) => {
  User
    .find()
    .then((users) => {
      res.status(200).send(users)
    })
    .catch((error) => {
      res.status(400).send({ message: "Error fetching users !", error: error })
    })
})

API with async await
app.get('/', async (req, res) => {
  try {
    let users = await User.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ message: "Error fetching users !", error: error })
  }
})
