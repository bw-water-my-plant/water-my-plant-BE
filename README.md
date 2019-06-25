# Water My Plants - Backend Server

## Base URL

- https://water-my-plant.herokuapp.com/

## Register - when a new user wants to setup an account on the site

HTTP Method: `POST`

URL: `/register`

### Headers

| Name         | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| Name                     | Type    | Required | Description                                                               |
| ------------------------ | ------- | -------- | ------------------------------------------------------------------------- |
| username                 | string  | yes      | Up tp 128 characters                                                      |
| password                 | string  | yes      | Up to 128 characters                                                      |
| phone                    | string  | yes      | Max 30 characters                                                         |

