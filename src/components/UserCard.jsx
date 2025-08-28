import { FiAtSign, FiMail } from "react-icons/fi";
import { GrUserWorker } from "react-icons/gr";
import { LuSquareUserRound, LuSquareArrowOutUpRight, LuCalendarDays } from "react-icons/lu";
import moment from "moment";
import RoleBadges from "./RoleBadges";
import DynamicTableBtn from "./DynamicTableBtn";
import { shadowAround } from "@/lib/helperFunctions";

export default function UserCard({ data }) {
    console.log(data)
  return (
    <div className={ `   flex flex-col gap-4 p-5 rounded-xl bg-white ${shadowAround}`}>
      
    <h1 className="btn btn-primary btn-xs tracking-wider  cursor-default  text-sm">
                       User card
                    </h1>

      {/* Username */}
      <div className="flex flex-row items-center gap-3">
        <FiAtSign className="text-xl font-bold" />
        <h1 className="font-semibold">{data?.user?.username}</h1>
      </div>

     

      {/* Email */}
      <div className="flex flex-row items-center gap-3">
        <FiMail className="text-xl font-bold" />
        <h1 className="font-semibold">{data?.user?.email}</h1>
      </div>

      {/* Role & Extra */}
      <div className="flex flex-row items-center gap-3 flex-wrap">
        <GrUserWorker className="text-xl font-bold" />
        <div className="flex flex-row flex-wrap items-center gap-2">
          Humane Being <span className="mx-2">|</span>{" "}
          <RoleBadges role={data?.user?.role} />
        </div>

        <DynamicTableBtn
          id={data?.user?._id}
          name={
            <LuSquareArrowOutUpRight className="text-xl cursor-pointer text-blue-400 hover:text-blue-500" />
          }
          data={data?.employee}
          heading="Employee"
          className={''}

        />
      </div>

      {/* Joining Date */}
      <div className="flex flex-row items-center gap-3">
        <LuCalendarDays className="text-xl font-bold" />
        <h1 className="font-semibold">
          {data?.user?.createdAt &&
            moment(data.user.createdAt).format("ddd Do MMMM YYYY")}
        </h1>
        <span className="tracking-widest text-xs text-gray-400">(joining)</span>
      </div>
    </div>
  );
}
