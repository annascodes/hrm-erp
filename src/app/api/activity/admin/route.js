import { dbConnect } from "@/lib/dbConnection";
import { verifyAuth } from "@/lib/middleware/verifyAuth";
import AuditLog from "@/lib/models/auditLogModel";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {

    const auth = await verifyAuth()
    if (!auth)
        return NextResponse.json({ error: 'need login' }, { status: 403 })

    const { searchParams } = new URL(req.url)
    const startIndex = searchParams.get('startIndex') || null
    const limit = searchParams.get('limit') || null
    const date = searchParams.get('date') || null;

    await dbConnect()
    let query = {}
    if (date) {
        const startOfDay = moment(date).startOf("day").toDate();
        const endOfDay = moment(date).endOf("day").toDate();
        query.createdAt = { $gte: startOfDay, $lte: endOfDay };

    }
    if (auth.role === "employee") {
        query.user = auth.id;
    }

    const acitivity = await AuditLog.find(query)
        .populate('user', 'username role')
        .populate('targetId')
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit)

    return NextResponse.json(acitivity)
}

// export async function GET(req) {
//   const auth = await verifyAuth();
//   if (!auth || auth.role !== "admin")
//     return NextResponse.json({ error: "only admin" }, { status: 403 });

//   const { searchParams } = new URL(req.url);
//   const startIndex = parseInt(searchParams.get("startIndex")) || 0;
//   const limit = parseInt(searchParams.get("limit")) || 5;
//   const filter = searchParams.get("filter") || null; // weekly / monthly / custom
//   const date = searchParams.get("date"); // used only for custom

//   await dbConnect();

//   // 🔹 Date filter logic
//   let query = {};
//   if (filter === "weekly") {
//     query.createdAt = {
//       $gte: moment().startOf("week").toDate(),
//       $lte: moment().endOf("week").toDate(),
//     };
//   } else if (filter === "monthly") {
//     query.createdAt = {
//       $gte: moment().startOf("month").toDate(),
//       $lte: moment().endOf("month").toDate(),
//     };
//   } else if (filter === "custom" && date) {
//     query.createdAt = {
//       $gte: moment(date).startOf("day").toDate(),
//       $lte: moment(date).endOf("day").toDate(),
//     };
//   }

//   const activities = await AuditLog.find(query)
//     .populate("user", "username role")
//     .populate("targetId")
//     .sort({ createdAt: -1 })
//     .skip(startIndex)
//     .limit(limit);

//   // check if more
//   const totalCount = await AuditLog.countDocuments(query);
//   const hasMore = startIndex + limit < totalCount;

//   return NextResponse.json(activities);
// }