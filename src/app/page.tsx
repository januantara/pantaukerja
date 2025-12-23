'use client';

import { TabsList } from "@radix-ui/react-tabs";
import { Tabs, TabsContent, TabsTrigger } from "~/components/ui/tabs";
import JobBoard from "./track/JobBoard";
import InterviewBoard from "./track/InterviewBoard";
import Navbar from "~/components/Navbar";

export default function Home() {


  return (
    <div className="flex flex-col min-h-screen font-sans text-foreground">
      <Navbar />
      <main className="flex-1 mt-10 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="job-tracker">
            <TabsList className="mb-4 w-max bg-background p-2 rounded-md border">
              <TabsTrigger
                value="job-tracker"
                className="shadow-none px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Job Tracker
              </TabsTrigger>
              <TabsTrigger
                value="interview-tracker"
                className="shadow-none px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Interview Tracker
              </TabsTrigger>
            </TabsList>
            <TabsContent value="job-tracker" className="p-4 bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-sm">
              <JobBoard />
            </TabsContent>
            <TabsContent value="interview-tracker" className="p-4 bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-sm">
              <InterviewBoard />
            </TabsContent>
          </Tabs>
        </div>
      </main>

    </div>
  );
}