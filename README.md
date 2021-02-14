# Wipro Test
Wipro test for HAR parser problem

our goal is to create a middleware like application that needs to send a message to other application on certain api call. 
- On start, make connection to a TCP system (client)
- Create an api that accepts a .har [HTTP ARchive format] file as payload [https://en.wikipedia.org/wiki/HAR_(file_format)]
- Analyse the file for total request count, count of different status codes, lists of all hosts, all requests that returned 500 and their body.
- Send the previous data to our tcp client and as API response. 


# Solution

To run application
```
docker-compose up --build
```

Results:
```
Result object contains the analysis of har file.
Please see the below comments on how to understand the result.

Lists of hosts: result.hostsKey
Total request: result.count
Total of different status code: result.statusCodeCount
All requests that returned 500 and their body: result.erroneousResHost

```

Postman collection:

```
WiproTest.postman_collection.json
```


Sample HAR File:
```
sample.har
```
