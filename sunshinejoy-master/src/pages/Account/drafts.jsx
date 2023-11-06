import { Button, CircularProgress, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdArrowBack } from "react-icons/md";
import AccountLayout, { polotonoStore } from "../../components/Account/AccountLayout";
import ErrorState from "../../components/Account/ErrorState";
import { useDeleteDraft, useGetDrafts, useUpdateDraft } from "../../hooks/useDraft";
import noDraftSVG from '../../assets/no-drafts.svg'
import moment from "moment";
import { getImageLinkFromTemplate } from "../../utils/functions/getImageLinkFromTemplate";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const DraftItem = ({data}) => {
  const [title,setTitle] = useState(data?.title);
  useEffect(()=>{setTitle(data?.title)},[data])
  const {deleteDraft} = useDeleteDraft();
  const {updateDraft} = useUpdateDraft();
  const navigate = useNavigate();
  const handleDelete = ()=>{
    deleteDraft.mutate({
      draftId : data?.draftId
    })
  }

  const handleTitleSave = ()=>{
    if (data?.title !== title) {
      updateDraft.mutate({
        draftId : data?.draftId,
        data : {
          title
        }
      })
    }
  }
 

  return (
    <div className="border-[1px] rounded-lg max-xs:grid-cols-1 max-[820px]:grid-cols-[1fr_2fr] w-full grid h-auto grid-cols-2">
      <div className="bg-gray-100 w-full p-3 rounded-l-lg h-full flex items-center justify-center min-h-[220px]">
       <img src={data?.preview} className="w-full max-h-[220px] h-full object-contain" />
      </div>
      <div className="py-5 px-8 max-sm:px-4 max-xs:px-2 h-auto flex flex-col justify-between">
        <div className="flex pb-4 border-b-[1px] max-sm:gap-5 gap-9 items-center">
          <div className="flex flex-col justify-center shrink-0 items-center">
            <div className="text-base text-center max-xs:text-sm">{moment(data?.createdAt).format('ddd')} {" , "} {moment(data?.createdAt).format('MMM')}</div>
            <div className="text-4xl font-bold max-xs:text-3xl">{moment(data?.createdAt).format('DD')}</div>
          </div>
          <div className="">
            <div className="text-lg font-semibold max-xs:text-base">
              <input value={title} onBlur={handleTitleSave} onChange={(e)=>setTitle(e.target.value)} className="w-full py-1 border-b-[1px] appearance-none"/>
            </div>
            <div className="mt-2 opacity-50 max-xs:text-sm max-xs:mt-1">
              Modified on  {moment(data?.updatedAt).format('MMMM,  DD YYYY -  HH:MM')}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t-[1px] py-4 max-xs:mt-2 max-xs:border-t-0 flex justify-between items-center">
          <Button onClick={()=>navigate(`/account/drafts/${data?.draftId}`)} variant="text">Edit Draft</Button>
          <IconButton onClick={handleDelete} color="error">
           {deleteDraft.isLoading?<CircularProgress size={18}/>:<Delete/>}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const Drafts = () => {
  const {
    getDrafts: {
      data: draftsData,
      isLoading: fetchDraftLoading,
      error: fetchDraftError,
    },
  } = useGetDrafts();
  const navigate = useNavigate();
  return (
    <AccountLayout>
      <div className="">
        <div className="pb-3 border-b-[1px]">
          <div className={`text-2xl font-bold flex items-center gap-4`}>
            <MdArrowBack onClick={()=>navigate('/account')} className="hidden max-md:block" />
            Saved Drafts
          </div>
          <div className="text-base mt-2 opacity-70">
            Your drafts will expire in 30 days!
          </div>
        </div>
        {fetchDraftError ? (
          <ErrorState />
        ) : fetchDraftLoading ? (
          <div className="w-full flex-col text-primary h-[50vh] flex items-center justify-center">
            <CircularProgress color="inherit" />
            <div className="text-center mt-2 text-base text-black">
              Loading..
            </div>
          </div>
        ) : draftsData?.length === 0? <div className="w-full h-[300px] flex items-center justify-center mt-16 flex-col">
          <img src={noDraftSVG} className='w-[60%] object-contain h-full'/>
          <div className="mt-6 text-xl">No Drafts Found!</div>
        </div>:(
          <div className="mt-4 space-y-5">
            {draftsData.map(item=>(
              <DraftItem key={item._id} data={item}/>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default Drafts;
