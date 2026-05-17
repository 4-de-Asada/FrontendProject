import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/ingreso");
  }

  const { data: profile } = await supabase
    .from("perfiles")
    .select("tipo")
    .eq("id", user.id)
    .single();

  if (profile?.tipo !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
