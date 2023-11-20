## Loan App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Set up & Run Backend / Golang API
```bash
git clone https://github.com/sirinibin/loan-api
mkdir -p go/src/github.com/sirinibin/loan-api
cd go/src/github.com/sirinibin/loan-api
go run main.go
```

## Set up & Run Front end
```bash
git clone https://github.com/sirinibin/loan-app
cd loan-app
npm install
export LOAN_API=http://127.0.0.1:4000
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




