import { BriefcaseBusiness, Plus, Search } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

const InterviewBoard = () => {
    return (
        <>
            <div className="flex max-sm:flex-col gap-2 mb-6">
                <div className="search relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input className="pl-10" placeholder="Search by job title or company" />
                </div>

                <Button><Plus /> Add Interview</Button>
            </div>

            <div className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center bg-card/50">
                <div className="bg-background p-6 rounded-full flex items-center justify-center border border-border shadow-sm">
                    <BriefcaseBusiness className="size-10 text-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mt-6 text-foreground">The board is clear</h2>
                <p className="text-muted-foreground mt-2">Add your first job to track your job</p>
                <Button className="mt-6"><Plus /> Add Job</Button>
            </div>
        </>
    )
}

export default InterviewBoard