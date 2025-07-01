import NavBar from './NavBar';
import FloatingActionButton from './FloatingActionButton';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 max-w-xl mx-auto w-full">{children}</main>
      <FloatingActionButton />
      <NavBar />
    </div>
  );
}
