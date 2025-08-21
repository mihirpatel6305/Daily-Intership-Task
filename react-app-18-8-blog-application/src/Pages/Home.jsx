import AllPost from "../Components/AllPost";

function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <AllPost />
      </div>
    </main>
  );
}

export default Home;
