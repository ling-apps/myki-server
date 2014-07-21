# Myki backend

Myki is intended to be a standalone web based wiki,
this server implement the myki api used to saved your data on a server.

## API

The api defined by the myki is the following

### Pages

#### GET /pages

return a json list of pages as follow :

```
[
  {
    "title": <String> page title,
    "content": <String> page content,
    "author": <String> author,
    "createdAt": <Date> page creation date,
    "udpatedAt": <Date> page last update date
  },
  ...
]
```

#### GET /pages/:id

Return a json object representing the page if found
or a 404 if the page is not found

#### POST /pages

Read the body as JSON, save one page if the JSON is an object, or multiple is the JSON is an array of object.

return 200 if ok, or 5xx.

#### PUT /pages

Read the body as JSON. Update all pages given their unique server id ```__remote_id```

#### ```DELETE /pages/:id```

Mark the page with id ```:id``` as removed,

return 200
or 404 if the is not found
