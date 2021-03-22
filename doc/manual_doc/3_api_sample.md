
# API sample

***
### find

get, content List

* curl sample

```
curl "http://localhost:3003/api/get/find?content=posts&apikey=qXibAfxwUCRuiihlXakpDN6w"
```

* content

content name : Site > ContentType > content name

* apikey

Site > open > apikey


***
* skip, limit (option)

skip : start position

limit : limit record count

* curl sample / skip, limit

```
curl "http://localhost:3003/api/get/find?content=posts&apikey=6yNC7BSgZsl87hx6DW3fPdVo&skip=0&limit=10"
```

***
### findone

get 1 record

* curl sample

```
curl "http://localhost:3003/api/get/findone?content=posts&id=5&apikey=YjiCWg1gDsfwcbF5O88PG3G5"
```

* content

content name : Site > ContentType > content name

* id

 content.id

* apikey

Site > open > apikey

***
### count

リストの件数

* curl sample

```
curl "http://localhost:3003/api/get/count?content=posts&apikey=qXibAfxwUCRuiihlXakpDN6w"
```

* content

content name : Site > ContentType > content name

* apikey

Site > open > apikey

***

