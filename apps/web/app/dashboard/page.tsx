"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { User } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/dashboard/SidebarCode";
import Layout from "./Layout";

export default function Dashboard() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Layout>
        <div>Welcome User</div>
      </Layout>
    );
  }
  if (!session) {
    redirect("/");
  }
}
