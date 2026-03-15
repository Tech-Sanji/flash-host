// app/api/stats/route.ts

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [product, orders] = await Promise.all([
      prisma.product.findUnique({
        where: { id: 1 },
      }),
      prisma.order.findMany({
        orderBy: { createdAt: "asc" },
        take: 50,
      }),
    ]);

    const stock = product?.stock ?? 0;
    const totalOrders = orders.length;
    const initialStock = stock + totalOrders;

    return NextResponse.json({
      inventory: stock,
      totalOrders,
      initialStock,
      orders: orders.map((o) => ({
        id: o.id,
        product: "Gaming Console — Midnight Edition",
        price: o.price,
        userId: o.userId,
        userName: o.userName,
        time: new Date(o.createdAt).toLocaleTimeString("en-IN", {
          hour12: false,
        }),
        timestamp: o.createdAt.getTime(),
      })),
    });
  } catch (error) {
    console.error("Stats error:", error);

    return NextResponse.json(
      {
        inventory: 0,
        totalOrders: 0,
        initialStock: 10,
        orders: [],
      },
      { status: 500 }
    );
  }
}