import React, { useState } from "react";
import { Button1 } from "../Button1";
import { DateSelect } from "../DateSelect/DateSelect";
import { useAddEntryModalStore } from "@/state/AddEntryModalStore";

type Props = {};

export function SelectDateSection({}: Props) {
  const { dateBtnValue } = useAddEntryModalStore();

  const [isDateSelectVisible, setIsDateSelectVisible] = useState(false);

  return (
    <div className="">
      <Button1 className="mr-2" onClick={() => setIsDateSelectVisible(true)}>
        {dateBtnValue}
      </Button1>
      {isDateSelectVisible && (
        <DateSelect setIsDateSelectVisible={setIsDateSelectVisible} />
      )}
    </div>
  );
}
