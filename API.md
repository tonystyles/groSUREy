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

### get lists

`method` GET
`route` /lists
`query` ?groupId=<groupId>

- key: `listId`
- value: number

`returns` json

- **lists**: array of list objects:
  - \_id: number
  - group_id: number
  - name: string

### create lists

`method` POST
`route` /lists
`body` json

- **groupId**: number
- **name**: string

`returns` json

- **list**: list object
  - \_id: number
  - group_id: number
  - name: string

### update list

`method` PUT
`route` /lists
`body` json

- **listId**: number
- **name**: string

`returns` json

- **list**: list object
  - \_id: number
  - group_id: number
  - name: string

### delete list

`method` DELETE
`route` /lists
`body` json

- **listId**: number

`returns` n/a

## Items Api

### get items

`method` GET
`route` /items?listId=<listId>
`query`

- key: `listId`
- value: number

`returns` json

- **items**: array of item objects:
  - \_id: number
  - list_id: number
  - name: string
  - checked: boolean
  - max_price: number
  - brand: string
  - quantity: string
  - notes: string

### create items

`method` POST
`route` /items
`body` json

- **item**: object

  - listId: number
  - name: string
  - quantity: string

  _optional_

  - maxPrice: number
  - brand: string
  - notes: string

`returns` json

- **item**: item object
  - \_id: number
  - list_id: number
  - name: string
  - checked: boolean
  - max_price: number
  - brand: string
  - quantity: string
  - notes: string

### update item

`method` PUT
`route` /items
`body` json

- **itemId**: number
- **item**: object

  _optional_

  - name: string
  - quantity: string
  - maxPrice: numberor null
  - notes: string
  - checked: boolean

`returns` json

- **item**: item object
  - \_id: number
  - list_id: number
  - name: string
  - checked: boolean
  - max_price: number
  - brand: string
  - quantity: string
  - notes: string

### delete item

`method` DELETE
`route` /items
`body` json

- **itemid**: number

`returns` n/a
