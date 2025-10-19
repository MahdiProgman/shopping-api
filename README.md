# 🛍 Shopping API 
a structured shopping system.

## 🧰 Tech Stack
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png" width="20"/> Node.js
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/nest_js.png" width="20"/> NestJS
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mysql.png" width="20" /> MySQL (maybe temporary 🤷‍♂️)
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" width="20"/> TypeScript
- <img src="https://www.freelogovectors.net/wp-content/uploads/2022/01/prisma_logo-freelogovectors.net_.png" width="20" /> Prisma ORM


# 🛣 Roadmap

* [ ] auth system 🗝
    * [ ] build the base opreations like register and login
    * [ ] build things like guard and access token generator
    * [ ] add google oauth system (the fantastic part🤩)
* [ ] users 👤
    * [x] implement user model
    * [ ] create basic endpoints like getting profile or change informations
    * [ ] create a system for verifing email for opreations like reset password and change email (wowwww!!🤩) 
    * [ ] add account linking/unlinking system (let me die)
    * [ ] allow user to see and terminate sessions
* [ ] 💻 sessions
    * [x] implement session model
    * [ ] implement features like getting sessions and terminating
* [ ] 🛍 implement other models
    * [ ] implement product, product_comment, favorites, cart, orders and their domain layer
    * [x] add role field to user model and create permission model with it's domain layer
    * [ ] implement ticket model and their domain layer
    * [ ] 📊 implement statistics models and their domain layer

### planning in future

owner and admins, products, ticket system, products and product recommendation system and ...

# 🏃 How to Run It
first of all, clone it
```bash
git clone https://github.com/MahdiProgman/shopping-api
```
after cloning it, go into it and install dependencies
```bash
yarn install
```
now, you must rename .env.example to .env.development.local and set vars correctly on it.

next is app dependencies, for running dependencies like DB, there is docker!
```bash
yarn docker-up:dev
```
> DON'T CLOSE IT, JUST OPEN A NEW COMMAND LINE:)

so, now you must run database migrations
```bash
yarn migrate:dev
```
now, DB is ready:)
for running the best API just run this.
```bash
yarn start:dev
```
and now this guy run on the port which is set on .env.development.local

# 🧪 How to Run Tests?
just run this on your terminal :
```bash
yarn test
```
# 📄 Documentation
for viewing docs, go to this address :
```bash
http://localhost:PORT/api/docs
```

# 🫶 How to Support Me?
I just wanted your attention, and now I got it 😎
If you want to make me even happier, just give a ⭐!
