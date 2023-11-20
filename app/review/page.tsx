"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Review(props: any) {

  useEffect(() => {
    let data = localStorage.getItem("balanceSheet");
    if (data) {
      setBalanceSheet(JSON.parse(data));
    }

    data = localStorage.getItem("name");
    if (data) {
      setName(data);
    }

    data = localStorage.getItem("yearEstablished");
    if (data) {
      setYearEstablished(data);
    }

    data = localStorage.getItem("loanAmount");
    if (data) {
      setLoanAmount(data);
    }

    data = localStorage.getItem("accountProvider");
    if (data) {
      setAccountProvider(data);
    }
  }, [props.router]);

  const router = useRouter();
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [name, setName] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [accountProvider, setAccountProvider] = useState("");

  // Submit
  /*
  const handleConfirm = () => {
    localStorage.setItem("outcome","approved");
   // localStorage.setItem("outcome","rejected");
    router.push("/outcome");
  };
  */

  const handleConfirm = (event: any) => {
    event.preventDefault();

    let data = {
      business:{
        business_name: name,
        year_established: parseInt(yearEstablished),
        loan_amount: parseFloat(loanAmount),
        account_provider: accountProvider,
      },
      sheets:balanceSheet
    };

    let endPoint = "/v1/outcome";
    let method = "POST";

    const requestOptions = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    console.log("sending data:",data);


    fetch(endPoint, requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = data && data.errors;
          //const error = data.errors
          return Promise.reject(error);
        }

        console.log("data:",data);
        if(data.result?.loan_approved){
          localStorage.setItem("outcome", "approved");
        }else{
          localStorage.setItem("outcome", "rejected");
        }
      
        localStorage.setItem("preAssessment", data.result?.pre_assessment);

        router.push("/outcome");
      })
      .catch((error) => {
        console.log("Inside catch");
        console.log(error);
        console.error("There was an error!", error);
      });
  };


  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">Loan App</h2>
            <p className="text-gray-500 mb-6">Apply for loan</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div
                  className="text-gray-600  p-2 cursor-pointer"
                  onClick={(e) => {
                    router.push("/");
                  }}
                >
                  <p className="font-medium text-lg">1.Business details</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <div className="text-gray-600 p-2 bg-sky-300">
                  <p className="font-medium text-lg">2.Review</p>
                  <p>Please review all details</p>
                </div>
                <div className="text-gray-600 p-2">
                  <p className="font-medium text-lg">3.Outcome</p>
                  <p>Final outcome</p>
                </div>

                <div className="lg:col-span-3">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 mt-2">
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end mr-4">
                        <button
                          onClick={(e) => {
                            router.push("/");
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Back
                        </button>
                      </div>

                      <div className="inline-flex items-end">
                        <button
                          onClick={handleConfirm}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl">Business details</h2>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                          >
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Year Est.
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                          >
                            Loan Amount
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Account Provider
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                          >
                            {name}
                          </th>
                          <td className="px-6 py-4">{yearEstablished}</td>
                          <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            ${loanAmount}
                          </td>
                          <td className="px-6 py-4">{accountProvider}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-xl">Balance sheet</h2>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                          >
                            Year
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Month
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                          >
                            Profit or Loss
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Assets value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {balanceSheet &&
                          balanceSheet.map((sheet, i) => (
                            <tr
                              key={i}
                              className="border-b border-gray-200 dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                              >
                                {sheet.year}
                              </th>
                              <td className="px-6 py-4">S {sheet.month}</td>
                              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                {sheet.profitOrLoss}
                              </td>
                              <td className="px-6 py-4">{sheet.assetsValue}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 mt-2">
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end mr-4">
                        <button
                          onClick={(e) => {
                            router.push("/");
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Back
                        </button>
                      </div>
                      <div className="inline-flex items-end">
                        <button
                          onClick={handleConfirm}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://www.buymeacoffee.com/dgauderman"
            target="_blank"
            className="md:absolute bottom-0 right-0 p-4 float-right"
          >
            <img
              src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
              alt="Buy Me A Coffee"
              className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
            />
          </a>
        </div>
      </div>
    </main>
  );
}
