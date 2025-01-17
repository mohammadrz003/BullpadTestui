import { ReactChild, useState, useEffect } from "react";
import { PoolTitle } from "../style/cardStyle.style";
import styled from "styled-components";
import MobileProgressBar from "./homeProgressbar/mobile-progressBar";
import { mediaQueries } from "../../mediaQueries";
import { ongoingpool } from "../../poolDetails";
import bullAbi from "../../bullpadAbi.json";
import tokenAbi from "../../tokenAbi.json";
import Web3 from "web3";
import { Link as Links } from "react-router-dom";
export const HomeIdoHeaderPercent = styled.p`
  background: rgb(14, 210, 247);
  background: #10b981;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const IdoItem = styled.div`
  width: 100%;

  ${mediaQueries("md")`
    width: calc(50% - 16px);
  `}

  ${mediaQueries("lg")`
    width: calc(33.33% - 32px);
  `}
`;

const IdoCard = ({ useDarkMode, account, active }) => {
  let progress = "70";
  let { sale, total } = {
    sale: "54000",
    total: "68000",
  };
  const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
  const [partrate, setpartrate] = useState(0);

  let categoriess = ongoingpool;

  for (let categoryItems of categoriess) {
    let instance = new web3.eth.Contract(bullAbi, categoryItems.idocontract)
      .methods;
    instance
      .idoInfo()
      .call()
      .then((response) => {
        categoryItems.progressPercent = 100 / (response[2] / response[3]);
        console.log(categoryItems);
      });
  }

  let [idoCartItem] = useState(categoriess);
  // let idoCartItem = ongoingpool;

  return (
    <div className="bg-gray-100 dark:bg-darkMode-600">
      <div className="container mx-auto py-24 xl:px-20 md:px-7 lg:py-24 flex flex-col">
        <div className="text-center">
          <PoolTitle
            useDarkMode={useDarkMode}
            className={`dark:text-white leading-none relative inline-block text-center font-bold text-secondery-300 text-3xl`}
          >
            <span className="relative z-10">Featured Pools</span>
          </PoolTitle>
        </div>
        <section className="mt-14 md:-m-4 md:mt-14 flex flex-col flex-wrap md:flex-row md:justify-center px-4 sm:px-6">
          {/* card items go here */}
          {idoCartItem.map((item, index) => {
            return (
              <IdoItem
                key={index}
                className={`mb-8 md:m-2 lg:m-4 bg-white transform lg:hover:scale-105 duration-300 rounded-3xl p-6 cursor-pointer border border-gray-300 dark:bg-darkMode-800 dark:border-gray-700 dark:hover:border-yellow-300 hover:border-primary-300`}
              >
                <Links to={`/pools/${item.id}`}>
                  <div className="flex justify-between items-center">
                    <MobileProgressBar
                      darkMode={useDarkMode}
                      image={"/image/coins/dragon.jpg"}
                      percentage={item.progressPercent === undefined ? 0 : item.progressPercent}
                      display={"inline-block"}
                    />

                    <div className="flex items-center bg-green-200 dark:bg-green-300 rounded-full px-2 py-1 space-x-1">
                      <span className="inline-block w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full" />
                      <span className="font-semibold text-green-500 dark:text-green-600 text-sm">
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <p className="font-semibold text-secondery-300 dark:text-darkMode-100 mt-2 text-2xl mb-0.5">
                    {item.name}
                  </p>
                  <HomeIdoHeaderPercent
                    className="self-center text-white mt-1.5 font-bold text-lg"
                    darkMode={useDarkMode}
                  >
                    {/* <Partrate address={item.idocontract} /> */}
                    {item.progressPercent === undefined ? 0 : item.progressPercent}%{" "}
                    <span className="font-medium text-sm">sold</span>
                  </HomeIdoHeaderPercent>
                  <p className="mt-4 font-semibold text-sm dark:text-white dark:text-opacity-80">
                    Ratio per 1 BNB
                  </p>
                  <div className="font-bold text-yellow-400 text-xl">
                    {item.offeringallocation / item.rasingallocation} BUSD
                  </div>

                  <div className="flex flex-wrap justify-between mt-4 pt-4 border-t border-gray-300 dark:border-darkMode-500">
                    <p className="flex flex-col">
                      <span className="font-medium text-sm dark:text-white dark:text-opacity-80">
                        Access
                      </span>
                      <span className="font-semibold text-base dark:text-darkMode-100">
                        {item.access}
                      </span>
                    </p>
                  </div>
                </Links>
              </IdoItem>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default IdoCard;
