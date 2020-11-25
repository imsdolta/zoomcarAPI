# Car Rental System API

## what's inside 🚗
---
```
1. Sign UP                                   ✅
2. Login                                     ✅
3. Book a car                                ✅
4. Find car based on id (non booked)         ✅
5. for a user show cars he has booked        ✅
4. Find non booked car based on id           ✅
5. show cars user has booked                 ✅
```


# Installation

```
npm install 
```

# REST API
---
The REST API to the example app is described below.
---
## Register

### POST /register
Request body 
```
{
	"username":"john doe",
	"email":"johndoe@gmail.com",
	"password":"*********",
	"password2":"*********"
}
```
## Login 


### POST /login
Request body 
```
{
	"username":"john doe",
	"email":"johndoe@gmail.com"
}
```

## Show all cars

### GET /admin/showall
Response 
```
[
  {
    "isRented": true,
    "_id": "5fa43f11515cbe0e2800e31f",
    "model": "mini cooper xv15",
    "price": 1650000,
    "year": 2011,
    "creationDate": 1604599569298,
    "__v": 0
  }
]
```

## Book car by ID 

### POST /cars/booking 
Request body
```
{
	"carId" : "mini cooper xv15",
	"rentalDate": "{% now 'iso-8601', 'dd mm yy' %}",
	"rentalDays":11
}
```


## Get booking for current User
### GET /booking 
Request body
```
{
  id : 'user id'
}
```

## Add cars 
## POST /AddCar
Request body 
```
{
    "model": "xuv500 AT509",
    "price": 2450000,
    "year": 2012,
    "creationDate": 5604599569232,
}
```

