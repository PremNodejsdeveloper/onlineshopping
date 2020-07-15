Som prequest api before firing 1 and 2 api

adduser ----- http://localhost:3000/api/users/adduser
request json {
"name": "prem",
"phone": 9905503843,
"address": "abcd"
}

add product --- http://localhost:3000/api/products/addnew
{
"name": "watch",
"unit_price": 200,
"description": "mens watch"
}

1.API Post --- http://localhost:3000/api/users/add
request.json body
{
"name": "XYZ",
"phone": 1234567890,
"address": "abcd",
"transaction": {
"product": {
"name": "watch",
"unit_price": 200,
"description": "mens watch",
"quantity": 1
}
}
}

2. Get API
   get -- http://localhost:3000/api/users/lists
