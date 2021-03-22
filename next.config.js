//
module.exports = {
  env: {
    CSRF_SECRET : 'secret1234',
    BASE_URL: "http://localhost:3003",
  },
  async headers() {
    return [
      {
        source: '/:api*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept',
          },
        ],
      },
    ]
  },
}