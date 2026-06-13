import { Suspense } from "react";
import { getCourses } from "@/lib/actions/getCourses";
import BentoGrid from "@/components/dashboard/BentoGrid";
import Loading from "./loading";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <Suspense fallback={<Loading />}>
      <BentoGrid courses={courses} />
    </Suspense>
  );
}
