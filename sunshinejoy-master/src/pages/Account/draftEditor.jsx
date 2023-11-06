import React, { useEffect, useRef, useState } from "react";
import { createStore } from "polotno/model/store";
import { Editor } from "../../components/Editor/Editor";
import { ArrowForward, ArrowForwardIos, WbSunny } from "@mui/icons-material";
import Button from "../../components/common/Button";
import { toast, Toaster } from "react-hot-toast";
import dataURLtoFile from "../../utils/functions/dataURLToFile";

import useTemplate from "../../hooks/useTemplate";
import { useParams } from "react-router-dom";
import { useGetDraft, useUpdateDraft } from "../../hooks/useDraft";
import { CircularProgress } from "@mui/material";
import ErrorState from "../../components/Account/ErrorState";
import { getFileLink } from "../../utils/functions/generateImageLink";

const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T",
  // showCredit: true,
});

const DraftEditor = () => {
  const headerRef = useRef();
  const { id } = useParams();
  const {
    getDraft: { data: draft, isLoading, error },
  } = useGetDraft({ id });
  const { updateDraft } = useUpdateDraft();

  const [height, setHeight] = useState(window.innerHeight - 70);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (draft) {
    store.loadJSON(draft?.data);
    }
  }, [draft]);
  const handleSave = async () => {
    setLoading(true);
    try {
      let jsonData = await store.toJSON();
      const dataURL = await store.toDataURL();
      let file = dataURLtoFile(dataURL, "testimg");
      let fileURL = await getFileLink(file);
      updateDraft.mutate({
        draftId: id,
        data: {
          data: jsonData,
          preview: fileURL,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  if (isLoading)
    return (
      <div className="h-[100vh] w-full flex items-center justify-center flex-col">
        <CircularProgress size={50} color="inherit" className="text-primary" />
        <div className="text-xl">Getting draft..</div>
      </div>
    );
  if (error)
    return (
      <ErrorState
        error={error?.response?.data?.message || "Something went wrong!"}
      />
    );
  return (
    <>
    <Toaster position="top-center"/>
      <div
        ref={headerRef}
        className="py-4 max-md:px-5 max-xs:px-2 relative px-8 flex items-center justify-between"
      >
        <div className="text-lg hover:text-black transition-all cursor-pointer max-md:text-base text-primary gap-3 font-semibold flex items-center justify-center">
          <WbSunny sx={{ xs: 25, sm: 32 }} />
          <span className="max-md:hidden">Draft Editor</span>
        </div>
        <Button
          onClick={handleSave}
          className={`py-[7px] max-sm:text-sm max-sm:px-2 px-3 flex items-center gap-3`}
        >
          {updateDraft?.isLoading || loading ? (
            <div>Loading..</div>
          ) : (
            <>
              Save Design
              <ArrowForwardIos sx={{ fontSize: 20 }} />
            </>
          )}
        </Button>
      </div>
      <div style={{ height }} className=" w-full custom-scroll">
        <Editor store={store} />
      </div>
    </>
  );
};

export default DraftEditor;
