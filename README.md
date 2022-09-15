# Typeahead API

## Description

Typeahead or autocomplete is a common feature that people come across on websites. For example, when you are searching on Google, you will notice a word populates before you finish typing.

For this task, you'll implement the backend of a simple typeahead system. You will be provided with a list of names of people and their popularities, and the system will be capable of, for a specific prefix, returning the top names that start with it, as well as incrementing the popularity of a given pre-existing name.

For example, if the data provided is `{ "John": 21, "James": 43, "Joanna": 53, "Jazmin": 3 }` and the system receives a request with the `jo` prefix, then it will return the names _Joanna_ and _John_, in that order.

## Specific Requirements

### 1. Initial data

> **You must not alter the initial data given, as automated tests will assume this exact data when testing requests to your application**

The application must consider the file `names.json` in this repository as its initial data. The format of this file is `{ [name1]: [popularityOfName1], [name2]: [popularityOfName2], ... }` **without any particular order**. Note that this data is not intended to be a complete set of names that would be used in a real scenario, since that list would be huge; it's just a small enough set so you can use it efficiently during development (i.e. don't assume this file is the entire dataset).

Consider that names don't have strict rules for characters and casing. While most common names start with an uppercase letter and then contain just lowercase letters, you can also find names with more uppercase letters, hyphens, and/or spaces in the middle of it, for example. So it's best to not assume much about the nature of the names the application needs to handle.

### 2. Environment

The application must consider the following environment variables when starting up:

- `PORT`: the port the application must listen on.
- `SUGGESTION_NUMBER`: the max amount of results the application should return.
- `HOST`: the host to where the application will be deployed to. This means requests to the application won't be made to `http://localhost:{PORT}` but to `http://{HOST}:{PORT}`. Some frameworks have, by default, a list of allowed hosts so that any request made to an unlisted host gets blocked. If that's the case, you need to either add the value in the HOST environment variable to your framework's allowed hosts configuration or entirely disable the allowed hosts' list so your application can listen to every host.

### 3. Persistency

The application must start with the initial data given in the JSON file, but there is an endpoint that modifies data. The persistency requirement is to just keep the updated information in memory so, as long as the application keeps running, it considers all the changes made so far; but if the application is stopped, it's ok if it starts with the original data again, as cross-restarts persistency is not a requirement.

**Example**: The initial data contains the name _Jazmin_ with a popularity of 951, so if this name is included in an answer, it will consider 951 as its popularity. If the application then receives a request to increase the popularity of _Jazmin_, it will change to 952, so that's the new popularity that should be used for _Jazmin_ as long as the application keeps running. If the application is restarted, though, it will again consider 951 as the popularity of _Jazmin_.

### 4. Endpoints

The application must be a **REST API** that will use JSON as the content type for both, requests and responses. It must support the following two endpoints:

#### `GET /typeahead/{prefix}`

It optionally receives a prefix in the path and returns an array of objects each one having the `name` and `times` (popularity) properties. The result contains all the names that start with the given `prefix` up to a maximum of `SUGGESTION_NUMBER` names, sorted by highest popularity (`times`) and name in ascending order if they have equal popularity, always leaving the exact match (a name that is exactly the received `prefix`) at the beginning if there is one.

If the `prefix` segment of the path is not given or it's empty (`/typeahead` or `/typeahead/`), it returns the `SUGGESTION_NUMBER` names with the highest popularity and name ascending in case of equal popularity.

This endpoint must consider the `prefix` in a case insensitive way (so you get the same results for `JA`, `Ja`, `jA` or `ja`) but the responses must always return the names in the original casing (as they appear in the initial data).

##### Examples

```bash
$ curl -X GET http://{HOST}:{PORT}/typeahead/ja

[{"name":"Janetta","times":973},{"name":"Janel","times":955},{"name":"Jazmin","times":951},{"name":"Janette","times":947},{"name":"Janet","times":936},{"name":"Janeva","times":929},{"name":"Janella","times":916},{"name":"Janeczka","times":915},{"name":"Jaquelin","times":889},{"name":"Janaya","times":878}]
```

```bash
$ curl -X GET http://{HOST}:{PORT}/typeahead/jan

[{"name":"Jan","times":296},{"name":"Janetta","times":973},{"name":"Janel","times":955},{"name":"Janette","times":947},{"name":"Janet","times":936},{"name":"Janeva","times":929},{"name":"Janella","times":916},{"name":"Janeczka","times":915},{"name":"Janaya","times":878},{"name":"Janine","times":858}]
```

#### `POST /typeahead`

It receives a JSON object with a name as the request body (example: `{ "name": "Joanna" }`), increases the popularity for that name in 1, and returns a `201` status code with an object with `name` and `times` properties considering the new state.

If the given name does not exist in the initial data (`names.json`) then this endpoint should return a 400 HTTP error (no new names will be added, it will only increase the popularity of existing names).

This endpoint must be case insensitive, so request for `{ "name": "JOANNA" }`, `{ "name": "Joanna" }` and `{ "name": "JoAnNa" }` should all work to increase the popularity value for _Joanna_, but the returned name in this request should always be in the original casing.

##### Example

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"name": "Joanna"}' http://{HOST}:{PORT}/typeahead

{"name":"Joanna","times":441}
```

### 5. Performance

Performance is very important in systems like this application. The application should respond to requests in a fast way while being able to support a high amount of concurrent requests. While there are many different ways in which we can implement a typeahead system, not all of them will have the same performance. There is a particular data structure that provides very fast responses without requiring a lot of memory: the **prefix tree** (also known as Trie).

So, with performance in mind, another requirement is to build this system by **implementing a Prefix Tree (or similar structure) adapted to this context**. Note that this also means there will be **no database system in this project**, as the data needed for this system will be stored in this in-memory data structure. A reasonably good implementation of a prefix tree in this context can be more performant than an SQL query in a relational database.

Although there are no more explicit performance related requirements, we encourage you to be mindful of performance when making design and implementation decisions in this task.
