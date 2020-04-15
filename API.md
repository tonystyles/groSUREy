# **groSUREy API**

## Table of Contents

- [User](#user-api)
- [Groups](#groups-api)
- [Lists](#lists-api)
- [Items](#items-api)

## User Api

### Login

`method` POST
`route` /user/login
`body` json

- **username** : string
- **password**: string

`returns` json

- **verified**: boolean
- **isLoggedIn**: boolean
- **userId**: number

### Logout

`method` POST
`route` /user/logout
`body` none

### Signup

`method` POST
`route` /user/signup
`body` json

- **username** : string
- **password**: string
- **fullName**: string
- **email**: string
- **alias**: string

`returns` json

- **verified**: boolean
- **isLoggedIn**: boolean
- **userId**: number

## Groups Api

## Lists Api

## Items Api
