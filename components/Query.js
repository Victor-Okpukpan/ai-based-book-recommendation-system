import { useState } from "react";
import { Tab } from "@headlessui/react";
import ByFilterForm from "@/components/form/ByFilterForm";
import ByLastReads from "@/components/form/ByLastReads";

const GENERATE_URL = "/api/book-suggestions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StyledTab = ({ title }) => (
  <Tab
    className={({ selected }) =>
      classNames(
        "w-full rounded-lg py-3 text-sm font-serif leading-5 transition-all duration-300",
        "ring-white ring-opacity-60 ring-offset-2 ring-offset-paper focus:outline-none focus:ring-2",
        selected
          ? "bg-paper shadow-md text-primary-dark"
          : "text-primary-main hover:bg-paper hover:text-primary-dark"
      )
    }
  >
    {title}
  </Tab>
);

const StyledPanel = ({ children }) => (
  <Tab.Panel
    className={
      "rounded-xl p-4 bg-paper shadow-md ring-white ring-opacity-60 focus:outline-none transition-all duration-300"
    }
  >
    {children}
  </Tab.Panel>
);

export default function Query({ setSuggestions }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full p-5 rounded-lg bg-paper">
      <Tab.Group>
        <Tab.List className="flex space-x-2 rounded-xl bg-beige-100 p-1 shadow-inner">
          <StyledTab title={"By Last Reads"} />
          <StyledTab title={"By Filter"} />
        </Tab.List>
        <Tab.Panels className="mt-3">
          <StyledPanel>
            {/* by last reads tab */}
            <ByLastReads
              loading={loading}
              setLoading={setLoading}
              setSuggestions={setSuggestions}
              url={GENERATE_URL}
            />
          </StyledPanel>
          <StyledPanel>
            {/* by filter tab */}
            <ByFilterForm
              loading={loading}
              setLoading={setLoading}
              setSuggestions={setSuggestions}
              url={GENERATE_URL}
            />
          </StyledPanel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
