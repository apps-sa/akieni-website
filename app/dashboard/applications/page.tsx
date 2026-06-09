import { ApplicationsTable } from "@/components/dashboard/applications-table";
import { getApplications, signedCvUrl } from "@/lib/dashboard";

export default async function ApplicationsPage() {
  const applications = await getApplications();
  const rows = await Promise.all(
    applications.map(async (application) => ({
      application,
      cvUrl: await signedCvUrl(application.cv_path),
    })),
  );

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold">Applications</h1>
      </header>
      <ApplicationsTable rows={rows} />
    </div>
  );
}
