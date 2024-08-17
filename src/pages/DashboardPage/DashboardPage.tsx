import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { ChooseUsernamePopup } from "./ChooseUsernamePopup";
import { useThemeStore } from "@/state/ThemeStore";
import { MoneyCard } from "./MoneyCard";
import { DashboardPageSettingsBtn } from "./DashboardPageSettingsBtn";
import {
  DisplayingTimePeriod,
  useDashboardPageStore,
} from "@/state/DashboardPageStore";
import React, { useEffect, useState } from "react";
import { EntryType } from "@/types/types";
import { useGlobalStore } from "@/state/GlobalStore";
import { DashboardPageSettings } from "./DashboardPageSettings";
import { OverlayInvisible } from "@/components/OverlayInvisible";
import { EntryList } from "./EntryList";
import { ChartSection } from "@/components/ChartSection";
import { EditEntryModal } from "@/components/EditEntryModal/EditEntryModal";
import { useEditEntryModalStore } from "@/state/EditEntryModalStore";

const CURR_YEAR = new Date().getFullYear();
const CURR_DAY = new Date().getDate();
const CURR_MONTH = new Date().getMonth();

type Props = {};

export function DashboardPage({}: Props) {
  const { theme } = useThemeStore();

  const { currUserData } = useFirebaseAuth();

  const { isNavbarVisible, pagePaddingLeft } = useGlobalStore();

  const { currDisplayingTimePeriod } = useDashboardPageStore();

  const { isEditingEntry } = useEditEntryModalStore();

  //prettier-ignore
  const [currDisplayingEntries, setCurrDisplayingEntries] = useState<EntryType[]>(currUserData.entries);
  const [isSettingDropdownVisible, setIsSettingDropdownVisible] =
    useState(false);
  const [currDisplayingIncome, setCurrDisplayingIncome] = useState(0);
  const [currDisplayingExpenses, setCurrDisplayingExpenses] = useState(0);

  // updating page content
  function updateMoneyCards(timePeriod: DisplayingTimePeriod) {
    let incomeToDisplay;
    let expensesToDisplay;
    let entriesToDisplay;

    switch (timePeriod) {
      case "All Time":
        const { totalIncome, totalExpenses } = getAllTimeIncomeAndExpenses(
          currUserData.entries
        );
        incomeToDisplay = totalIncome;
        expensesToDisplay = totalExpenses;
        entriesToDisplay = currUserData.entries;
        break;
      case "Today":
        const { todayIncome, todayExpenses, todayEntries } =
          getTodaysIncomeAndExpenses(currUserData.entries);
        incomeToDisplay = todayIncome;
        expensesToDisplay = todayExpenses;
        entriesToDisplay = todayEntries;
        break;
      case "This Week":
        const { thisWeekIncome, thisWeekExpenses, thisWeekEntries } =
          getThisWeekIncomeAndExpenses(currUserData.entries);
        incomeToDisplay = thisWeekIncome;
        expensesToDisplay = thisWeekExpenses;
        entriesToDisplay = thisWeekEntries;
        break;
      case "This Month":
        const { thisMonthIncome, thisMonthExpenses, thisMonthEntries } =
          getThisMonthIncomeAndExpenses(currUserData.entries);
        incomeToDisplay = thisMonthIncome;
        expensesToDisplay = thisMonthExpenses;
        entriesToDisplay = thisMonthEntries;
        break;
      case "This Year":
        const { thisYearIncome, thisYearExpenses, thisYearEntries } =
          getThisYearIncomeAndExpenses(currUserData.entries);
        incomeToDisplay = thisYearIncome;
        expensesToDisplay = thisYearExpenses;
        entriesToDisplay = thisYearEntries;
        break;
    }

    console.log(currUserData.currency.conversionRate)
    setCurrDisplayingIncome(
      incomeToDisplay * currUserData.currency.conversionRate
    );
    setCurrDisplayingExpenses(
      expensesToDisplay * currUserData.currency.conversionRate
    );
    setCurrDisplayingEntries(entriesToDisplay);
  }

  useEffect(() => {
    setCurrDisplayingEntries([...currUserData.entries]);
    updateMoneyCards(currDisplayingTimePeriod);
  }, [currUserData.entries]);

  useEffect(() => {
    updateMoneyCards(currDisplayingTimePeriod);
  }, [currDisplayingTimePeriod, currUserData.currency]);

  useEffect(() => {
    console.log(currDisplayingEntries);
  }, [currDisplayingEntries]);

  useEffect(() => {
    const { totalIncome, totalExpenses } = getAllTimeIncomeAndExpenses(
      currUserData.entries
    );
    setCurrDisplayingIncome(totalIncome);
    setCurrDisplayingExpenses(totalExpenses);
    setCurrDisplayingEntries(currUserData.entries)
  }, []);

  useEffect(() => {}, [currUserData]);

  return (
    <>
      <div
        className="flex flex-col px-10 mx-auto overflow-x-hidden text-sm transition-all duration-500 xl:flex-row ease xl:pt-14 xl:pb-0 py-14 font-alexandria"
        style={{
          color: theme.mainTextColor,
          paddingLeft: pagePaddingLeft,
          backgroundColor: theme.mainBgColor,
          minWidth: "500px",
        }}
      >
        <div>
          <h1 className="p-4 text-2xl font-bold">{currDisplayingTimePeriod}</h1>
          <div className="flex justify-center mt-5">
            <MoneyCard
              amount={currDisplayingIncome}
              text="Income"
              className="flex flex-col items-center w-64 border rounded-lg shadow-md"
            />
            <MoneyCard
              amount={currDisplayingExpenses}
              text="Expenses"
              className="flex flex-col items-center w-64 border rounded-lg shadow-md"
            />
          </div>
          <EntryList currDisplayingEntries={currDisplayingEntries} />
        </div>
        <div className="flex flex-col mt-10 ml-10 xl:mt-0">
          <ChartSection
            entries={currDisplayingEntries.filter(
              (entry) => entry.type === "Income"
            )}
            text={`${currDisplayingTimePeriod} Income Chart`}
          />
          <ChartSection
            className="mt-10"
            entries={currDisplayingEntries.filter(
              (entry) => entry.type === "Expense"
            )}
            text={`${currDisplayingTimePeriod} Expenses Chart`}
          />
        </div>
        <DashboardPageSettingsBtn
          className="absolute top-2 right-2"
          onClick={() => setIsSettingDropdownVisible(true)}
        />
        {isSettingDropdownVisible && (
          <>
            <OverlayInvisible
              onClick={() => setIsSettingDropdownVisible(false)}
            />
            <DashboardPageSettings />
          </>
        )}
      </div>
      {currUserData.username === null && <ChooseUsernamePopup />}
      {isEditingEntry && <EditEntryModal />}
    </>
  );
}

function getAllTimeIncomeAndExpenses(entries: EntryType[]) {
  const totalIncome = entries.reduce((acc, entry) => {
    if (entry.type === "Income") {
      return acc + entry.amount;
    }

    return acc;
  }, 0);
  const totalExpenses = entries.reduce((acc, entry) => {
    if (entry.type === "Expense") {
      return acc + entry.amount;
    }

    return acc;
  }, 0);

  return { totalIncome, totalExpenses };
}

function getTodaysIncomeAndExpenses(entries: EntryType[]) {
  const todaysDateMs = new Date(CURR_YEAR, CURR_MONTH, CURR_DAY).getTime();

  const todayEntries = entries.filter(
    (entry) => entry.dateAddedMs === todaysDateMs
  );

  let todayIncome = 0;
  let todayExpenses = 0;

  for (let entry of todayEntries) {
    if (entry.type === "Income") {
      todayIncome += entry.amount;
    } else {
      todayExpenses += entry.amount;
    }
  }

  return { todayIncome, todayExpenses, todayEntries };
}

function getThisWeekIncomeAndExpenses(entries: EntryType[]) {
  const today = new Date();

  const day = today.getDay();

  const diff = day === 0 ? 6 : day - 1;

  const prevMondayDate = new Date(today);
  prevMondayDate.setDate(today.getDate() - diff);
  prevMondayDate.setHours(0, 0, 0, 0);
  const prevMondayMs = prevMondayDate.getTime();

  const thisWeekEntries = entries.filter(
    (entry) => entry.dateAddedMs >= prevMondayMs
  );

  let thisWeekIncome = 0;
  let thisWeekExpenses = 0;

  for (let entry of thisWeekEntries) {
    if (entry.type === "Income") {
      thisWeekIncome += entry.amount;
    } else {
      thisWeekExpenses += entry.amount;
    }
  }

  return { thisWeekIncome, thisWeekExpenses, thisWeekEntries };
}

function getThisMonthIncomeAndExpenses(entries: EntryType[]) {
  const today = new Date();

  const firstDayOfThisMonthMs = new Date(
    today.getFullYear(),
    today.getUTCMonth(),
    1,
    0,
    0,
    0,
    0
  ).getTime();

  console.log(firstDayOfThisMonthMs);

  const thisMonthEntries = entries.filter(
    (entry) => entry.dateAddedMs >= firstDayOfThisMonthMs
  );

  let thisMonthIncome = 0;
  let thisMonthExpenses = 0;

  for (let entry of thisMonthEntries) {
    if (entry.type === "Income") {
      thisMonthIncome += entry.amount;
    } else {
      thisMonthExpenses += entry.amount;
    }
  }

  return { thisMonthIncome, thisMonthExpenses, thisMonthEntries };
}

function getThisYearIncomeAndExpenses(entries: EntryType[]) {
  const today = new Date();

  const firstDayOfYearMs = new Date(
    today.getFullYear(),
    0,
    1,
    0,
    0,
    0,
    0
  ).getTime();

  const thisYearEntries = entries.filter(
    (entry) => entry.dateAddedMs >= firstDayOfYearMs
  );

  let thisYearIncome = 0;
  let thisYearExpenses = 0;

  for (let entry of thisYearEntries) {
    if (entry.type === "Income") {
      thisYearIncome += entry.amount;
    } else {
      thisYearExpenses += entry.amount;
    }
  }

  return { thisYearIncome, thisYearExpenses, thisYearEntries };
}
