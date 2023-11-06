import React, { useMemo, useState } from "react";
import SGIcon from "country-flag-icons/react/3x2/SG";
import USIcon from "country-flag-icons/react/3x2/US";
import MalIcon from "country-flag-icons/react/3x2/MY";
import AUIcon from "country-flag-icons/react/3x2/AU";
import Britain from "country-flag-icons/react/3x2/GB";

import { Button, Menu, MenuItem } from "@mui/material";
import { ArrowDownward, ArrowDropDown } from "@mui/icons-material";
import { CURRENCY_DATA } from "../../utils/functions/convertCurrency";
import { usePersistedStore } from "../../hooks/usePersistedStore";

const SelectItem = ({ Icon, title, value, withDropDown }) => {
  return (
    <div className="flex w-full justify-between gap-3 items-center py-1 px-3 rounded-md border-[#0000004e] border-b-[1px]">
      <div className="flex gap-3 items-center">
        <div className="h-auto w-[27px]">
          <Icon className="rounded-sm" />
        </div>
        <div className="text-[16px]">{title}</div>
      </div>
      {withDropDown && <ArrowDropDown />}
    </div>
  );
};


const CurrencySelector = (props) => {
  const { additionalStyles = {}, fullWidth = false } = props;
  const [open, setOpen] = useState(false);
  const currency = usePersistedStore(state=>state.currency);
  const setCurrency = usePersistedStore(state=>state.setCurrency);

  const handleItemClick = (value)=>{
    setCurrency(value);
    setOpen(false);
  }

  const selectedItemData = useMemo(()=>{
    return CURRENCY_DATA.filter(item=>item.value == currency)?.at(0); 
  }, [currency])
  
  return (
    <>
      <Button
      onClick={(e)=>setOpen(e.currentTarget)}
        variant="text"
        fullWidth={fullWidth}
        size="small"
        sx={{ color: "black", ...additionalStyles }}
      >
        <SelectItem withDropDown title={selectedItemData.value} Icon={selectedItemData.icon} />
      </Button>
      <Menu
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        anchorEl={open}
       
      >
        {CURRENCY_DATA.map(item=>(
           <MenuItem onClick={()=>handleItemClick(item.value)} key={item.value}>
           <SelectItem Icon={item.icon} title={item?.title}/>
         </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CurrencySelector;
