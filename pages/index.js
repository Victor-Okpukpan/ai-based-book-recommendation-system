import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Query from "@/components/Query";
import Suggestions from "@/components/Suggestions";
import { useState } from "react";
import Intro from "@/components/Intro";

export default function Home() {
  const [suggestions, setSuggestions] = useState([]);
  return (
    <main className={"bg-beige-100"}>
      <Head>
        <title>AI Book Quest</title>
      </Head>
      <div className="flex-grow">
        <Header className="shadow-md bg-white py-4" />
        <div className="pt-44 h-[calc(100vh-65px)] overflow-auto bg-[url('/images/book-pattern.png')] bg-cover">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 px-4 lg:px-0">
              <div className="col-span-1 lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
                <Query
                  setSuggestions={setSuggestions}
                  className="rounded-lg border-2 border-gray-300"
                />
              </div>
              <div className="col-span-1 lg:col-span-2">
                {suggestions.length > 0 ? (
                  <Suggestions suggestions={suggestions} />
                ) : (
                  <Intro className="text-gray-700 text-lg leading-relaxed" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-12 bg-gray-800 text-white p-4">
        <p>“A room without books is like a body without a soul.” — Cicero</p>
      </Footer>
    </main>
  );
}
