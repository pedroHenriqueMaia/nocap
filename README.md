<!-- <p align="center" style="wisth: 200px">
  <img style="with: 200px" src="frontend/src/images/nocap.png" />
</p> -->
<h1 align="center">NoCap - Blog</h1><br>

## Comando para subir o backend na porta 8000 no localhost
partindo da raiz do projeto
```
$ cd backend
$ npm run install
$ npm run build
$ docker-compose up
```

## Comando para subir o fronten na porta 3000 no localhost
partindo da raiz do projeto
```
$ cd frontend
$ npm run install
$ npm run start
```
------------------------------------------------------
## Comando para rodar os testes unitarios
partindo da raiz do projeto com o backend iniciado
```
$ npm run test:watch

ou

$ npm run test:watch <nome do arquivo(service)>
```
-----------------------------------------------------
## Sobre o Projeto (Tecnologias, banco de dados, finalidade...)
- Backend do projeto desenvolvido em [NestJs](https://nestjs.com/)
    - Banco de dados (PostgresSQL)
    - TypeOrm
    - Graphql
    - Docker
    - JWT

<br>

- Frontend desenvolvido em [ReactJS](https://pt-br.reactjs.org/)
    - Bootstrap 4
    - Apollo Client


-----------------------------------------------------
## Layouts do projeto
<br>
(Tela para criar sua conta)
<img src="frontend/src/images/1.png">

<br>
(Tela para fazer login)
<img src="frontend/src/images/2.png">

<br>
(Tela "Home" do projeto, resposavel por listar todas as publicações)
<img src="frontend/src/images/3.png">

<br>
(Tela responsavel de criar publicação)
<img src="frontend/src/images/4.png">

<br>
(Tela "Home" do projeto, listando as publicações criadas)
<img src="frontend/src/images/5.png">

<br>
(Curtindo publicações na tela "Home" do projeto)
<img src="frontend/src/images/6.png">
