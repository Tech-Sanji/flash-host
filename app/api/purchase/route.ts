// app/api/purchase/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { userId, userName } = await req.json();

    if (!userId || !userName) {
      return NextResponse.json(
        { success: false, message: "Missing user info" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {

      // ATOMIC STOCK DECREMENT
      const update = await tx.product.updateMany({
        where: {
          id: 1,
          stock: { gt: 0 },
        },
        data: {
          stock: { decrement: 1 },
        },
      });

      // If no rows updated → sold out
      if (update.count === 0) {
        return null;
      }

      // Get product price
      const product = await tx.product.findUnique({
        where: { id: 1 },
      });

      // Create order
      const order = await tx.order.create({
        data: {
          userId,
          userName,
          productId: 1,
          price: product?.price ?? 49999,
        },
      });

      return { order };
    });

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Out of stock — better luck next time!" },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: result.order.id,
        product: "Gaming Console — Midnight Edition",
        price: result.order.price,
        userName: result.order.userName,
        time: new Date(result.order.createdAt).toLocaleTimeString("en-IN", {
          hour12: false,
        }),
      },
    });

  } catch (error) {
    console.error("Purchase error:", error);

    return NextResponse.json(
      { success: false, message: "Purchase failed" },
      { status: 500 }
    );
  }
}