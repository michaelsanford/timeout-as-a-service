# Timeout as a Sservice
I needed this for [a Pen](https://codepen.io/msanford/pen/GmGgBx) playing with offline detection.

# API

Sports a handeh-dandeh two-parameter API.

## Specification

Call the API with your choice of `GET`, `PUT`, `POST`, `DELETE` with
- a timeout in miliseconds, and
- a status code you want returned

```
https://timeout-as-a-service.herokuapp.com/<timeout-in_miliseconds>/<status_code>
```

You'll get back a JSON object once the request completes:

```json
{
    "waitTime": 1000,
    "status": 200
}
```

## Public API on Heroku:

[https://timeout-as-a-service.herokuapp.com/5000/418](https://timeout-as-a-service.herokuapp.com/5000/418)

## CORS Support

Currently, only CodePen is supposed for CORS.

If anyone cares at all, just file an issue or submit a pull request to allow `Origin '*'` and I'll deploy it.

## Security

No, it won't reflect a response elsewhere. Obviously. That would be insane.

:info: If you specify a wait time greater than 90 seconds, it will limit it to 90 seconds.

# Example XMLHttpRequest

```javascript
const timeout = 2000,
const status = 200;
const url = `https://timeout-as-a-service.herokuapp.com/${timeout}/${status}`;

request = new XMLHttpRequest();

request.addEventListener("timeout", () => console.log("Timed out!"));
request.addEventListener("load", data => console.dir(data));

// This will cause a timeout:
request.timeout = timeout - 1000;

request.open("GET", url);
request.send();
```

# Contributing

If you want a feature or have a question:
- Read [the closed issues](https://github.com/michaelsanford/timeout-as-a-service/issues?q=is%3Aissue+is%3Aclosed), then
- Read [the open issues](https://github.com/michaelsanford/timeout-as-a-service/issues/)

If unsatisfied by what you find, please [file an issue](https://github.com/michaelsanford/timeout-as-a-service/issues/new).

If you already have a solution in mind, you can then [fork](https://github.com/michaelsanford/timeout-as-a-service#fork-destination-box),  and submit a pull request, but *please file an issue first*.

# License

MIT