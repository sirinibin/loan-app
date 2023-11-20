"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [accountProvider, setAccountProvider] = useState("");

  let [errors, setErrors] = useState({
    name: "",
    yearEstablished: "",
    loanAmount: "",
    accountProvider: "",
  });

  useEffect(() => {
    let data = localStorage.getItem("name");
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
  }, []);

  const validateForm = () => {
    let errors = {
      name: "",
      yearEstablished: "",
      loanAmount: "",
      accountProvider: "",
    };
    let formValid = true;

    if (!name) {
      errors.name = "Name is required.";
      formValid = false;
    }

    if (!yearEstablished) {
      errors.yearEstablished = "Year Est. is required.";
      formValid = false;
    }

    if (!loanAmount) {
      errors.loanAmount = "Loan amount is required.";
      formValid = false;
    }

    if (!accountProvider) {
      errors.accountProvider = "Account provider is required.";
      formValid = false;
    }

    setErrors(errors);

    return formValid;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    let data = {
      business_name: name,
      year_established: parseInt(yearEstablished),
      loan_amount: parseFloat(loanAmount),
      account_provider: accountProvider,
    };

    let endPoint = "/v1/balance-sheet";
    let method = "POST";

    const requestOptions = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };


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


        localStorage.setItem(
          "balanceSheet",
          JSON.stringify(data.result?.sheets)
        );
        localStorage.setItem("name", data.result?.business?.business_name);
        localStorage.setItem(
          "yearEstablished",
          data.result?.business?.year_established
        );
        localStorage.setItem("loanAmount", data.result?.business?.loan_amount);
        localStorage.setItem(
          "accountProvider",
          data.result?.business?.account_provider
        );

        router.push("/review");
      })
      .catch((error) => {
        console.log("Inside catch");
        console.log(error);
        console.error("There was an error!", error);
      });
  };


  const resetForm = () => {
    setName("");
    setYearEstablished("");
    setLoanAmount("");
    setAccountProvider("");
    setBalanceSheet([]);
    localStorage.setItem("balanceSheet", "");
    localStorage.setItem("name", "");
    localStorage.setItem("yearEstablished", "");
    localStorage.setItem("loanAmount", "");
    localStorage.setItem("accountProvider", "");
  };

  let [balanceSheet, setBalanceSheet] = useState([
    {
      year: 2020,
      month: 12,
      profitOrLoss: 250000,
      assetsValue: 1234,
    },
    {
      year: 2020,
      month: 11,
      profitOrLoss: 1150,
      assetsValue: 5789,
    },
    {
      year: 2020,
      month: 10,
      profitOrLoss: 2500,
      assetsValue: 22345,
    },
    {
      year: 2020,
      month: 9,
      profitOrLoss: -187000,
      assetsValue: 223452,
    },
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">Loan App</h2>
            <p className="text-gray-500 mb-6">Apply for loan</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600  p-2 bg-sky-300 cursor-pointer">
                  <p className="font-medium text-lg">1.Business details</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <div className="text-gray-600 p-2">
                  <p className="font-medium text-lg">2.Review</p>
                  <p>Please review all details</p>
                </div>

                <div className="text-gray-600 p-2">
                  <p className="font-medium text-lg">3.Outcome</p>
                  <p>Final outcome</p>
                </div>

                <div className="lg:col-span-3">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Business Name</label>
                      <input
                        type="text"
                        name="full_name"
                        defaultValue=""
                        value={name}
                        onChange={(e) => {
                          errors.name = "";
                          if (!e.target.value) {
                            errors.name = "Name is required.";
                          }
                          setName(e.target.value);
                        }}
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="ABC LTD."
                      />
                      {errors.name && (
                        <p style={{ color: "red" }}>{errors.name}</p>
                      )}
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Year Est.</label>
                      <input
                        type="number"
                        name="year"
                        value={yearEstablished}
                        onChange={(e) => {
                          errors.yearEstablished = "";
                          if (!e.target.value) {
                            errors.yearEstablished = "Year Est. is required.";
                          }
                          setYearEstablished(e.target.value);
                        }}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="2010"
                      />
                      {errors.yearEstablished && (
                        <p style={{ color: "red" }}>{errors.yearEstablished}</p>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Loan Amont</label>
                      <input
                        type="number"
                        name="amount"
                        value={loanAmount}
                        onChange={(e) => {
                          errors.loanAmount = "";
                          if (!e.target.value) {
                            errors.loanAmount = "Loan Amount is required.";
                          }
                          setLoanAmount(e.target.value);
                        }}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="10000"
                      />
                      {errors.loanAmount && (
                        <p style={{ color: "red" }}>{errors.loanAmount}</p>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="address">Account provider</label>
                      <select
                        value={accountProvider}
                        onChange={(e) => {
                          errors.accountProvider = "";
                          if (!e.target.value) {
                            errors.accountProvider =
                              "Account provider is required.";
                          }
                          setAccountProvider(e.target.value);
                        }}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      >
                        <option value="">Select</option>
                        <option value="xero">Xero</option>
                        <option value="myob">MYOB</option>
                      </select>
                      {errors.accountProvider && (
                        <p style={{ color: "red" }}>{errors.accountProvider}</p>
                      )}
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-start mr-4">
                        <button
                          onClick={resetForm}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Reset
                        </button>
                      </div>
                      <div className="inline-flex items-end">
                        <button
                          onClick={handleSubmit}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
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
