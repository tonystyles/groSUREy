# **groSUREy API**

## Table of Contents

- [User](#user-api)
- [Groups](#groups-api)
- [Lists](#lists-api)
- [Items](#items-api)

## User Api

### User Data

`method` GET
`route` /user
`returns`

- **isLoggedIn**: boolean
- **userData**:
  - \_id: number;
  - username: string;
  - profile_pic: null or string (url to pic)
  - alias: null or string
  - email: strgin

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

### Get Groups of Logged In User

`method` GET
`route` /groups
`returns` json

- **isLoggedIn**: boolean;
- **groups**: array of group objects:
  - \_id: number;
  - groupname: string;
  - alias: null or string;
  - picture: null or string;

### Create Group

`method` POST
`route` /groups/create
`body` json

- **groupName**: string _must be unique_
- **alias**: string

`returns` json

- **isLoggedIn**: boolean;
- **group**: object
  - \_id: number;
  - groupname: string;
  - alias: null or string;
  - picture: null or string

### join group

`method` POST
`route` /groups/join
`body` json

- **groupId**: number;
  `returns` json

- **isLoggedIn**: boolean;
- **groups**: array of group objects:
  - \_id: number;
  - groupname: string;
  - alias: null or string;
  - picture: null or string;

## Lists Api

## Items Api
