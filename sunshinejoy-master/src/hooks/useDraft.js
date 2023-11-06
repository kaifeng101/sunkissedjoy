import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteDraftAPI, getDraftAPI, getDraftsAPI, updateDraftAPI } from "../api/draft.api"

export const useGetDrafts = ()=>{
    const getDrafts = useQuery(['draft'], getDraftsAPI, {
        select : (data)=>data.drafts,
        onError : (error)=>{
            toast.error(error?.response?.data?.message || 'Something went wrong!')
        }
    })

    return {
        getDrafts
    }
}

export const useDeleteDraft = ()=>{
    const queryClient = useQueryClient();
    const deleteDraft = useMutation(deleteDraftAPI, {
        onSuccess : ()=>{
            queryClient.invalidateQueries(['draft']);
            toast.success('Draft has been deleted successfully!');
        },
        onError : (error)=>{
            toast.error(error?.response?.data?.message || 'Something went wrong!');
        }
    })
    return {
        deleteDraft
    }
}

export const useGetDraft = ({id})=>{
    const getDraft = useQuery(['draft',id],()=>getDraftAPI({draftId : id}), {
        select : (data)=>data.draft,
        onError : (error)=>{
            toast.error(error?.response?.data?.message || 'Something went wrong!');
        }
    });

    return {
        getDraft
    }
}

export const useUpdateDraft = ()=>{
    const queryClient = useQueryClient();
    const updateDraft = useMutation(updateDraftAPI, {
        onSuccess : (data)=>{
            queryClient.setQueryData(['draft', data?.draft?.draftId], data?.draft);
            toast.success('Draft has been updated!');
        },
        onError : (error)=>{
            toast.error(error?.response?.data?.message || 'Somethig went wrong!');
        }
    })

    return {
        updateDraft
    }
}