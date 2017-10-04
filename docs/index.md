## What is it?

It's basically a tool to help test offline detection and timeouts. I needed this for [a Pen](https://codepen.io/msanford/pen/GmGgBx) playing with offline detection.

It is licensed under MIT.

## Specification

```
https://timeout-as-a-service.herokuapp.com/<wait_time>/<status_code>
```

Simply call the API above with your choice of `GET`, `PUT`, `POST` or `DELETE`, with:
- a wait time in milliseconds (`<wait_time>`), and
- a status code (`<status_code>`) you want it to return.

After waiting for the prescribed amount of time, it will return a JSON object.

For example, to return a `200 OK` after 1 second (or 1000ms), simply call:

```
https://timeout-as-a-service.herokuapp.com/1000/200
```

After a second, you will get back this:

```json
{
    "waitTime": 1000,
    "status": 200
}
```

## Code Example

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
