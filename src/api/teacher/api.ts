import request from "@/utils/request";
import { resRoot } from "./type";

const apiHeader = '/api/seisei'


export const apiIdList = async () => {
  return {
    code: 200,
    message: 'success',
    data: [10]
  } as resRoot<number[]>
}