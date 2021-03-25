# GIRAFFE STORE API
Provides store data, handles item stock and the review system

## GIRAFFES ALL
**Request Format:** /giraffes/all

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns all items in stock

**Example Request:** /giraffes/all

**Example Response:**

```json
[
    {
        "id": 5,
        "name": "Jebediah",
        "description": "Has very soft ears, requests scritches often.",
    }
]
```

**Error Handling:**
If there is an error with the request a 400 error will be given with the message:
"Unable to process request".
If the API is unable to provide a response a 500 error will be given with the message:
"The server has encountered an issue".

## GIRAFFE
**Request Format:** /giraffes/item

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Retrieves information about a single item

**Example Request:** /giraffes/Tall-Giraffe

**Example Response:**

```json
[
    {
        "id": 5,
        "name": "Jebediah",
        "price": "9 yoinks",
        "description": "Has very soft ears, requests scritches often.",
        "spot_density": "Low",
        "neck_length": "1.9m",
        "stock": 19
    }
]
```

**Error Handling:**
If there is an error with the request a 400 error will be given with the message:
"Unable to process request: Item not found".
If the API is unable to provide a response a 500 error will be given with the message:
"The server has encountered an issue".

## SEARCH
**Request Format:** /giraffes/search/name

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Searches for an item that matches the given name

**Example Request:** /giraffes/search/tall-giraffe

**Example Response:**

```json
[
    {
        "id": 5,
        "name": "Jebediah",
        "price": "9 yoinks",
        "description": "Has very soft ears, requests scritches often.",
        "spot_density": "Low",
        "neck_length": "1.9m",
        "stock": 19
    }
]
```

**Error Handling:**
If there is an error with the request an error will be thrown which the client must handle or display.

## REVIEWS
**Request Format:** /giraffes/reviews/name

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Searches for reviews that match the given name

**Example Request:** /giraffes/reviews/tall-giraffe

**Example Response:**

```json
[
    {
        "name": "Alex Jones",
        "review": "GIRAFFES ARE NOT REAL FOLKS I SEEN IT! THEY ARE GOVERNMENT DRONES OUT TO STEAL YOUR\r\n           CHILDRENS' BELIEFS! DON'T LISTEN TO THESE LIVES AND DON'T BRING ONE INTO YOUR HOME!"
    }
]
```

**Error Handling:**
If there is an error with the request an error will be thrown which the client must handle or display.

## REVIEW
**Request Format:** /giraffes/add-review

**Request Type:** POST

**Request Body**:
```
body : {
  "name": "reviewer name",
  "product": "item name",
  "review": "review text"
}
```

**Description:** Adds a review to the server, the next page load will show the new review

**Example Request:** /giraffes/add-review

**Error Handling:**
If there is an error with the request a 400 error will be given with the message:
"Unable to process request: User has already submitted a review for this item".
If the API is unable to provide a response a 500 error will be given with the message:
"The server has encountered an issue".

## FEEDBACK
**Request Format:** /giraffes/add-feedback

**Request Type:** POST

**Request Body**:
```
body : {
  "name": "commenter name",
  "feedback": "feedback text"
}
```

**Description:** Adds user feedback to the server, the next page load will show the new feedback

**Example Request:** /giraffes/add-feedback

**Error Handling:**
If there is an error with the request a 400 error will be given with the message:
"Unable to process request: User has already submitted feedback".
If the API is unable to provide a response a 500 error will be given with the message:
"The server has encountered an issue".

## FEEDBACK
**Request Format:** giraffes/purchase

**Request Type:** POST

**Request Body**:
```
body : {
  "cart": "[
      {
          "id": 5,
          "name": "Jebediah",
          "price": "9 yoinks",
          "description": "Has very soft ears, requests scritches often.",
          "spot_density": "Low",
          "neck_length": "1.9m",
          "stock": 19
      }
  ]",
}
```

**Description:** Simulates a purchase, decrements stock of purchased items.

**Example Request:** /giraffes/purchase

**Error Handling:**
If there is an error with the request a 400 error will be given with the message:
"Item out of stock item name".
If the API is unable to provide a response a 500 error will be given with the message:
"There was a problem with your purchase, please try again later.".
