# headless-2-redis (BETA)

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/03/21

 update  : 2021/03/28 

***
### Summary

Next.js + Redis Database , headless CMS

***
### required
* Next.js : 10.0.0
* Redis : 4.0.9
* node : 14.11
* react: 16.13.1

***
### Setup

npm install

***
### Setup , etc
* next.config.js , 

if change URL

```
BASE_URL: "http://localhost:3003",
```

* package.json / scripts

if change, port number ( -p )

```
"dev": "next dev -p 3003",
```

***
### start server
* Start :

yarn dev

* if change , release mode

yarn serve


***
### API sample

https://github.com/kuc-arc-f/headless-2-redis/blob/main/doc/manual_doc/3_api_sample.md

***
### SSG sample, Next.js 

https://github.com/kuc-arc-f/jamstack-ex5

***
### Next.js , Cross domain CRUD sample

https://github.com/kuc-arc-f/next_cross3

***
### Document

***
### Related : 

* Headless CMS のような機能の作成【作例】

https://note.com/knaka0209/n/n98586919b8bd

***

