"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Outcome(props: any) {
  const [balanceSheet, setBalanceSheet] = useState("");
  useEffect(() => {
    let data = localStorage.getItem("outcome");
    if (data) {
      setOutcome(data);
    }

    data = localStorage.getItem("preAssessment");
    if (data) {
      setPreAssessment(data);
    }

  }, [props.router]);

  const router = useRouter();
  const [outcome, setOutcome] = useState("");
  const [preAssessment, setPreAssessment] = useState("");

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
                <div
                  className="text-gray-600 p-2 cursor-pointer"
                  onClick={(e) => {
                    router.push("/review");
                  }}
                >
                  <p className="font-medium text-lg">2.Review</p>
                  <p>Please review all details</p>
                </div>
                <div className="text-gray-600 p-2 bg-sky-300">
                  <p className="font-medium text-lg">3.Outcome</p>
                  <p>Final outcome</p>
                </div>

                <div className="lg:col-span-3">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 mt-2">
                    <div className="md:col-span-5 text-right"></div>
                  </div>

                  {outcome == "approved" ? (
                    <div
                      className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                      role="alert"
                    >
                      <div className="flex">
                        <div className="py-1">
                          <svg
                            className="fill-current h-6 w-6 text-teal-500 mr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold">Final outcome</p>
                          <p className="text-sm">
                            Your loan has been approved!<br/>
                            Pre assessment: {preAssessment+"%"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {outcome == "rejected" ? (
                    <div
                      className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
                      role="alert"
                    >
                      <div className="flex">
                        <div className="py-1">
                          <svg
                            className="fill-current h-6 w-6 text-red-500 mr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold">Final outcome</p>
                          <p className="text-sm">
                            Your loan has been rejected!<br/>
                            Pre assessment: {preAssessment+"%"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 mt-2">
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end mr-4">
                        <button
                          onClick={(e) => {
                            router.push("/review");
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Back
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
