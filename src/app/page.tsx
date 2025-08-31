export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Overview and quick stats
            </p>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <a
              href="/profile"
              className="underline underline-offset-4 hover:text-primary"
            >
              Profile
            </a>
            <a
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Logout
            </a>
          </nav>
        </header>

        {/* Cards grid - adjust to theme */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <p className="text-sm text-muted-foreground">New Candidates</p>
            <p className="mt-2 text-3xl font-bold">24</p>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <p className="text-sm text-muted-foreground">Interviews</p>
            <p className="mt-2 text-3xl font-bold">8</p>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <p className="text-sm text-muted-foreground">Offers</p>
            <p className="mt-2 text-3xl font-bold">3</p>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <p className="text-sm text-muted-foreground">Hires</p>
            <p className="mt-2 text-3xl font-bold">1</p>
          </div>
        </section>

        {/* Recent activity */}
        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm lg:col-span-2">
            <h2 className="mb-3 text-base font-medium">Recent Activity</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between rounded-md border p-3">
                <span className="text-muted-foreground">
                  Jane Doe applied for Product Designer
                </span>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </li>
              <li className="flex items-center justify-between rounded-md border p-3">
                <span className="text-muted-foreground">
                  Interview scheduled with John Smith
                </span>
                <span className="text-xs text-muted-foreground">4h ago</span>
              </li>
              <li className="flex items-center justify-between rounded-md border p-3">
                <span className="text-muted-foreground">
                  Offer sent to Emily Clark
                </span>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <h2 className="mb-3 text-base font-medium">Shortcuts</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href="/profile"
                >
                  Edit Profile
                </a>
              </li>
              <li>
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href="/signup"
                >
                  Invite Member
                </a>
              </li>
              <li>
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href="/login"
                >
                  Go to Login
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
