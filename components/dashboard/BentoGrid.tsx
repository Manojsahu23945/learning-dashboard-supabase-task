"use client";

import { Course } from "@/types/course";
import HeroTile from "./HeroTile";
import ActivityTile from "./ActivityTile";
import CourseCard from "./CourseCard";
import { StaggerContainer, StaggerItem } from "@/components/animations/FadeInStagger";

interface BentoGridProps {
  courses: Course[];
}

export default function BentoGrid({ courses }: BentoGridProps) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
      {/* Hero — spans 2 cols on md+ */}
      <StaggerItem className="col-span-1 md:col-span-2">
        <HeroTile />
      </StaggerItem>

      {/* Activity tile */}
      <StaggerItem>
        <ActivityTile />
      </StaggerItem>

      {/* Dynamic course cards */}
      {courses.length === 0 ? (
        <StaggerItem className="col-span-full">
          <div className="flex items-center justify-center h-32 rounded-2xl bg-bg-card border border-white/5 text-slate-500 text-sm">
            No courses found. Add some in your Supabase dashboard.
          </div>
        </StaggerItem>
      ) : (
        courses.map((course, i) => (
          <StaggerItem key={course.id}>
            <CourseCard course={course} index={i} />
          </StaggerItem>
        ))
      )}
    </StaggerContainer>
  );
}
