import React, { useState, useEffect, Component } from "react";
import { Tab } from "@headlessui/react";
import ProgressBar from "../../components/layout/progressBar";
import { Link as Links } from "react-router-dom";
import MobileProgressBar from "./progress-bar/mobile-progressBar";
import { PhoneIdoHeader, PoolItem, Status } from "./poolsItem.style";
import { ongoingpool, endedpool, futurepool } from "../../poolDetails";
import bullAbi from "../../bullpadAbi.json";
import tokenAbi from "../../tokenAbi.json";
import Web3 from "web3";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PoolsList = (props) => {
  // console.log(`test for data fetching ${ongoingpool}`);
  // console.log(`dark mode is = ${props.darkMode}`);
  const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
  var [data, setData] = useState(0);
  let [changeUseEffect, setChangeUseEffect] = useState();

  let categoriess = {
    Ongoing: ongoingpool,
    Future: futurepool,
    Ended: endedpool,
  };

  for (let category in categoriess) {
    for (let categoryItems of categoriess[category]) {
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
  }

  let [categories] = useState(categoriess);

  return (
    <div className="relative bottom-16 w-full max-w-xxxl mx-auto px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-6 bg-blue-900/20 rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full md:w-auto focus:outline-none text-xl leading-5 font-bold py-3",
                  selected
                    ? "border-b-2 border-orange-500 text-white"
                    : "text-gray-500"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <div className="hidden md:grid md:grid-cols-10 md:gap-x-2 px-7 justify-start mt-5 text-gray-500 font-semibold text-sm">
          <span className="relative right-7 col-span-3">Pool name</span>
          <span className="text-center md:hidden lg:inline-block">Status</span>
          <span className="text-center">Access</span>
          <span className="text-center">Ratio, 1BUSD</span>
          <span className="text-center">Total raise</span>
          <span className="text-left col-span-2">Progress</span>
        </div>
        <Tab.Panels className="mt-5 md:mt-2 focus:outline-none focus:border-0">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx} className="focus:outline-none focus:border-0">
              <ul className="focus:outline-none focus:border-0">
                {posts.map((post) => (
                  <Links to={`/pools/${post.id}`}>
                    {console.log(`post progress is: ${post}`)}
                    <PoolItem
                      key={post.id}
                      className="relative focus:outline-none md:grid md:grid-cols-10 md:gap-x-2 cursor-pointer bg-gradient-to-b from-darkMode-800 to-darkMode-600 border border-gray-600 px-6 py-4 rounded-lg mt-3"
                    >
                      {/* ido image for mobile */}

                      <div className="md:hidden w-full flex flex-col items-center">
                        <MobileProgressBar
                          poolsPage={true}
                          darkMode={props.darkMode}
                          image={post.img}
                          percentage={post.progressPercent === undefined ? 0 : post.progressPercent}
                          display={"hidden"}
                        />
                        {/* <Partrate address={post.idocontract} /> */}
                        <div className="w-full flex flex-col items-center mt-2.5 mb-3">
                          <h3 className="text-lg font-bold leading-5 text-white">
                            {post.title}
                          </h3>
                          <PhoneIdoHeader className="self-center text-white mt-1.5 font-bold text-lg">
                            {post.progressPercent === undefined ? 0 : post.progressPercent}%{" "}
                            <span className="font-medium text-sm">sold</span>
                          </PhoneIdoHeader>
                        </div>
                        <div className="w-full grid grid-cols-3 pt-3 border-t border-gray-700">
                          <div className="flex flex-col items-center text-sm">
                            <span className="md:hidden text-white text-opacity-90">
                              Access
                            </span>
                            <span className="rounded-full py-1.5 text-white text-center inline-block leading-none">
                              {post.access}
                            </span>
                          </div>
                          <div className="flex flex-col items-center text-sm">
                            <span className="md:hidden text-white text-opacity-90">
                              1BUSD
                            </span>
                            <span className="rounded-full py-1.5 text-white text-center inline-block leading-none">
                              {post.offeringallocation / post.rasingallocation}
                            </span>
                          </div>
                          <div className="flex flex-col items-center text-sm">
                            <span className="md:hidden text-white text-opacity-90">
                              Total raise
                            </span>
                            <span className="rounded-full py-1.5 text-orange-500 text-center inline-block leading-none">
                              {post.rasingallocation / 1e18}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* ido image for laptop */}
                      <div className="hidden md:col-span-3 md:flex items-center md:space-x-4">
                        <img
                          className="md:inline-block rounded-full h-12"
                          src={post.img}
                          alt=""
                        />
                        <h3 className="mt-3 md:mt-0 text-base font-bold leading-5 text-white">
                          {post.title}
                        </h3>
                      </div>
                      <Status className="hidden md:flex lg:flex justify-between mt-4 md:mt-0 md:self-center md:mx-auto">
                        <span className="inline-block bg-gradient-to-t from-orange-500 to-orange-300 rounded-full px-2.5 py-1.5 text-white text-center w-min font-semibold text-xs leading-none">
                          {post.status}
                        </span>
                      </Status>
                      <div className="hidden md:flex justify-between mt-4 md:mt-0 md:self-center md:mx-auto">
                        <span className="md:hidden font-semibold text-white text-opacity-90">
                          Access
                        </span>
                        <span className="rounded-full px-2.5 py-1.5 text-white text-center inline-block w-min font-semibold text-base leading-none">
                          {post.access}
                        </span>
                      </div>
                      <div className="hidden md:flex justify-between mt-4 md:mt-0 md:self-center md:mx-auto">
                        <span className="md:hidden font-semibold text-white text-opacity-90">
                          Ratio, 1BUSD
                        </span>
                        <span className="rounded-full px-2.5 py-1.5 text-white text-center inline-block w-min font-semibold text-base leading-none">
                          {post.offeringallocation / post.rasingallocation}
                        </span>
                      </div>
                      <div className="hidden md:flex justify-between mt-4 md:mt-0 md:self-center md:mx-auto">
                        <span className="md:hidden font-semibold text-white text-opacity-90">
                          Total raise
                        </span>
                        <span className="rounded-full px-2.5 py-1.5 text-orange-500 text-center inline-block w-min font-semibold text-base leading-none">
                          {post.rasingallocation / 1e18}
                        </span>
                      </div>

                      <div className="hidden md:inline-block mt-6 mb-4 md:mt-0 md:mb-0 col-span-2 self-center">
                        <ProgressBar
                          progress={post.progressPercent === undefined ? 0 : post.progressPercent}
                          display={"block"}
                        />
                      </div>

                      <div className="hidden md:col-start-10 md:flex justify-end items-center">
                        <Links
                          className="text-orange-500 border border-orange-500 rounded-xl leading-none px-4 py-2.5"
                          to={`/pools/${post.id}`}
                        >
                          Apply
                        </Links>
                      </div>
                    </PoolItem>
                  </Links>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PoolsList;
